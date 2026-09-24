import type { TextStyle } from "react-native";
import { useColorScheme } from "react-native";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const type = {
  largeTitle: { fontSize: 34, fontWeight: "800", lineHeight: 40 },
  title: { fontSize: 24, fontWeight: "700", lineHeight: 30 },
  headline: { fontSize: 17, fontWeight: "700", lineHeight: 22 },
  body: { fontSize: 17, fontWeight: "400", lineHeight: 24 },
  subhead: { fontSize: 15, fontWeight: "500", lineHeight: 20 },
  caption: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
} as const satisfies Record<string, TextStyle>;

export const levelColors = {
  A1: "#2D8A57",
  A2: "#18808D",
  B1: "#3569B4",
  B2: "#6756B3",
  C1: "#A04B78",
  C2: "#A15B26",
} as const;

export const shadows = {
  card: "0 1px 3px rgba(20, 32, 23, 0.08)",
  raised: "0 8px 24px rgba(20, 32, 23, 0.14)",
} as const;

const palettes = {
  light: {
    background: "#F7F8F4",
    surface: "#FFFFFF",
    surfaceMuted: "#EEF1E8",
    text: "#172018",
    textMuted: "#677168",
    line: "#DDE2DA",
    accent: "#1E7A46",
    accentSoft: "#DDF3E5",
    accentText: "#FFFFFF",
    warning: "#F1B93A",
    danger: "#B13C3C",
    success: "#1E7A46",
    gold: "#D89A1D",
  },
  dark: {
    background: "#111613",
    surface: "#1B221D",
    surfaceMuted: "#252E27",
    text: "#F2F6F2",
    textMuted: "#AAB4AC",
    line: "#354038",
    accent: "#68D391",
    accentSoft: "#193C27",
    accentText: "#102216",
    warning: "#F1C75B",
    danger: "#F38A8A",
    success: "#68D391",
    gold: "#F1C75B",
  },
} as const;

export function usePalette() {
  const scheme = useColorScheme();
  return palettes[scheme === "dark" ? "dark" : "light"];
}
