import { NativeTabs } from "expo-router/unstable-native-tabs";
import { usePalette } from "@/theme";

export default function TabLayout() {
  const colors = usePalette();

  return (
    <NativeTabs tintColor={colors.accent} backgroundColor={colors.surface}>
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        <NativeTabs.Trigger.Label>Bosh sahifa</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="learn">
        <NativeTabs.Trigger.Icon sf="book.fill" md="menu_book" />
        <NativeTabs.Trigger.Label>Darslar</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="vocabulary">
        <NativeTabs.Trigger.Icon sf="text.book.closed.fill" md="translate" />
        <NativeTabs.Trigger.Label>Lug‘at</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="practice">
        <NativeTabs.Trigger.Icon sf="checkmark.circle.fill" md="task_alt" />
        <NativeTabs.Trigger.Label>Mashq</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="progress">
        <NativeTabs.Trigger.Icon sf="chart.bar.fill" md="bar_chart" />
        <NativeTabs.Trigger.Label>Natijalar</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
