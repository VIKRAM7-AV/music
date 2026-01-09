import { ThemeProvider } from '@/context/themecontext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "./global.css"

export default function RootLayout() {

  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/onboarding/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
