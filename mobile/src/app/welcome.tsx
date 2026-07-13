import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.webWrapper}>
      <View style={styles.phoneContainer}>
        {/* Fondo completo de la pantalla - Asegurado */}
        <ImageBackground 
          source={require('../../assets/images/welcome_background.png')} 
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.contentContainer}>
            
            {/* Logo Central de VOZVE - Dimensiones corregidas para que no se corte */}
            <Image 
              source={require('../../assets/images/logo_v.png')} 
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Textos Informativos */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                VOZ<Text style={styles.titleGold}>VE</Text>
              </Text>
              <Text style={styles.slogan}>LA VERDAD ILUMINA, LA INFORMACIÓN NOS UNE</Text>
              {/* Golden Stars row */}
              <Text style={styles.stars}>★ ★ ★ ★ ★</Text>
            </View>

            {/* Botón EMPEZAR Estilizado - Color de texto corregido */}
            <TouchableOpacity 
              style={styles.button} 
              activeOpacity={0.8}
              onPress={() => router.replace('/(tabs)')} 
            >
              <Text style={styles.buttonText}>EMPEZAR</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Envuelve la app en la web para que parezca un teléfono centrado
  webWrapper: {
    flex: 1,
    backgroundColor: '#000000', // Fondo negro puro alrededor del teléfono simulado
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    // Dimensiones de un teléfono grande para simular la vista móvil en web
    width: Platform.OS === 'web' ? 420 : '100%',
    height: Platform.OS === 'web' ? 850 : '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    // Borde elegante simulando un teléfono móvil
    borderRadius: Platform.OS === 'web' ? 24 : 0,
    borderWidth: Platform.OS === 'web' ? 4 : 0,
    borderColor: '#1e293b',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  logo: {
    // Escala el logo para que nunca sea más ancho que el 70% de la pantalla (teléfono o simulación web)
    width: Platform.OS === 'web' ? 300 : width * 0.7, 
    height: Platform.OS === 'web' ? 300 : width * 0.7,
    marginTop: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    // Sutil sombra para mejor legibilidad en fondo oscuro
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleGold: {
    color: '#E5C158', 
  },
  slogan: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  stars: {
    color: '#E5C158',
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 4,
  },
  button: {
    width: Platform.OS === 'web' ? 300 : '75%',
    height: 52,
    backgroundColor: '#E5C158',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    marginBottom: Platform.OS === 'web' ? 10 : 20,
    // Efectos visuales de sombra (en iOS/Web) y elevación (en Android)
    shadowColor: '#E5C158',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8, 
  },
  buttonText: {
    color: '#0F172A', // Texto oscuro para contrastar con el fondo dorado
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});