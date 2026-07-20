import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Platform, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleStart = () => {
    router.push('/(auth)/login');
  };

  // Detectamos si es Web y la pantalla es lo suficientemente grande como para simular el celular ancho
  const isWebDesktop = Platform.OS === 'web' && width > 480;

  return (
    <View style={[styles.outerContainer, isWebDesktop && styles.webOuterBackground]}>
      <View style={[styles.container, isWebDesktop && styles.webPhoneContainer]}>
        <ImageBackground 
          source={require('../../../../assets/images/welcome_background.png')} 
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.contentContainer}>
            
            {/* Empujamos el contenido hacia abajo para que coincida con el fondo */}
            <View style={styles.spacer} />

            {/* Botón interactivo EMPEZAR */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.goldButton} 
                onPress={handleStart}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>EMPEZAR</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webOuterBackground: {
    backgroundColor: '#0c0e12', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Hemos ensanchado el contenedor a 420px para que las estrellas de abajo respiren y se vean completas
  webPhoneContainer: {
    width: 420,            // Mayor anchura para que no recorte los laterales del fondo
    height: 840,           // Ajuste de altura para mantener la proporción perfecta
    maxHeight: '95%',      
    borderRadius: 36,      
    overflow: 'hidden',    
    borderWidth: 6,        
    borderColor: '#2A2E35', 
    boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.7)',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 45, // Ajustado sutilmente para que el botón flote justo debajo de la estrella dorada pequeña
  },
  spacer: {
    flex: 6, 
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldButton: {
    width: '85%',
    maxWidth: 280,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5A93B', 
    borderWidth: 1.5,
    borderColor: '#FFFDF0', 
    
    ...Platform.select({
      ios: {
        shadowColor: '#F3C34F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0px 0px 20px 4px rgba(243, 195, 79, 0.75)',
      }
    }),
  },
  buttonText: {
    color: '#1E1E1E', 
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
});