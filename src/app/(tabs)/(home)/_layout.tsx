import { Stack } from "expo-router/stack";
import { usePalette } from "@/theme";

export default function HomeLayout() {
  const colors = usePalette();
  return (
    <Stack screenOptions={{ headerShadowVisible: false, headerStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="index" options={{ title: "Guten Tag!" }} />
    </Stack>
  );
}

