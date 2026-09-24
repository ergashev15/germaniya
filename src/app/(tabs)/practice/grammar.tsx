import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { ProgressBar } from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import { levels, type CefrLevel } from "@/data/curriculum";
import { grammarForModule, grammarQuestionsForLevel } from "@/data/grammar";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export default function GrammarPracticeScreen() {
  const colors = usePalette();
  const router = useRouter();
  const params = useLocalSearchParams<{ level?: string; moduleId?: string }>();
  const level: CefrLevel = levels.some((item) => item.id === params.level) ? (params.level as CefrLevel) : "A1";
  const moduleLesson = params.moduleId ? grammarForModule(params.moduleId) : undefined;
  const questions = useMemo(
    () => (moduleLesson?.questions ?? grammarQuestionsForLevel(level)).slice(0, 10),
    [level, moduleLesson],
  );
  const { finishPractice } = useLearning();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const answerCorrect = selected === question?.answer;

  function advance() {
    if (!question) return;
    if (!checked) {
      setChecked(true);
      if (answerCorrect) setScore((current) => current + 1);
      return;
    }
    if (index === questions.length - 1) {
      finishPractice(score, questions.length, []);
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
    setChecked(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  if (!question) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: spacing.lg, gap: spacing.lg }} style={{ backgroundColor: colors.background }}>
        <ThemedText variant="title" style={{ color: colors.text, textAlign: "center" }}>Bu daraja uchun mashq topilmadi.</ThemedText>
        <AppButton title="Ortga qaytish" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: spacing.lg, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 112, height: 112, borderRadius: radius.full, alignItems: "center", justifyContent: "center", backgroundColor: levelColors[level] }}>
            <ThemedText variant="largeTitle" style={{ color: "#FFFFFF" }}>{percentage}%</ThemedText>
          </View>
          <ThemedText variant="title" style={{ color: colors.text, textAlign: "center" }}>{percentage >= 75 ? "Grammatika mustahkam!" : "Yana bir bor takrorlaymiz"}</ThemedText>
          <ThemedText variant="body" style={{ color: colors.textMuted }}>{score}/{questions.length} to‘g‘ri · +{score * 10} XP</ThemedText>
        </View>
        <AppButton title="Qayta ishlash" onPress={restart} />
        <AppButton title="Mashqlarga qaytish" variant="ghost" onPress={() => router.back()} />
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Title>{moduleLesson?.title ?? `${level} grammatika`}</Stack.Title>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <ThemedText variant="caption" style={{ color: levelColors[level] }}>{level} · GRAMMATIKA</ThemedText>
            <ThemedText variant="caption" style={{ color: colors.textMuted }}>{index + 1}/{questions.length}</ThemedText>
          </View>
          <ProgressBar value={(index + 1) / questions.length} />
        </View>

        <View style={{ minHeight: 130, justifyContent: "center", gap: spacing.sm }}>
          <ThemedText variant="caption" style={{ color: colors.textMuted }}>TO‘G‘RI JAVOBNI TANLANG</ThemedText>
          <ThemedText variant="title" style={{ color: colors.text }}>{question.prompt}</ThemedText>
        </View>

        <View style={{ gap: spacing.sm }}>
          {question.options.map((option) => {
            const active = selected === option;
            const isAnswer = option === question.answer;
            const borderColor = checked && isAnswer
              ? colors.success
              : checked && active
                ? colors.danger
                : active
                  ? levelColors[level]
                  : colors.line;
            return (
              <Pressable
                key={option}
                disabled={checked}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                onPress={() => setSelected(option)}
                style={({ pressed }) => ({
                  minHeight: 58,
                  padding: spacing.md,
                  justifyContent: "center",
                  borderRadius: radius.md,
                  borderCurve: "continuous",
                  borderWidth: active || (checked && isAnswer) ? 2 : 1,
                  borderColor,
                  backgroundColor: active || (checked && isAnswer) ? colors.surfaceMuted : colors.surface,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <ThemedText variant="body" style={{ color: colors.text }}>{option}</ThemedText>
              </Pressable>
            );
          })}
        </View>

        {checked ? (
          <View style={{ padding: spacing.md, gap: spacing.xs, borderRadius: radius.md, borderCurve: "continuous", backgroundColor: answerCorrect ? colors.accentSoft : colors.surfaceMuted }}>
            <ThemedText variant="headline" style={{ color: answerCorrect ? colors.success : colors.danger }}>{answerCorrect ? "To‘g‘ri!" : `To‘g‘ri javob: ${question.answer}`}</ThemedText>
            <ThemedText variant="body" style={{ color: colors.text }}>{question.explanation}</ThemedText>
          </View>
        ) : null}

        <AppButton title={checked ? (index === questions.length - 1 ? "Natijani ko‘rish" : "Keyingi savol") : "Tekshirish"} disabled={!selected} onPress={advance} />
      </ScrollView>
    </>
  );
}
