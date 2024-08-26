import { Tabs } from "expo-router";
import { TaskProvider } from "../TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Tabs>
        <Tabs.Screen name="home-screen" options={{ tabBarLabel: 'Home' }} />
        <Tabs.Screen name="archived-screen" options={{ tabBarLabel: 'Archived' }} />
      </Tabs>
    </TaskProvider>
  );
}
