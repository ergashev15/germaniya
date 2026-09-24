import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { LearningProvider } from "@/state/learning-context";
import { usePalette } from "@/theme";

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = usePalette();

  return (
    <LearningProvider>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="module/[id]" options={{ title: "Modul" }} />
        <Stack.Screen name="word/[id]" options={{ title: "So‘z" }} />
      </Stack>
    </LearningProvider>
  );
}
