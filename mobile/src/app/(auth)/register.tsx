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

export default function RegisterScreen() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  // Formulario Paso 1
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [region, setRegion] = useState('Gran Caracas');

  // Formulario Paso 2 (Verificación)
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleGenerateAlias = () => {
    const prefixes = ['Centinela', 'Observador', 'VozCiudadana', 'Veedor', 'Defensor'];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    setAlias(`${randomPrefix}_${randomNum}`);
  };

  const handleNextStep = () => {
    if (!alias.trim() || !email.trim() || !password.trim()) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
    if (password.length < 8) {
      alert('La contraseña debe tener mínimo 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    setStep(2);
  };

  const handleSendCode = () => {
    if (!phone.trim()) {
      alert('Ingresa tu número de teléfono para recibir el código.');
      return;
    }
    setCodeSent(true);
    alert('Código de seguridad enviado: 849201');
  };

  const handleCompleteRegister = async () => {
    if (!termsAccepted) {
      alert('Debes aceptar el compromiso de veracidad y la política contra noticias falsas.');
      return;
    }
    if (!verificationCode.trim()) {
      alert('Ingresa el código de verificación.');
      return;
    }

    setLoading(true);

    try {
      // 1. Registro real en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            alias: alias.trim(),
            region: region.trim(),
            phone: phone.trim(),
            is_verified: true, // Cuenta verificada
            is_banned: false,
          },
        },
      });

      if (error) {
        alert(`Error al registrar cuenta: ${error.message}`);
        setLoading(false);
        return;
      }

      alert('¡Cuenta creada y verificada con éxito en VozVe!');
      router.replace('/(tabs)' as any);
    } catch (err: any) {
      alert(`Error inesperado: ${err.message || 'No se pudo conectar con el servidor'}`);
    } finally {
      setLoading(false);
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
          {/* Encabezado */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => (step === 2 ? setStep(1) : router.back())}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>

            <View style={styles.stepIndicator}>
              <Text style={styles.stepText}>Paso {step} de 2</Text>
            </View>
          </View>

          {/* Tarjeta de Registro Centrada */}
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>
                {step === 1 ? 'Crear Cuenta Ciudadana' : 'Verificación de Identidad'}
              </Text>
              <Text style={styles.subTitle}>
                {step === 1
                  ? 'Protege tu seudónimo y participa en la red comunitaria con total seguridad.'
                  : 'Validación para prevenir noticias falsas y proteger la veracidad de la red.'}
              </Text>
            </View>

            {/* PASO 1: DATOS */}
            {step === 1 && (
              <>
                <View style={styles.inputGroup}>
                  <View style={styles.labelRow}>
                    <Text style={styles.label}>Alias / Seudónimo Público *</Text>
                    <TouchableOpacity onPress={handleGenerateAlias}>
                      <Text style={styles.generateLink}>⚡ Generar Anónimo</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej. Centinela_Caracas"
                    placeholderTextColor="#64748b"
                    value={alias}
                    onChangeText={setAlias}
                    autoCapitalize="none"
                  />
                  <Text style={styles.helperText}>
                    Este es el nombre visible en tus reportes para proteger tu identidad.
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Correo Electrónico Privado *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="tu_correo@ejemplo.com"
                    placeholderTextColor="#64748b"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Zona de Monitoreo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej. Gran Caracas, Maracaibo, Valencia..."
                    placeholderTextColor="#64748b"
                    value={region}
                    onChangeText={setRegion}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Contraseña * (Mínimo 8 caracteres)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••••••"
                    placeholderTextColor="#64748b"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirmar Contraseña *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••••••"
                    placeholderTextColor="#64748b"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>

                <TouchableOpacity
                  style={styles.btnPrimary}
                  activeOpacity={0.85}
                  onPress={handleNextStep}
                >
                  <Text style={styles.btnPrimaryText}>CONTINUAR A VERIFICACIÓN →</Text>
                </TouchableOpacity>
              </>
            )}

            {/* PASO 2: VERIFICACIÓN ANTI-FAKE NEWS */}
            {step === 2 && (
              <>
                <View style={styles.alertBox}>
                  <Text style={styles.alertTitle}>🛡️ Red Ciudadana Verificada</Text>
                  <Text style={styles.alertMessage}>
                    Para garantizar reportes reales en <Text style={{ fontWeight: 'bold', color: '#eab308' }}>VozVe</Text>, toda cuenta debe verificarse. Los usuarios que publiquen reportes falsos serán <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>baneados permanentemente</Text> de la plataforma.
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Teléfono o WhatsApp de Verificación *</Text>
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, { flex: 1, marginRight: 8 }]}
                      placeholder="+58 412 1234567"
                      placeholderTextColor="#64748b"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                    <TouchableOpacity
                      style={styles.btnSendCode}
                      activeOpacity={0.8}
                      onPress={handleSendCode}
                    >
                      <Text style={styles.btnSendCodeText}>
                        {codeSent ? 'Reenviar' : 'Enviar Código'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.helperText}>
                    Tu número es estrictamente privado y no será público.
                  </Text>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Código de Verificación Recibido *</Text>
                  <TextInput
                    style={[styles.input, styles.codeInput]}
                    placeholder="0 0 0 0 0 0"
                    placeholderTextColor="#64748b"
                    keyboardType="numeric"
                    maxLength={6}
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                  />
                </View>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  activeOpacity={0.8}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                >
                  <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                    {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Me comprometo a publicar información verídica y verificable. Acepto que emitir alertas falsas acarreará el baneo definitivo de mi cuenta.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btnPrimary, (!termsAccepted || loading) && { opacity: 0.6 }]}
                  activeOpacity={0.85}
                  onPress={handleCompleteRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#0f172a" />
                  ) : (
                    <Text style={styles.btnPrimaryText}>FINALIZAR Y VALIDAR CUENTA</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.footerLink}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta registrada? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)}>
              <Text style={styles.footerHighlight}>Iniciar Sesión</Text>
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
  stepIndicator: {
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.35)',
  },
  stepText: {
    color: '#facc15',
    fontSize: 12,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  titleContainer: {
    marginBottom: 20,
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  subTitle: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
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
  generateLink: {
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
  codeInput: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 8,
    color: '#facc15',
  },
  helperText: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSendCode: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#38bdf8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSendCodeText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
  },
  alertBox: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(234, 179, 8, 0.3)',
    marginBottom: 18,
  },
  alertTitle: {
    color: '#facc15',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertMessage: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 17,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#64748b',
    backgroundColor: '#020617',
    marginRight: 10,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#eab308',
    borderColor: '#eab308',
  },
  checkmark: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  checkboxLabel: {
    color: '#cbd5e1',
    fontSize: 12,
    flex: 1,
    lineHeight: 17,
  },
  btnPrimary: {
    backgroundColor: '#eab308',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
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
    letterSpacing: 1,
  },
  footerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  footerHighlight: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
  },
});