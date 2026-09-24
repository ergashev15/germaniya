import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import { radius, spacing, usePalette } from "@/theme";
import { ThemedText } from "@/components/themed-text";

export function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = usePalette();
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 52,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius.lg,
          borderCurve: "continuous",
          backgroundColor: isPrimary
            ? colors.accent
            : isGhost
              ? "transparent"
              : colors.surfaceMuted,
          borderWidth: isGhost ? 1 : 0,
          borderColor: colors.line,
          opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
        },
        style,
      ]}
    >
      <ThemedText
        variant="headline"
        style={{ color: isPrimary ? colors.accentText : colors.text }}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}
