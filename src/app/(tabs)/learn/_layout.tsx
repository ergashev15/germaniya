import { Stack } from "expo-router/stack";
import { usePalette } from "@/theme";

export default function LearnLayout() {
  const colors = usePalette();
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="index" options={{ title: "A1–C2 kursi" }} />
    </Stack>
  );
}
