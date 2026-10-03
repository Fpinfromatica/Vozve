import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#eab308',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      {/* 1. Inicio / Feed & Mapa */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🏠</Text>
          ),
        }}
      />

      {/* 2. Mapa Completo */}
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa Nacional',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🗺️</Text>
          ),
        }}
      />

      {/* 3. BOTÓN CENTRAL DESTACADO (ÚNICO Y ELEVADO) */}
      <Tabs.Screen
        name="report"
        options={{
          title: '',
          tabBarButton: (props) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.floatingHomeButtonContainer}
              onPress={() => router.push('/(tabs)/report' as any)}
            >
              <View style={styles.floatingHomeButton}>
                <Text style={styles.floatingIcon}>➕</Text>
              </View>
              <Text style={styles.floatingLabel}>Reportar</Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* 4. Salarios / Indicadores */}
      <Tabs.Screen
        name="salaries"
        options={{
          title: 'Economía',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>💵</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0a0f1d',
    borderTopColor: '#1e293b',
    borderTopWidth: 1.5,
    height: 68,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  floatingHomeButtonContainer: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHomeButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#eab308',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#020617',
    shadowColor: '#eab308',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  floatingIcon: {
    fontSize: 22,
    color: '#0a0f1d',
    fontWeight: 'bold',
  },
  floatingLabel: {
    color: '#eab308',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
  },
});