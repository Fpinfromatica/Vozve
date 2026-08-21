import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, Activity, Radio, AlertTriangle } from 'lucide-react-native'; // o tus iconos

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Cabecera / Identidad */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>VOZVE</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>● VENEZUELA EN TIEMPO REAL</Text>
          </View>
        </View>
      </View>

      {/* Contenido Central */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.metricsPill}>
          <Text style={styles.metricsText}>24 EVENTOS ACTIVOS  ·  248 EN VIVO</Text>
        </View>

        <Text style={styles.heroTitle}>
          Plataforma de monitoreo y alertas ciudadanas en tiempo real
        </Text>

        <Text style={styles.heroSubtitle}>
          Reportes verificados por la comunidad sobre servicios básicos, vialidad y transmisiones en vivo.
        </Text>
      </ScrollView>

      {/* ZONA INFERIOR: Iniciar Sesión o Registrarse */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={styles.btnRegisterText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.btnLoginText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* Acceso opcional como invitado */}
        <TouchableOpacity
          style={styles.btnGuest}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.btnGuestText}>Explorar mapa sin cuenta →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    paddingTop: 40,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#34d399',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  metricsPill: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  metricsText: {
    color: '#06b6d4',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  heroSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 340,
  },
  bottomSection: {
    gap: 12,
    paddingBottom: 20,
  },
  btnRegister: {
    backgroundColor: '#0891b2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnRegisterText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  btnLogin: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnLoginText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  btnGuest: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnGuestText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '500',
  },
});