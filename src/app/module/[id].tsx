import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { SpeakButton } from "@/components/speak-button";
import { ThemedText } from "@/components/themed-text";
import { courseModules, getLevel, vocabulary } from "@/data/curriculum";
import { grammarForModule } from "@/data/grammar";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export default function ModuleScreen() {
  const colors = usePalette();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const module = courseModules.find((item) => item.id === id);
  const { completedModuleIds, completeModule, setCurrentLevel } = useLearning();

  if (!module) {
    return <View style={{ flex: 1, justifyContent: "center", padding: spacing.lg, backgroundColor: colors.background }}><ThemedText variant="title" style={{ color: colors.text }}>Modul topilmadi</ThemedText></View>;
  }

  const level = getLevel(module.level);
  const levelWords = vocabulary.filter((word) => word.level === module.level);
  const words = levelWords.slice((module.order - 1) * 12, module.order * 12);
  const grammar = grammarForModule(module.id);
  const isDone = completedModuleIds.includes(module.id);
  const moduleId = module.id;
  const moduleLevel = module.level;

  function finish() {
    setCurrentLevel(moduleLevel);
    completeModule(moduleId);
    router.back();
  }

  return (
    <>
      <Stack.Title>{module.title}</Stack.Title>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ padding: spacing.lg, gap: spacing.md, borderRadius: radius.xl, borderCurve: "continuous", backgroundColor: levelColors[module.level] }}>
          <ThemedText variant="caption" style={{ color: "#FFFFFF", opacity: 0.8 }}>{module.level} · {module.focus.toUpperCase()}</ThemedText>
          <ThemedText variant="title" style={{ color: "#FFFFFF" }}>{module.description}</ThemedText>
          <ThemedText variant="body" style={{ color: "#FFFFFF", opacity: 0.9 }}>Maqsad: {level.goal.toLowerCase()} va mavzu bo‘yicha faol lug‘at yaratish.</ThemedText>
        </View>

        <View style={{ gap: spacing.md }}>
          <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
            <ThemedText variant="headline" style={{ color: colors.text }}>Faol lug‘at</ThemedText>
            <ThemedText variant="caption" style={{ color: colors.textMuted }}>{words.length} ta birlik</ThemedText>
          </View>
          {words.map((word) => (
            <View key={word.id} style={{ paddingVertical: spacing.md, gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.line }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <View style={{ flex: 1, gap: spacing.xs }}>
                  <ThemedText variant="headline" style={{ color: colors.text }}>{word.german}</ThemedText>
                  <ThemedText variant="caption" style={{ color: colors.textMuted }}>{word.phonetic} · {word.partOfSpeech}</ThemedText>
                </View>
                <SpeakButton text={word.german} />
              </View>
              <ThemedText variant="body" style={{ color: colors.textMuted }}>{word.uzbek}</ThemedText>
              <ThemedText variant="subhead" style={{ color: colors.text }}>{word.example}</ThemedText>
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>{word.exampleUzbek}</ThemedText>
            </View>
          ))}
        </View>

        {grammar ? (
          <View style={{ gap: spacing.md }}>
            <ThemedText variant="headline" style={{ color: colors.text }}>Grammatika · {grammar.title}</ThemedText>
            <View style={{ padding: spacing.lg, gap: spacing.md, borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surfaceMuted }}>
              <ThemedText variant="body" style={{ color: colors.text }}>{grammar.rule}</ThemedText>
              <View style={{ padding: spacing.md, borderRadius: radius.md, borderCurve: "continuous", backgroundColor: colors.surface }}>
                <ThemedText variant="caption" style={{ color: levelColors[module.level] }}>QOLIP</ThemedText>
                <ThemedText variant="headline" style={{ color: colors.text }}>{grammar.formula}</ThemedText>
              </View>
              {grammar.examples.map((example) => (
                <View key={example.german} style={{ gap: spacing.xs }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                    <ThemedText variant="subhead" style={{ flex: 1, color: colors.text }}>{example.german}</ThemedText>
                    <SpeakButton text={example.german} />
                  </View>
                  <ThemedText variant="caption" style={{ color: colors.textMuted }}>{example.uzbek}</ThemedText>
                </View>
              ))}
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>Eslab qoling: {grammar.tip}</ThemedText>
            </View>
            <AppButton title={`${grammar.questions.length} ta grammatik mashq`} variant="secondary" onPress={() => router.push({ pathname: "/practice/grammar", params: { level: module.level, moduleId: module.id } })} />
          </View>
        ) : null}

        <AppButton title={isDone ? "Modul yakunlangan" : "Modulni yakunlash · +50 XP"} disabled={isDone} onPress={finish} />
      </ScrollView>
    </>
  );
}
