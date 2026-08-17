import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  ScrollView,
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      const msg = 'Por favor completa todos los campos';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      return;
    }

    if (password.length < 6) {
      const msg = 'La contraseña debe tener al menos 6 caracteres';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Error', msg);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      const successMsg = '¡Cuenta creada con éxito! Ya puedes iniciar sesión.';
      Platform.OS === 'web' ? window.alert(successMsg) : Alert.alert('Éxito', successMsg);
      router.replace('/(auth)/login');
    } catch (err: any) {
      const errorMsg = err.message || 'No se pudo crear la cuenta';
      Platform.OS === 'web' ? window.alert(errorMsg) : Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer} 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <Text style={styles.title}>Crear Cuenta en VozVe</Text>
        <Text style={styles.subtitle}>Únete a la plataforma comunitaria</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña (mínimo 6 caracteres)"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#0a0d14" />
          ) : (
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/(auth)/login')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0d14',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#161b26',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2a324b',
  },
  button: {
    backgroundColor: '#e5b150',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: '#0a0d14',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    padding: 8,
  },
  linkText: {
    color: '#e5b150',
    textAlign: 'center',
    fontSize: 14,
  },
});