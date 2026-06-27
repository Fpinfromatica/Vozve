import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const UI_COLORS = {
  background: '#0B111E',
  surface: '#151E2E',
  text: '#FFFFFF',
  textMuted: '#A0AEC0',
  primary: '#FFB800',
  critical: '#FF3B30',
  border: 'rgba(255, 255, 255, 0.08)'
};

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Simulación del Mapa de Fondo */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={64} color="rgba(255, 255, 255, 0.03)" style={styles.mapIconBg} />
        
        {/* Marcador Simulado 1 (Crítico) */}
        <View style={[styles.markerWrapper, { top: height * 0.35, left: width * 0.4 }]}>
          <View style={[styles.markerPulse, { backgroundColor: UI_COLORS.critical }]} />
          <View style={[styles.markerDot, { backgroundColor: UI_COLORS.critical }]}>
            <Ionicons name="flash" size={12} color="#FFFFFF" />
          </View>
        </View>

        {/* Marcador Simulado 2 (Alerta) */}
        <View style={[styles.markerWrapper, { top: height * 0.5, left: width * 0.65 }]}>
          <View style={[styles.markerPulse, { backgroundColor: UI_COLORS.primary }]} />
          <View style={[styles.markerDot, { backgroundColor: UI_COLORS.primary }]}>
            <Ionicons name="alert" size={12} color="#000000" />
          </View>
        </View>
      </View>

      {/* Buscador Superior */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={UI_COLORS.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar incidentes o zonas..."
          placeholderTextColor={UI_COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={18} color={UI_COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Tarjeta Flotante Inferior (Reporte Activo Seleccionado) */}
      <View style={styles.floatingCard}>
        <View style={styles.cardHeader}>
          <View style={[styles.badge, { backgroundColor: 'rgba(255, 59, 48, 0.15)' }]}>
            <Text style={[styles.badgeText, { color: UI_COLORS.critical }]}>CRÍTICO</Text>
          </View>
          <Text style={styles.cardTime}>Hace 4 min</Text>
        </View>
        
        <Text style={styles.cardTitle}>Fluctuación eléctrica severa (Foco de Calor)</Text>
        <Text style={styles.cardLocation}>
          <Ionicons name="location-sharp" size={12} color={UI_COLORS.primary} /> Maracaibo - Sector Bella Vista
        </Text>

        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="arrow-up-circle-outline" size={18} color={UI_COLORS.primary} />
            <Text style={styles.actionText}>Verificar (142)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.centerMapButton}>
            <Ionicons name="navigate" size={18} color={UI_COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI_COLORS.background },
  mapPlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center' },
  mapIconBg: { transform: [{ scale: 4 }] },
  
  // Estilos de los Marcadores (Puntos calientes en el mapa)
  markerWrapper: { position: 'absolute', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 },
  markerDot: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignMiss: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  markerPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, opacity: 0.25, transform: [{ scale: 1 }] },

  // Buscador
  searchContainer: { position: 'absolute', top: 60, left: 16, right: 16, height: 50, backgroundColor: UI_COLORS.surface, borderRadius: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderWidth: 1, borderColor: UI_COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: UI_COLORS.text, fontSize: 14, height: '100%' },
  filterButton: { padding: 4 },

  // Tarjeta Flotante Inferior
  floatingCard: { position: 'absolute', bottom: 24, left: 16, right: 16, backgroundColor: UI_COLORS.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: UI_COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  cardTime: { color: UI_COLORS.textMuted, fontSize: 11 },
  cardTitle: { color: UI_COLORS.text, fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  cardLocation: { color: UI_COLORS.textMuted, fontSize: 12, marginBottom: 14, flexDirection: 'row', alignItems: 'center' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 184, 0, 0.08)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 184, 0, 0.2)' },
  actionText: { color: UI_COLORS.primary, fontSize: 12, fontWeight: '600', marginLeft: 6 },
  centerMapButton: { width: 36, height: 36, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: UI_COLORS.border }
});