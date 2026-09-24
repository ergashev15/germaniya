import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { SpeakButton } from "@/components/speak-button";
import { ThemedText } from "@/components/themed-text";
import type { VocabularyWord } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export function VocabularyRow({ word }: { word: VocabularyWord }) {
  const colors = usePalette();
  const router = useRouter();
  const { favoriteWordIds, masteredWordIds, toggleFavorite } = useLearning();
  const favorite = favoriteWordIds.includes(word.id);
  const mastered = masteredWordIds.includes(word.id);

  return (
    <View style={{ paddingVertical: spacing.md, paddingHorizontal: spacing.md, gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.line, backgroundColor: colors.surface }}>
      <Pressable onPress={() => router.push({ pathname: "/word/[id]", params: { id: word.id } })} style={({ pressed }) => ({ flexDirection: "row", gap: spacing.md, opacity: pressed ? 0.65 : 1 })}>
        <View style={{ width: 42, height: 42, borderRadius: radius.md, borderCurve: "continuous", alignItems: "center", justifyContent: "center", backgroundColor: levelColors[word.level] }}>
          <ThemedText variant="caption" style={{ color: "#FFFFFF" }}>{word.level}</ThemedText>
        </View>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <ThemedText variant="headline" style={{ color: colors.text }}>{word.german}</ThemedText>
            {mastered ? <ThemedText variant="caption" style={{ color: colors.success }}>O‘rganildi</ThemedText> : null}
          </View>
          <ThemedText variant="subhead" style={{ color: colors.textMuted }}>{word.uzbek}</ThemedText>
          <ThemedText variant="caption" style={{ color: colors.textMuted }}>{word.phonetic} · {word.partOfSpeech}</ThemedText>
        </View>
      </Pressable>
      <View style={{ flexDirection: "row", gap: spacing.sm, justifyContent: "flex-end" }}>
        <SpeakButton text={word.german} />
        <Pressable accessibilityRole="button" accessibilityLabel={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo‘shish"} onPress={() => toggleFavorite(word.id)} style={({ pressed }) => ({ minHeight: 40, paddingHorizontal: spacing.md, alignItems: "center", justifyContent: "center", borderRadius: radius.full, borderWidth: 1, borderColor: favorite ? colors.gold : colors.line, opacity: pressed ? 0.7 : 1 })}>
          <ThemedText variant="caption" style={{ color: favorite ? colors.gold : colors.textMuted }}>{favorite ? "Saqlangan" : "Saqlash"}</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

