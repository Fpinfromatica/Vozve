import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>App Header</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>App Footer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1A3A',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFD700',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A1A3A',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFD700',
  },
  footerText: {
    textAlign: 'center',
    color: '#0A1A3A',
  },
});

export default Layout;