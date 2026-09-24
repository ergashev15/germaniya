import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { ProgressBar } from "@/components/progress-bar";
import { ThemedText } from "@/components/themed-text";
import { courseModules, getLevel, levels, vocabulary } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, shadows, spacing, usePalette } from "@/theme";

export default function HomeScreen() {
  const colors = usePalette();
  const router = useRouter();
  const { currentLevel, completedModuleIds, masteredWordIds, xp, streak } = useLearning();
  const level = getLevel(currentLevel);
  const levelModules = courseModules.filter((item) => item.level === currentLevel);
  const nextModule = levelModules.find((item) => !completedModuleIds.includes(item.id)) ?? levelModules[0];
  const doneInLevel = levelModules.filter((item) => completedModuleIds.includes(item.id)).length;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl, gap: spacing.lg }} style={{ backgroundColor: colors.background }}>
      <View style={{ overflow: "hidden", borderRadius: radius.xl, borderCurve: "continuous", backgroundColor: colors.surface, boxShadow: shadows.raised }}>
        <Image source={require("../../../../assets/images/german-journey-hero.png")} contentFit="cover" transition={250} style={{ width: "100%", aspectRatio: 1.75 }} accessibilityLabel="Berlin manzarasi fonida nemis tilini o‘rganayotgan talaba" />
        <View style={{ padding: spacing.lg, gap: spacing.md }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <View style={{ paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.full, backgroundColor: levelColors[currentLevel] }}>
              <ThemedText variant="caption" style={{ color: "#FFFFFF" }}>{currentLevel}</ThemedText>
            </View>
            <ThemedText variant="caption" style={{ color: colors.textMuted }}>{level.name}</ThemedText>
          </View>
          <ThemedText variant="title" style={{ color: colors.text }}>Nemischa yo‘lingizni davom ettiring</ThemedText>
          <ThemedText variant="body" style={{ color: colors.textMuted }}>Bugun 15 daqiqa ajrating: yangi so‘zlar, tinglash va faol mashq.</ThemedText>
          <AppButton title="Davom etish" onPress={() => router.push({ pathname: "/module/[id]", params: { id: nextModule.id } })} />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        {[
          { value: String(xp), label: "XP" },
          { value: String(streak), label: "Kun seriyasi" },
          { value: String(masteredWordIds.length), label: "So‘z o‘rganildi" },
        ].map((stat) => (
          <View key={stat.label} style={{ flex: 1, paddingVertical: spacing.md, alignItems: "center", gap: spacing.xs }}>
            <ThemedText variant="title" style={{ color: colors.text, fontVariant: ["tabular-nums"] }}>{stat.value}</ThemedText>
            <ThemedText variant="caption" style={{ color: colors.textMuted, textAlign: "center" }}>{stat.label}</ThemedText>
          </View>
        ))}
      </View>

      <View style={{ padding: spacing.lg, gap: spacing.md, borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
          <ThemedText variant="headline" style={{ color: colors.text }}>{currentLevel} progressi</ThemedText>
          <ThemedText variant="caption" style={{ color: levelColors[currentLevel] }}>{doneInLevel}/{levelModules.length} modul</ThemedText>
        </View>
        <ProgressBar value={doneInLevel / levelModules.length} />
        <ThemedText variant="subhead" style={{ color: colors.textMuted }}>{level.goal}</ThemedText>
      </View>

      <View style={{ gap: spacing.md }}>
        <ThemedText variant="headline" style={{ color: colors.text }}>Tezkor mashqlar</ThemedText>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {[
            { title: "Ma’noni toping", mode: "meaning", detail: "10 savol" },
            { title: "Eshitib toping", mode: "listening", detail: "de-DE ovoz" },
          ].map((item) => (
            <Pressable key={item.mode} onPress={() => router.push({ pathname: "/practice/session", params: { mode: item.mode, level: currentLevel } })} style={({ pressed }) => ({ flex: 1, minHeight: 118, padding: spacing.md, justifyContent: "space-between", borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surfaceMuted, opacity: pressed ? 0.7 : 1 })}>
              <ThemedText variant="headline" style={{ color: colors.text }}>{item.title}</ThemedText>
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>{item.detail}</ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText variant="headline" style={{ color: colors.text }}>A1 dan C2 gacha</ThemedText>
          <ThemedText variant="caption" style={{ color: colors.textMuted }}>{vocabulary.length} so‘z va birikma</ThemedText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
          {levels.map((item) => (
            <View key={item.id} style={{ width: 148, padding: spacing.md, gap: spacing.sm, borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surface, borderTopWidth: 4, borderTopColor: levelColors[item.id] }}>
              <ThemedText variant="title" style={{ color: levelColors[item.id] }}>{item.id}</ThemedText>
              <ThemedText variant="caption" style={{ color: colors.text }}>{item.name}</ThemedText>
              <ThemedText variant="caption" style={{ color: colors.textMuted }}>{item.hours}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
