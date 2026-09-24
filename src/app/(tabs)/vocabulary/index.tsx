import { useMemo, useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { LevelPill } from "@/components/level-pill";
import { ThemedText } from "@/components/themed-text";
import { VocabularyRow } from "@/components/vocabulary-row";
import { levels, vocabulary, type CefrLevel } from "@/data/curriculum";
import { useLearning } from "@/state/learning-context";
import { radius, spacing, type, usePalette } from "@/theme";

export default function VocabularyScreen() {
  const colors = usePalette();
  const { currentLevel, favoriteWordIds } = useLearning();
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>(currentLevel);
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const words = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("de");
    return vocabulary.filter((word) => {
      const levelMatches = word.level === selectedLevel;
      const favoriteMatches = !favoritesOnly || favoriteWordIds.includes(word.id);
      const queryMatches = !normalized || `${word.german} ${word.uzbek} ${word.category}`.toLocaleLowerCase("de").includes(normalized);
      return levelMatches && favoriteMatches && queryMatches;
    });
  }, [favoriteWordIds, favoritesOnly, query, selectedLevel]);

  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <VocabularyRow word={item} />}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl }}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      ListHeaderComponent={
        <View style={{ gap: spacing.md, paddingBottom: spacing.lg }}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Nemischa yoki o‘zbekcha qidiring"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            returnKeyType="search"
            style={[type.body, { minHeight: 52, paddingHorizontal: spacing.md, color: colors.text, backgroundColor: colors.surface, borderRadius: radius.md, borderCurve: "continuous", borderWidth: 1, borderColor: colors.line }]}
          />
          <FlatList
            horizontal
            data={levels}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <LevelPill level={item.id} selected={item.id === selectedLevel} onPress={() => setSelectedLevel(item.id)} />}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
          />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <ThemedText variant="subhead" style={{ color: colors.textMuted }}>{words.length} ta so‘z</ThemedText>
            <Pressable accessibilityRole="button" accessibilityState={{ selected: favoritesOnly }} onPress={() => setFavoritesOnly((current) => !current)} style={({ pressed }) => ({ paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.full, backgroundColor: favoritesOnly ? colors.accentSoft : colors.surface, opacity: pressed ? 0.7 : 1 })}>
              <ThemedText variant="caption" style={{ color: favoritesOnly ? colors.accent : colors.textMuted }}>Faqat saqlanganlar</ThemedText>
            </Pressable>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={{ paddingVertical: spacing.xxl, alignItems: "center", gap: spacing.sm }}>
          <ThemedText variant="headline" style={{ color: colors.text }}>So‘z topilmadi</ThemedText>
          <ThemedText variant="body" style={{ color: colors.textMuted, textAlign: "center" }}>Qidiruvni o‘zgartiring yoki sevimlilar filtrini o‘chiring.</ThemedText>
        </View>
      }
    />
  );
}

