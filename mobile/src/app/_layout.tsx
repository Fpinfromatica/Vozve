import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Definimos que 'welcome' es la pantalla principal */}
      <Stack.Screen name="welcome" />
      {/* Contenedor del grupo de pestañas secundario */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}