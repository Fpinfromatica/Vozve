import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 
        AQUÍ SE CARGA TU IMAGEN TAL CUAL:
        Utiliza el archivo welcome_background.png que tienes en assets/images
        sin dibujar figuras ni franjas artificiales por código.
      */}
      <ImageBackground
        source={require('../../assets/images/welcome_background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Espacio superior libre para que la bandera de satén y el emblema dorado 3D se vean limpios */}
          <View style={styles.topSpacer} />

          {/* Sector Inferior: Títulos y Botones de Acción */}
          <View style={styles.bottomSection}>
            <Text style={styles.brandTitle}>VOZVE</Text>
            <Text style={styles.brandSubtitle}>VENEZUELA EN TIEMPO REAL</Text>

            {/* Botón Principal Dorado: Registrarse */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.btnGold}
              onPress={() => router.push('/(auth)/register' as any)}
            >
              <Text style={styles.btnGoldText}>REGISTRARSE</Text>
            </TouchableOpacity>

            {/* Botón Secundario: Iniciar Sesión */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.btnLogin}
              onPress={() => router.push('/(auth)/login' as any)}
            >
              <Text style={styles.btnLoginText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>

            {/* Acceso directo sin cuenta */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnGuest}
              onPress={() => router.replace('/(tabs)' as any)}
            >
              <Text style={styles.btnGuestText}>
                Explorar mapa en vivo sin cuenta →
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02040a',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topSpacer: {
    flex: 1,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 5,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 10,
  },
  brandSubtitle: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.5,
    marginBottom: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  btnGold: {
    backgroundColor: '#eab308',
    width: '100%',
    maxWidth: 350,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#eab308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 8,
  },
  btnGoldText: {
    color: '#0f172a',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 2,
  },
  btnLogin: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    width: '100%',
    maxWidth: 350,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  btnLoginText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  btnGuest: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnGuestText: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});