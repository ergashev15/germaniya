import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { ProgressBar } from "@/components/progress-bar";
import { SpeakButton } from "@/components/speak-button";
import { ThemedText } from "@/components/themed-text";
import { levels, wordsForLevel, type CefrLevel } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, type, usePalette } from "@/theme";

type PracticeMode = "meaning" | "listening" | "writing";

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("de").replace(/[.!?]/g, "");
}

export default function PracticeSessionScreen() {
  const colors = usePalette();
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; level?: string }>();
  const mode: PracticeMode = params.mode === "listening" || params.mode === "writing" ? params.mode : "meaning";
  const level: CefrLevel = levels.some((item) => item.id === params.level) ? (params.level as CefrLevel) : "A1";
  const allLevelWords = useMemo(() => wordsForLevel(level), [level]);
  const questions = useMemo(() => allLevelWords.slice(0, 8), [allLevelWords]);
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
    const pool = allLevelWords.filter((item) => item.id !== word.id);
    const distractors = [...pool.slice(index), ...pool.slice(0, index)].slice(0, 3);
    return [word, ...distractors].sort((a, b) => ((a.id.length + index) % 4) - ((b.id.length + index) % 4));
  }, [allLevelWords, index, word]);

  if (!word) return null;
  const typedCorrect = normalize(typedAnswer) === normalize(word.german.replace(/^(der|die|das) /, "")) || normalize(typedAnswer) === normalize(word.german);
  const answerCorrect = mode === "writing" ? typedCorrect : selected === word.id;
  const canCheck = mode === "writing" ? typedAnswer.trim().length > 0 : selected !== null;

  function advance() {
    if (!checked) {
      setChecked(true);
      if (answerCorrect) setScore((current) => current + 1);
      return;
    }
    const finalScore = score;
    if (index === questions.length - 1) {
      finishPractice(finalScore, questions.length, questions.map((item) => item.id));
      setScore(finalScore);
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
    setTypedAnswer("");
    setChecked(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: spacing.lg, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ alignItems: "center", gap: spacing.md }}><View style={{ width: 112, height: 112, borderRadius: radius.full, alignItems: "center", justifyContent: "center", backgroundColor: levelColors[level] }}><ThemedText variant="largeTitle" style={{ color: "#FFFFFF" }}>{percentage}%</ThemedText></View><ThemedText variant="title" style={{ color: colors.text, textAlign: "center" }}>{percentage >= 75 ? "Zo‘r natija!" : "Yaxshi urinish!"}</ThemedText><ThemedText variant="body" style={{ color: colors.textMuted, textAlign: "center" }}>{score} ta to‘g‘ri javob · +{score * 10} XP</ThemedText></View>
        <AppButton title="Mashqlarga qaytish" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  const title = mode === "meaning" ? "Ma’noni toping" : mode === "listening" ? "Tinglab toping" : "Nemischa yozing";

  return (
    <>
      <Stack.Title>{title}</Stack.Title>
      <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ gap: spacing.sm }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}><ThemedText variant="caption" style={{ color: levelColors[level] }}>{level} · {title.toUpperCase()}</ThemedText><ThemedText variant="caption" style={{ color: colors.textMuted }}>{index + 1}/{questions.length}</ThemedText></View><ProgressBar value={(index + 1) / questions.length} /></View>
        <View style={{ minHeight: 150, alignItems: "center", justifyContent: "center", gap: spacing.md }}>
          {mode === "listening" ? <><ThemedText variant="body" style={{ color: colors.textMuted }}>So‘zni tinglang</ThemedText><View style={{ flexDirection: "row", gap: spacing.sm }}><SpeakButton text={word.german} /><SpeakButton text={word.german} slow /></View></> : <><ThemedText variant="caption" style={{ color: colors.textMuted }}>{mode === "writing" ? "O‘ZBEKCHADAN TARJIMA QILING" : "NEMISCHA SO‘Z"}</ThemedText><ThemedText variant="largeTitle" style={{ color: colors.text, textAlign: "center" }}>{mode === "writing" ? word.uzbek : word.german}</ThemedText>{mode === "meaning" ? <SpeakButton text={word.german} /> : null}</>}
        </View>
        {mode === "writing" ? (
          <TextInput value={typedAnswer} onChangeText={setTypedAnswer} editable={!checked} autoCapitalize="none" autoCorrect={false} placeholder="Javobni nemischa yozing" placeholderTextColor={colors.textMuted} style={[type.body, { minHeight: 58, paddingHorizontal: spacing.md, color: colors.text, borderRadius: radius.md, borderCurve: "continuous", borderWidth: 2, borderColor: checked ? (answerCorrect ? colors.success : colors.danger) : colors.line, backgroundColor: colors.surface }]} />
        ) : (
          <View style={{ gap: spacing.sm }}>{options.map((option) => { const active = selected === option.id; return <Pressable key={option.id} disabled={checked} accessibilityRole="radio" accessibilityState={{ selected: active }} onPress={() => setSelected(option.id)} style={({ pressed }) => ({ minHeight: 58, padding: spacing.md, justifyContent: "center", borderRadius: radius.md, borderCurve: "continuous", borderWidth: active ? 2 : 1, borderColor: checked && active ? (answerCorrect ? colors.success : colors.danger) : active ? levelColors[level] : colors.line, backgroundColor: active ? colors.surfaceMuted : colors.surface, opacity: pressed ? 0.7 : 1 })}><ThemedText variant="body" style={{ color: colors.text }}>{option.uzbek}</ThemedText></Pressable>; })}</View>
        )}
        {checked ? <View style={{ padding: spacing.md, gap: spacing.xs, borderRadius: radius.md, borderCurve: "continuous", backgroundColor: answerCorrect ? colors.accentSoft : colors.surfaceMuted }}><ThemedText variant="headline" style={{ color: answerCorrect ? colors.success : colors.danger }}>{answerCorrect ? "To‘g‘ri javob" : "To‘g‘ri javob:"}</ThemedText>{!answerCorrect ? <ThemedText variant="body" style={{ color: colors.text }}>{word.german} — {word.uzbek}</ThemedText> : null}</View> : null}
        <AppButton title={checked ? (index === questions.length - 1 ? "Natijani ko‘rish" : "Keyingi savol") : "Tekshirish"} disabled={!canCheck} onPress={advance} />
      </ScrollView>
    </>
  );
}
