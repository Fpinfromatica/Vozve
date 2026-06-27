import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SalariesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salaries Information</Text>
      <Text style={styles.subtitle}>Here you can find the salary details.</Text>
      {/* Additional components for listing salaries and filtering options can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default SalariesScreen;