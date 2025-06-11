import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Hide header for both screens */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="form" options={{ title: 'Form' }} />
      <Stack.Screen name="profile" options={{ title: 'The Ride' }} />
    
    </Stack>
  );
}
