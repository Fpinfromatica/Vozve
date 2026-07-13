import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Salaries() {
  return (
    <View style={styles.container}>
      {/* Placeholder: salaries.tsx */}
      <Text style={styles.text}>Índice de Salarios</Text>
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