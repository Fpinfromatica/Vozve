import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../core/supabase';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      // Iniciar sesión con Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Consultar estado de baneo de forma segura
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('is_banned, ban_reason, alias')
            .eq('id', data.user.id)
            .maybeSingle();

          if (profile?.is_banned) {
            await supabase.auth.signOut();
            alert(
              `ACCESO DENEGADO:\nTu cuenta ha sido suspendida de VozVe.\nMotivo: ${
                profile.ban_reason || 'Reportes falsos'
              }`
            );
            setIsLoading(false);
            return;
          }
        } catch (e) {
          // Si la tabla profile aún no sincronizó, dejamos pasar al usuario autenticado
          console.log('Validación secundaria de perfil omitida');
        }

        alert('¡Inicio de sesión exitoso!');
        // Navegación directa al panel de reportes
        router.replace('/(tabs)' as any);
      }
    } catch (err: any) {
      alert(`Error de conexión: ${err.message || 'Inténtalo de nuevo'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            <View style={styles.badgeSecure}>
              <Text style={styles.badgeText}>🔒 Acceso Cifrado</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.brandTitle}>VOZVE</Text>
              <Text style={styles.mainTitle}>Iniciar Sesión Ciudadana</Text>
              <Text style={styles.subTitle}>
                Accede para consultar el mapa en tiempo real y publicar incidencias verificadas.
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                🛡️ Tolerancia cero a la desinformación: las cuentas con reportes falsos son suspendidas automáticamente.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo Electrónico *</Text>
              <TextInput
                style={styles.input}
                placeholder="tu_correo@ejemplo.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Contraseña *</Text>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.togglePassword}>
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#64748b"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              style={[styles.btnPrimary, isLoading && { opacity: 0.7 }]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#0f172a" />
              ) : (
                <Text style={styles.btnPrimaryText}>INICIAR SESIÓN</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>O</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.btnGuest}
              activeOpacity={0.7}
              onPress={() => router.replace('/(tabs)' as any)}
            >
              <Text style={styles.btnGuestText}>
                Explorar mapa en vivo sin cuenta →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerLink}>
            <Text style={styles.footerText}>¿Aún no tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
              <Text style={styles.footerHighlight}>Crear cuenta verificada</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  backButtonText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
  },
  badgeSecure: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  badgeText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1e293b',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  titleContainer: {
    marginBottom: 18,
  },
  brandTitle: {
    color: '#eab308',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 4,
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 6,
  },
  subTitle: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
  infoBox: {
    backgroundColor: 'rgba(234, 179, 8, 0.08)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.2)',
    marginBottom: 18,
  },
  infoText: {
    color: '#facc15',
    fontSize: 11.5,
    lineHeight: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  togglePassword: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#020617',
    borderWidth: 1.5,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 14,
  },
  btnPrimary: {
    backgroundColor: '#eab308',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#eab308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  btnPrimaryText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1e293b',
  },
  dividerText: {
    color: '#64748b',
    paddingHorizontal: 12,
    fontSize: 11,
    fontWeight: '700',
  },
  btnGuest: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  btnGuestText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
  },
  footerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  footerHighlight: {
    color: '#eab308',
    fontSize: 13,
    fontWeight: '700',
  },
});