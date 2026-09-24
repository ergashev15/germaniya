import { ScrollView, View } from "react-native";
import { ProgressBar } from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import { courseModules, levels, vocabulary } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export default function ProgressScreen() {
  const colors = usePalette();
  const { completedModuleIds, masteredWordIds, favoriteWordIds, xp, streak, practiceSessions, correctAnswers, totalAnswers } = useLearning();
  const accuracy = totalAnswers ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  const courseProgress = completedModuleIds.length / courseModules.length;
  const vocabularyProgress = masteredWordIds.length / vocabulary.length;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
      <View style={{ padding: spacing.lg, gap: spacing.lg, borderRadius: radius.xl, borderCurve: "continuous", backgroundColor: colors.accent }}>
        <View style={{ gap: spacing.xs }}><ThemedText variant="caption" style={{ color: colors.accentText, opacity: 0.78 }}>UMUMIY NATIJA</ThemedText><ThemedText variant="largeTitle" style={{ color: colors.accentText, fontVariant: ["tabular-nums"] }}>{xp} XP</ThemedText></View>
        <View style={{ flexDirection: "row", gap: spacing.lg }}>
          <View style={{ flex: 1 }}><ThemedText variant="title" style={{ color: colors.accentText }}>{streak}</ThemedText><ThemedText variant="caption" style={{ color: colors.accentText, opacity: 0.78 }}>kunlik seriya</ThemedText></View>
          <View style={{ flex: 1 }}><ThemedText variant="title" style={{ color: colors.accentText }}>{accuracy}%</ThemedText><ThemedText variant="caption" style={{ color: colors.accentText, opacity: 0.78 }}>aniqlik</ThemedText></View>
          <View style={{ flex: 1 }}><ThemedText variant="title" style={{ color: colors.accentText }}>{practiceSessions}</ThemedText><ThemedText variant="caption" style={{ color: colors.accentText, opacity: 0.78 }}>mashq</ThemedText></View>
        </View>
      </View>

      <View style={{ gap: spacing.lg }}>
        <ThemedText variant="headline" style={{ color: colors.text }}>Katta maqsadlar</ThemedText>
        {[
          { title: "A1–C2 kursi", detail: `${completedModuleIds.length}/${courseModules.length} modul`, progress: courseProgress },
          { title: "Faol lug‘at", detail: `${masteredWordIds.length}/${vocabulary.length} so‘z`, progress: vocabularyProgress },
          { title: "Sevimli so‘zlar", detail: `${favoriteWordIds.length} ta saqlangan`, progress: Math.min(1, favoriteWordIds.length / 20) },
        ].map((item) => (
          <View key={item.title} style={{ gap: spacing.sm }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}><ThemedText variant="headline" style={{ color: colors.text }}>{item.title}</ThemedText><ThemedText variant="caption" style={{ color: colors.textMuted }}>{item.detail}</ThemedText></View><ProgressBar value={item.progress} /></View>
        ))}
      </View>

      <View style={{ gap: spacing.md }}>
        <ThemedText variant="headline" style={{ color: colors.text }}>Darajalar xaritasi</ThemedText>
        {levels.map((level) => {
          const modules = courseModules.filter((item) => item.level === level.id);
          const completed = modules.filter((item) => completedModuleIds.includes(item.id)).length;
          const words = vocabulary.filter((item) => item.level === level.id);
          const mastered = words.filter((item) => masteredWordIds.includes(item.id)).length;
          return (
            <View key={level.id} style={{ flexDirection: "row", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.line }}>
              <View style={{ width: 52, height: 52, borderRadius: radius.md, borderCurve: "continuous", alignItems: "center", justifyContent: "center", backgroundColor: levelColors[level.id] }}><ThemedText variant="headline" style={{ color: "#FFFFFF" }}>{level.id}</ThemedText></View>
              <View style={{ flex: 1, gap: spacing.sm }}><View style={{ flexDirection: "row", justifyContent: "space-between" }}><ThemedText variant="headline" style={{ color: colors.text }}>{level.name}</ThemedText><ThemedText variant="caption" style={{ color: colors.textMuted }}>{completed}/{modules.length} modul</ThemedText></View><ProgressBar value={(completed + mastered / words.length) / (modules.length + 1)} /><ThemedText variant="caption" style={{ color: colors.textMuted }}>{mastered}/{words.length} so‘z o‘zlashtirildi</ThemedText></View>
            </View>
          );
        })}
      </View>

      <View style={{ padding: spacing.lg, gap: spacing.sm, borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surfaceMuted }}>
        <ThemedText variant="headline" style={{ color: colors.text }}>Keyingi nishon</ThemedText>
        <ThemedText variant="body" style={{ color: colors.textMuted }}>{xp < 500 ? `${500 - xp} XP dan keyin “Faol o‘quvchi” nishoni ochiladi.` : "Siz “Faol o‘quvchi” nishonini ochdingiz. 1000 XP tomon davom eting."}</ThemedText>
      </View>
    </ScrollView>
  );
}

