import { Stack } from "expo-router/stack";
import { usePalette } from "@/theme";

export default function PracticeLayout() {
  const colors = usePalette();
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="index" options={{ title: "Tezkor mashq" }} />
      <Stack.Screen name="grammar" options={{ title: "Grammatika mashqi" }} />
    </Stack>
  );
}
