import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { SpeakButton } from "@/components/speak-button";
import { ThemedText } from "@/components/themed-text";
import { getWord } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export default function WordScreen() {
  const colors = usePalette();
  const { id } = useLocalSearchParams<{ id: string }>();
  const word = getWord(id);
  const { favoriteWordIds, masteredWordIds, toggleFavorite, toggleMastered } = useLearning();

  if (!word) {
    return <View style={{ flex: 1, justifyContent: "center", padding: spacing.lg, backgroundColor: colors.background }}><ThemedText variant="title" style={{ color: colors.text }}>So‘z topilmadi</ThemedText></View>;
  }

  const favorite = favoriteWordIds.includes(word.id);
  const mastered = masteredWordIds.includes(word.id);

  return (
    <>
      <Stack.Title>{word.german}</Stack.Title>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl }} style={{ backgroundColor: colors.background }}>
        <View style={{ alignItems: "center", gap: spacing.md, paddingVertical: spacing.lg }}>
          <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.full, backgroundColor: levelColors[word.level] }}><ThemedText variant="caption" style={{ color: "#FFFFFF" }}>{word.level} · {word.category}</ThemedText></View>
          <ThemedText variant="largeTitle" style={{ color: colors.text, textAlign: "center" }}>{word.german}</ThemedText>
          <ThemedText variant="body" style={{ color: colors.textMuted }}>{word.phonetic} · {word.partOfSpeech}</ThemedText>
          <View style={{ flexDirection: "row", gap: spacing.sm }}><SpeakButton text={word.german} /><SpeakButton text={word.german} slow /></View>
        </View>

        <View style={{ padding: spacing.lg, gap: spacing.sm, borderRadius: radius.lg, borderCurve: "continuous", backgroundColor: colors.surface }}>
          <ThemedText variant="caption" style={{ color: colors.textMuted }}>O‘ZBEKCHA MA’NOSI</ThemedText>
          <ThemedText variant="title" style={{ color: colors.text }}>{word.uzbek}</ThemedText>
        </View>

        <View style={{ gap: spacing.md }}>
          <ThemedText variant="headline" style={{ color: colors.text }}>Kontekstda</ThemedText>
          <View style={{ padding: spacing.lg, gap: spacing.sm, borderLeftWidth: 4, borderLeftColor: levelColors[word.level], backgroundColor: colors.surfaceMuted }}>
            <ThemedText variant="body" style={{ color: colors.text }}>{word.example}</ThemedText>
            <ThemedText variant="subhead" style={{ color: colors.textMuted }}>{word.exampleUzbek}</ThemedText>
            <SpeakButton text={word.example} />
          </View>
        </View>

        <AppButton title={mastered ? "O‘rganilgan deb belgilangan" : "O‘rgandim deb belgilash"} variant={mastered ? "secondary" : "primary"} onPress={() => toggleMastered(word.id)} />
        <AppButton title={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga saqlash"} variant="ghost" onPress={() => toggleFavorite(word.id)} />
      </ScrollView>
    </>
  );
}

