import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  background: '#0B111E',
  surface: '#151E2E',
  text: '#FFFFFF',
  textMuted: '#A0AEC0',
  primary: '#FFB800',
  border: 'rgba(255, 255, 255, 0.08)'
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: UI_COLORS.primary,
        tabBarInactiveTintColor: UI_COLORS.textMuted,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: UI_COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: UI_COLORS.border,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 88 : 64,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Reportar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="salaries"
        options={{
          title: 'Salarios',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cash' : 'cash-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}