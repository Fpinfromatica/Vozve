import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Map() {
  return (
    <View style={styles.container}>
      {/* Placeholder: map.tsx */}
      <Text style={styles.text}>Mapa de Incidencias (VOZVE)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
  },
});