import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Contenido de los pasos del carrusel informativo
const ONBOARDING_DATA = [
  {
    title: "Hazte escuchar",
    subtitle: "Una nueva forma de conectar, compartir y debatir utilizando el poder de tu voz.",
  },
  {
    title: "Mensajes que inspiran",
    subtitle: "Crea salas de audio, publica notas de voz o escucha lo que el mundo tiene que decir.",
  },
  {
    title: "Un espacio seguro",
    subtitle: "Tú decides con quién compartes. Moderación activa para una comunidad libre de odio.",
  }
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_DATA.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Si llega al final, va a la app principal
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de estado superior */}
      <StatusBar barStyle="light-content" backgroundColor="#0A1A3A" />

      {/* Botón superior para Saltar el carrusel */}
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>

      {/* Área del Logo Central Brillante */}
      <View style={styles.logoContainer}>
        <Image 
          // LA RUTA CORREGIDA CON DOS NIVELES ATRÁS (../../)
          source={require('../../assets/logo-glow.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Nombre de la Marca */}
      <Text style={styles.brandTitle}>
        VOZ<Text style={styles.brandHighlight}>VE</Text>
      </Text>

      {/* Contenido dinámico del Carrusel */}
      <View style={styles.carouselContainer}>
        <Text style={styles.slideTitle}>{ONBOARDING_DATA[currentSlide].title}</Text>
        <Text style={styles.slideSubtitle}>{ONBOARDING_DATA[currentSlide].subtitle}</Text>
      </View>

      {/* Indicadores de posición (Puntitos del carrusel) */}
      <View style={styles.indicatorContainer}>
        {ONBOARDING_DATA.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.indicator, 
              index === currentSlide ? styles.indicatorActive : styles.indicatorInactive
            ]} 
          />
        ))}
      </View>

      {/* Botones de Acción Principales */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {currentSlide === ONBOARDING_DATA.length - 1 ? "Comenzar" : "Siguiente"}
          </Text>
        </TouchableOpacity>

        {currentSlide === ONBOARDING_DATA.length - 1 && (
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.secondaryButtonText}>Ya tengo una cuenta</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Eslogan decorativo al fondo */}
      <Text style={styles.footerText}>LA VERDAD ILUMINA, LA INFORMACIÓN NOS UNE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A3A', // Azul Oscuro Oficial de tu paleta
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  skipText: {
    color: '#FFFFFF',
    opacity: 0.6,
    fontSize: 14,
    fontWeight: '600',
  },
  logoContainer: {
    width: width * 0.55,
    height: width * 0.55,
    marginTop: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginTop: -20,
  },
  brandHighlight: {
    color: '#FFD700', // Amarillo Oficial de tu paleta
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    marginVertical: 20,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  slideSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.75,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  indicatorActive: {
    width: 20,
    backgroundColor: '#FFD700', // Amarillo activo
  },
  indicatorInactive: {
    width: 6,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#FFD700', // Botón principal Amarillo
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#0A1A3A',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.4,
    letterSpacing: 1,
    textAlign: 'center',
    position: 'absolute',
    bottom: 15,
  },
});