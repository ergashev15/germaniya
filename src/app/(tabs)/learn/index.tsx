import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { LevelPill } from "@/components/level-pill";
import { ProgressBar } from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import { courseModules, getLevel, levels } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export default function LearnScreen() {
  const colors = usePalette();
  const router = useRouter();
  const { currentLevel, setCurrentLevel, completedModuleIds } = useLearning();
  const level = getLevel(currentLevel);
  const modules = courseModules.filter((item) => item.level === currentLevel);
  const completed = modules.filter((item) => completedModuleIds.includes(item.id)).length;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.lg }} style={{ backgroundColor: colors.background }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {levels.map((item) => <LevelPill key={item.id} level={item.id} selected={item.id === currentLevel} onPress={() => setCurrentLevel(item.id)} />)}
      </ScrollView>

      <View style={{ padding: spacing.lg, gap: spacing.md, borderRadius: radius.xl, borderCurve: "continuous", backgroundColor: levelColors[currentLevel] }}>
        <ThemedText variant="caption" style={{ color: "#FFFFFF", opacity: 0.8 }}>{level.hours.toUpperCase()}</ThemedText>
        <ThemedText variant="title" style={{ color: "#FFFFFF" }}>{currentLevel} · {level.name}</ThemedText>
        <ThemedText variant="body" style={{ color: "#FFFFFF", opacity: 0.9 }}>{level.description}</ThemedText>
        <ProgressBar value={completed / modules.length} />
        <ThemedText variant="caption" style={{ color: "#FFFFFF" }}>{completed} / {modules.length} modul yakunlandi</ThemedText>
      </View>

      <View style={{ gap: spacing.xs }}>
        <ThemedText variant="headline" style={{ color: colors.text }}>Kurs modullari</ThemedText>
        <ThemedText variant="subhead" style={{ color: colors.textMuted }}>Har bir modul lug‘at, grammatika va talaffuzni birlashtiradi.</ThemedText>
      </View>

      <View style={{ borderRadius: radius.lg, borderCurve: "continuous", overflow: "hidden", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
        {modules.map((module, index) => {
          const isDone = completedModuleIds.includes(module.id);
          return (
            <Pressable key={module.id} onPress={() => router.push({ pathname: "/module/[id]", params: { id: module.id } })} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 94, padding: spacing.md, borderBottomWidth: index === modules.length - 1 ? 0 : 1, borderBottomColor: colors.line, opacity: pressed ? 0.65 : 1 })}>
              <View style={{ width: 48, height: 48, borderRadius: radius.full, alignItems: "center", justifyContent: "center", backgroundColor: isDone ? levelColors[currentLevel] : colors.surfaceMuted }}>
                <ThemedText variant="headline" style={{ color: isDone ? "#FFFFFF" : colors.text }}>{isDone ? "✓" : module.order}</ThemedText>
              </View>
              <View style={{ flex: 1, gap: spacing.xs }}>
                <ThemedText variant="headline" style={{ color: colors.text }}>{module.title}</ThemedText>
                <ThemedText variant="subhead" style={{ color: colors.textMuted }}>{module.description}</ThemedText>
                <ThemedText variant="caption" style={{ color: levelColors[currentLevel] }}>{module.focus} · {module.minutes} daqiqa</ThemedText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

