import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { ProgressBar } from "@/components/progress-bar";
import { SpeakButton } from "@/components/speak-button";
import { ThemedText } from "@/components/themed-text";
import { levels, wordsForLevel, type CefrLevel, type VocabularyWord } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, type, usePalette } from "@/theme";

type PracticeMode = "meaning" | "reverse" | "listening" | "writing" | "article" | "context";

const practiceModes: PracticeMode[] = ["meaning", "reverse", "listening", "writing", "article", "context"];
const titles: Record<PracticeMode, string> = {
  meaning: "Ma’noni toping",
  reverse: "Nemischasini toping",
  listening: "Tinglab toping",
  writing: "Nemischa yozing",
  article: "Artiklni toping",
  context: "Gapni to‘ldiring",
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("de").replace(/[.!?„“”]/g, "");
}

function withoutArticle(value: string) {
  return value.replace(/^(der|die|das) /i, "");
}

function articleOf(value: string) {
  return value.match(/^(der|die|das) /i)?.[1]?.toLocaleLowerCase("de") ?? "";
}

function seededScore(value: string, seed: number) {
  let result = seed;
  for (let index = 0; index < value.length; index += 1) result = (result * 31 + value.charCodeAt(index)) | 0;
  return Math.abs(result);
}

function pickQuestions(words: VocabularyWord[], mode: PracticeMode, seed: number) {
  const eligible = mode === "article"
    ? words.filter((word) => /^(der|die|das) /i.test(word.german))
    : mode === "context"
      ? words.filter((word) => word.partOfSpeech === "foydali birikma")
      : words;
  return [...eligible].sort((first, second) => seededScore(first.id, seed) - seededScore(second.id, seed)).slice(0, 10);
}

