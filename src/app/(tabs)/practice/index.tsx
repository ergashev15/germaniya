import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { LevelPill } from "@/components/level-pill";
import { ThemedText } from "@/components/themed-text";
import { levels } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

const modes = [
  { id: "meaning", title: "Ma’noni toping", description: "Nemischa birlik uchun to‘g‘ri tarjimani tanlang", meta: "10 savol · +100 XP" },
  { id: "reverse", title: "Nemischasini toping", description: "O‘zbekcha ma’noga mos nemischa javobni tanlang", meta: "10 savol · teskari test" },
  { id: "listening", title: "Tinglab tushunish", description: "Nemischa talaffuzni eshiting va ma’noni toping", meta: "10 savol · de-DE ovoz" },
  { id: "writing", title: "Yozib eslang", description: "O‘zbekcha ma’nodan nemischa birlikni yozing", meta: "10 savol · faol xotira" },
  { id: "article", title: "Artikl ustasi", description: "Otlar uchun der, die yoki das artiklini toping", meta: "10 savol · grammatika" },
  { id: "context", title: "Gapni to‘ldiring", description: "Misoldagi bo‘sh joyga mos birikmani toping", meta: "10 savol · kontekst" },
] as const;

export default function PracticeScreen() {
  const colors = usePalette();
  const router = useRouter();
  const { currentLevel, setCurrentLevel, practiceSessions, totalAnswers, correctAnswers } = useLearning();
  const accuracy = totalAnswers ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.lg }} style={{ backgroundColor: colors.background }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
        {levels.map((level) => <LevelPill key={level.id} level={level.id} selected={currentLevel === level.id} onPress={() => setCurrentLevel(level.id)} />)}
      </ScrollView>
      <View style={{ padding: spacing.lg, gap: spacing.md, borderRadius: radius.xl, borderCurve: "continuous", backgroundColor: levelColors[currentLevel] }}>
        <ThemedText variant="caption" style={{ color: "#FFFFFF", opacity: 0.8 }}>BUGUNGI TRENAJOR · {currentLevel}</ThemedText>
        <ThemedText variant="title" style={{ color: "#FFFFFF" }}>Qaysi ko‘nikmani mashq qilamiz?</ThemedText>
        <View style={{ flexDirection: "row", gap: spacing.lg }}>
          <View><ThemedText variant="title" style={{ color: "#FFFFFF", fontVariant: ["tabular-nums"] }}>{practiceSessions}</ThemedText><ThemedText variant="caption" style={{ color: "#FFFFFF", opacity: 0.75 }}>sessiya</ThemedText></View>
          <View><ThemedText variant="title" style={{ color: "#FFFFFF", fontVariant: ["tabular-nums"] }}>{accuracy}%</ThemedText><ThemedText variant="caption" style={{ color: "#FFFFFF", opacity: 0.75 }}>aniqlik</ThemedText></View>
        </View>
      </View>
      <View style={{ gap: spacing.sm }}>
        <Pressable onPress={() => router.push({ pathname: "/practice/grammar", params: { level: currentLevel } })} style={({ pressed }) => ({ flexDirection: "row", minHeight: 118, paddingVertical: spacing.lg, gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.line, opacity: pressed ? 0.65 : 1 })}>
          <View style={{ width: 48, height: 48, borderRadius: radius.md, borderCurve: "continuous", alignItems: "center", justifyContent: "center", backgroundColor: colors.accentSoft }}><ThemedText variant="headline" style={{ color: colors.accent }}>G</ThemedText></View>
          <View style={{ flex: 1, gap: spacing.xs }}><ThemedText variant="headline" style={{ color: colors.text }}>Grammatika testi</ThemedText><ThemedText variant="subhead" style={{ color: colors.textMuted }}>Darajangizdagi qoidalarni misollar bilan mustahkamlang</ThemedText><ThemedText variant="caption" style={{ color: levelColors[currentLevel] }}>8 savol · izohli javoblar</ThemedText></View>
        </Pressable>
        {modes.map((mode, index) => (
          <Pressable key={mode.id} onPress={() => router.push({ pathname: "/practice/session", params: { mode: mode.id, level: currentLevel } })} style={({ pressed }) => ({ flexDirection: "row", minHeight: 118, paddingVertical: spacing.lg, gap: spacing.md, borderBottomWidth: index === modes.length - 1 ? 0 : 1, borderBottomColor: colors.line, opacity: pressed ? 0.65 : 1 })}>
            <View style={{ width: 48, height: 48, borderRadius: radius.md, borderCurve: "continuous", alignItems: "center", justifyContent: "center", backgroundColor: colors.accentSoft }}><ThemedText variant="headline" style={{ color: colors.accent }}>0{index + 1}</ThemedText></View>
            <View style={{ flex: 1, gap: spacing.xs }}><ThemedText variant="headline" style={{ color: colors.text }}>{mode.title}</ThemedText><ThemedText variant="subhead" style={{ color: colors.textMuted }}>{mode.description}</ThemedText><ThemedText variant="caption" style={{ color: levelColors[currentLevel] }}>{mode.meta}</ThemedText></View>
          </Pressable>
        ))}
      </View>
      <View style={{ padding: spacing.lg, gap: spacing.sm, borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surfaceMuted }}>
        <ThemedText variant="headline" style={{ color: colors.text }}>Talaffuz bo‘yicha maslahat</ThemedText>
        <ThemedText variant="body" style={{ color: colors.textMuted }}>Avval normal tezlikda tinglang, so‘ng “Sekin tinglash” orqali bo‘g‘inlarni ajrating. So‘zni uch marta baland ovozda takrorlang.</ThemedText>
      </View>
    </ScrollView>
  );
}
