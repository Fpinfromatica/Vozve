import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Conexión Exitosa!</Text>
      <Text style={styles.subtext}>La pantalla de Login está lista para el formulario.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0e12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#E5A93B',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtext: {
    color: '#ffffff',
    fontSize: 14,
  },
});