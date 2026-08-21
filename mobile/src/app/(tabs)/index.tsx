import { Redirect } from 'expo-router';

export default function Index() {
  // Redirige siempre a la pantalla de bienvenida al abrir la app
  return <Redirect href="/welcome" />;
}