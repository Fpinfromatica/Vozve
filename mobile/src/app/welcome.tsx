import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.webWrapper}>
      <View style={styles.phoneContainer}>
        {/* Usamos tu imagen de fondo que ya viene con todo el arte espectacular integrado */}
        <ImageBackground 
          source={require('../../assets/images/welcome_background.png')} 
          style={styles.background}
          resizeMode="stretch" // Cambiado a stretch para que se acople perfectamente al contenedor simulado
        >
          <View style={styles.contentContainer}>
            
            {/* 
              No renderizamos ni imágenes, ni títulos, ni textos nativos para evitar el doble montaje.
              Colocamos únicamente un área interactiva táctil EXACTAMENTE encima del botón "EMPEZAR" de la foto.
            */}
            <TouchableOpacity 
              style={styles.buttonHitArea} 
              activeOpacity={0.4} // Esto hace que al pulsar el botón de la foto se "atenúe" interactivamente, dando feedback real
              onPress={() => router.replace('/(tabs)')} 
            />

          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    width: Platform.OS === 'web' ? 420 : width,
    height: Platform.OS === 'web' ? 850 : height,
    maxHeight: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
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
    justifyContent: 'flex-end',
    // Ajustamos este padding para posicionar el click en el lugar milimétrico del botón de tu imagen
    paddingBottom: Platform.OS === 'web' ? 115 : 130, 
    paddingHorizontal: 20,
  },
  buttonHitArea: {
    // Estas dimensiones cubren perfectamente el botón dorado brillante de tu imagen
    width: Platform.OS === 'web' ? 260 : '65%',
    height: 54,
    borderRadius: 27,
    backgroundColor: 'transparent', // Se mantiene invisible para lucir tu diseño de alta calidad
    ...Platform.select({
      web: {
        cursor: 'pointer', // En entornos web forzará al navegador a cambiar el cursor a una mano interactiva
      },
    }),
  },
});