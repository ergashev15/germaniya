import { View } from "react-native";
import { radius, usePalette } from "@/theme";

export function ProgressBar({ value }: { value: number }) {
  const colors = usePalette();
  const width = `${Math.min(100, Math.max(0, value * 100))}%` as `${number}%`;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
      style={{ height: 8, borderRadius: radius.full, backgroundColor: colors.line }}
    >
      <View
        style={{
          height: 8,
          width,
          borderRadius: radius.full,
          backgroundColor: colors.accent,
        }}
      />
    </View>
  );
}

