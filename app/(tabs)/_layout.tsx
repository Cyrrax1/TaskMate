import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* The main entry point for your app - the login screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* The home screen that the user will navigate to after logging in */}
      <Stack.Screen name="home-screen" options={{ headerShown: false }} />
    </Stack>
  );
}
