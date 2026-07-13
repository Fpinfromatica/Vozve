import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Usamos el require con la ruta que ya confirmamos que existe */}
      <ImageBackground 
        source={require('../../assets/images/welcome_background.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {/* Si quieres renderizar el logo encima, usas este; si tu fondo ya lo trae todo, puedes comentar esta línea */}
          {/* <Image source={require('../../assets/images/logo_v.png')} style={styles.logoV} resizeMode="contain" /> */}

          <TouchableOpacity 
            style={styles.startButton} 
            onPress={() => router.replace('/')}
          >
            <Text style={styles.startButtonText}>EMPEZAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000B29' },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 60 },
  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  startButtonText: { color: '#000B29', fontSize: 18, fontWeight: '700' },
});