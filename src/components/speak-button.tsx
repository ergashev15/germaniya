import { Pressable } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { radius, spacing, usePalette } from "@/theme";
import { speakGerman } from "@/utils/speech";

export function SpeakButton({ text, slow = false }: { text: string; slow?: boolean }) {
  const colors = usePalette();
  const label = slow ? "Sekin tinglash" : "Tinglash";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${text}: ${label}`}
      onPress={() => speakGerman(text, slow)}
      style={({ pressed }) => ({
        minHeight: 40,
        paddingHorizontal: spacing.md,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.full,
        backgroundColor: colors.accentSoft,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <ThemedText variant="caption" style={{ color: colors.accent }}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

