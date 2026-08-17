import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../../assets/images/welcome_background.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.overlay}>
        {/* Espaciador central para dejar ver el logo del fondo */}
        <View style={styles.spacer} />

        {/* Sección inferior con botones de acción */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>CREAR CUENTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 13, 20, 0.45)', // Sutil sombreado para legibilidad
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 50,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  spacer: {
    flex: 1,
  },
  footer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#e5b150',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#e5b150',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#0a0d14',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(229, 177, 80, 0.5)',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.5,
  },
});