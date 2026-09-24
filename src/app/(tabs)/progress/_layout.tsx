import { Stack } from "expo-router/stack";
import { usePalette } from "@/theme";

export default function ProgressLayout() {
  const colors = usePalette();
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="index" options={{ title: "Natijalarim" }} />
    </Stack>
  );
}