export default function PracticeSessionScreen() {
  const colors = usePalette();
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; level?: string; refresh?: string }>();
  const mode: PracticeMode = practiceModes.includes(params.mode as PracticeMode) ? (params.mode as PracticeMode) : "meaning";
  const level: CefrLevel = levels.some((item) => item.id === params.level) ? (params.level as CefrLevel) : "A1";
  const allLevelWords = useMemo(() => wordsForLevel(level), [level]);
  const [sessionSeed, setSessionSeed] = useState(() => Date.now() + Number(params.refresh ?? 0));
  const questions = useMemo(() => pickQuestions(allLevelWords, mode, sessionSeed), [allLevelWords, mode, sessionSeed]);
  const { finishPractice } = useLearning();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const word = questions[index];

  const options = useMemo(() => {
    if (!word) return [];
    const pool = allLevelWords.filter((item) =>
      item.id !== word.id && (mode !== "context" || item.partOfSpeech === "foydali birikma"),
    );
    const distractors = [...pool.slice(index * 7), ...pool]
      .filter((item, itemIndex, items) => items.findIndex((candidate) => candidate.german === item.german) === itemIndex)
      .slice(0, 3);
    return [word, ...distractors].sort(
      (first, second) => seededScore(first.id, sessionSeed + index) - seededScore(second.id, sessionSeed + index),
    );
  }, [allLevelWords, index, mode, sessionSeed, word]);

  if (!word) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: spacing.lg, gap: spacing.lg }} style={{ backgroundColor: colors.background }}>
        <ThemedText variant="title" style={{ color: colors.text, textAlign: "center" }}>Bu darajada mashq uchun yetarli so‘z topilmadi.</ThemedText>
        <AppButton title="Mashqlarga qaytish" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  const typedCorrect = normalize(typedAnswer) === normalize(withoutArticle(word.german)) || normalize(typedAnswer) === normalize(word.german);
  const answerCorrect = mode === "writing" ? typedCorrect : mode === "article" ? selected === articleOf(word.german) : selected === word.id;
  const canCheck = mode === "writing" ? typedAnswer.trim().length > 0 : selected !== null;

  function advance() {
    if (!checked) {
      setChecked(true);
      if (answerCorrect) setScore((current) => current + 1);
      return;
    }
    if (index === questions.length - 1) {
      finishPractice(score, questions.length, questions.map((item) => item.id));
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
    setTypedAnswer("");
    setChecked(false);
  }

  function restart() {
    setSessionSeed(Date.now());
    setIndex(0);
    setSelected(null);
    setTypedAnswer("");
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: spacing.lg, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 112, height: 112, borderRadius: radius.full, alignItems: "center", justifyContent: "center", backgroundColor: levelColors[level] }}>
            <ThemedText variant="largeTitle" style={{ color: "#FFFFFF" }}>{percentage}%</ThemedText>
          </View>
          <ThemedText variant="title" style={{ color: colors.text, textAlign: "center" }}>{percentage >= 75 ? "Zo‘r natija!" : "Yaxshi urinish!"}</ThemedText>
          <ThemedText variant="body" style={{ color: colors.textMuted, textAlign: "center" }}>{score} ta to‘g‘ri javob · +{score * 10} XP</ThemedText>
        </View>
        <AppButton title="Yana mashq qilish" onPress={restart} />
        <AppButton title="Mashqlarga qaytish" variant="ghost" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  const title = titles[mode];
  const contextSentence = word.example.replace(word.german, "________");

  return (
    <>
      <Stack.Title>{title}</Stack.Title>
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <ThemedText variant="caption" style={{ color: levelColors[level] }}>{level} · {title.toUpperCase()}</ThemedText>
            <ThemedText variant="caption" style={{ color: colors.textMuted, fontVariant: ["tabular-nums"] }}>{index + 1}/{questions.length}</ThemedText>
          </View>
          <ProgressBar value={(index + 1) / questions.length} />
        </View>

        <View style={{ minHeight: 160, alignItems: "center", justifyContent: "center", gap: spacing.md }}>
          {mode === "listening" ? (
            <>
              <ThemedText variant="body" style={{ color: colors.textMuted }}>Birlikni tinglang</ThemedText>
              <View style={{ flexDirection: "row", gap: spacing.sm }}><SpeakButton text={word.german} /><SpeakButton text={word.german} slow /></View>
            </>
          ) : mode === "article" ? (
            <>
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>TO‘G‘RI ARTIKLNI TANLANG</ThemedText>
              <ThemedText variant="largeTitle" style={{ color: colors.text, textAlign: "center" }}>{withoutArticle(word.german)}</ThemedText>
              <ThemedText variant="body" style={{ color: colors.textMuted }}>{word.uzbek}</ThemedText>
            </>
          ) : mode === "context" ? (
            <>
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>BO‘SH JOYNI TO‘LDIRING</ThemedText>
              <ThemedText variant="title" style={{ color: colors.text, textAlign: "center" }}>{contextSentence}</ThemedText>
              <ThemedText variant="subhead" style={{ color: colors.textMuted, textAlign: "center" }}>{word.exampleUzbek}</ThemedText>
            </>
          ) : (
            <>
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>{mode === "writing" || mode === "reverse" ? "O‘ZBEKCHADAN TARJIMA QILING" : "NEMISCHA BIRLIK"}</ThemedText>
              <ThemedText variant="largeTitle" style={{ color: colors.text, textAlign: "center" }}>{mode === "writing" || mode === "reverse" ? word.uzbek : word.german}</ThemedText>
              {mode === "meaning" ? <SpeakButton text={word.german} /> : null}
            </>
          )}
        </View>

        {mode === "writing" ? (
          <TextInput value={typedAnswer} onChangeText={setTypedAnswer} editable={!checked} autoCapitalize="none" autoCorrect={false} placeholder="Javobni nemischa yozing" placeholderTextColor={colors.textMuted} style={[type.body, { minHeight: 58, paddingHorizontal: spacing.md, color: colors.text, borderRadius: radius.md, borderCurve: "continuous", borderWidth: 2, borderColor: checked ? (answerCorrect ? colors.success : colors.danger) : colors.line, backgroundColor: colors.surface }]} />
        ) : mode === "article" ? (
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            {["der", "die", "das"].map((article) => {
              const active = selected === article;
              return <Pressable key={article} disabled={checked} accessibilityRole="radio" accessibilityState={{ selected: active }} onPress={() => setSelected(article)} style={({ pressed }) => ({ flex: 1, minHeight: 58, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderCurve: "continuous", borderWidth: active ? 2 : 1, borderColor: checked && active ? (answerCorrect ? colors.success : colors.danger) : active ? levelColors[level] : colors.line, backgroundColor: active ? colors.surfaceMuted : colors.surface, opacity: pressed ? 0.7 : 1 })}><ThemedText variant="headline" style={{ color: colors.text }}>{article}</ThemedText></Pressable>;
            })}
          </View>
        ) : (
          <View style={{ gap: spacing.sm }}>
            {options.map((option) => {
              const active = selected === option.id;
              const label = mode === "meaning" || mode === "listening" ? option.uzbek : option.german;
              return <Pressable key={option.id} disabled={checked} accessibilityRole="radio" accessibilityState={{ selected: active }} onPress={() => setSelected(option.id)} style={({ pressed }) => ({ minHeight: 58, padding: spacing.md, justifyContent: "center", borderRadius: radius.md, borderCurve: "continuous", borderWidth: active ? 2 : 1, borderColor: checked && active ? (answerCorrect ? colors.success : colors.danger) : active ? levelColors[level] : colors.line, backgroundColor: active ? colors.surfaceMuted : colors.surface, opacity: pressed ? 0.7 : 1 })}><ThemedText variant="body" style={{ color: colors.text }}>{label}</ThemedText></Pressable>;
            })}
          </View>
        )}

        {checked ? (
          <View style={{ padding: spacing.md, gap: spacing.xs, borderRadius: radius.md, borderCurve: "continuous", backgroundColor: answerCorrect ? colors.accentSoft : colors.surfaceMuted }}>
            <ThemedText variant="headline" style={{ color: answerCorrect ? colors.success : colors.danger }}>{answerCorrect ? "To‘g‘ri javob" : "To‘g‘ri javob:"}</ThemedText>
            {!answerCorrect ? <ThemedText variant="body" style={{ color: colors.text }}>{mode === "article" ? `${articleOf(word.german)} ${withoutArticle(word.german)}` : `${word.german} — ${word.uzbek}`}</ThemedText> : null}
            <SpeakButton text={word.german} slow />
          </View>
        ) : null}
        <AppButton title={checked ? (index === questions.length - 1 ? "Natijani ko‘rish" : "Keyingi savol") : "Tekshirish"} disabled={!canCheck} onPress={advance} />
      </ScrollView>
    </>
  );
}
