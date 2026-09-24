import { Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";
import type { CefrLevel } from "@/data/curriculum";
import { levelColors, radius, spacing, usePalette } from "@/theme";

export function LevelPill({
  level,
  selected,
  onPress,
}: {
  level: CefrLevel;
  selected: boolean;
  onPress: () => void;
}) {
  const colors = usePalette();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        minWidth: 52,
        minHeight: 40,
        paddingHorizontal: spacing.md,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: selected ? levelColors[level] : colors.surface,
        borderWidth: 1,
        borderColor: selected ? levelColors[level] : colors.line,
        opacity: pressed ? 0.72 : 1,
      })}
    >
      <ThemedText variant="caption" style={{ color: selected ? "#FFFFFF" : colors.text }}>
        {level}
      </ThemedText>
    </Pressable>
  );
}

