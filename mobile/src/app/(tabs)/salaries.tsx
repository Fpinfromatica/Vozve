import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  background: '#0B111E',
  surface: '#151E2E',
  text: '#FFFFFF',
  textMuted: '#A0AEC0',
  primary: '#FFB800',
  success: '#34C759',
  border: 'rgba(255, 255, 255, 0.08)'
};

export default function SalariesScreen() {
  const salaryData = [
    { id: '1', role: 'Desarrollador Frontend', sector: 'Tecnología', average: '$450 / mes', trend: '+12%', status: 'up' },
    { id: '2', role: 'Personal de Enfermería', sector: 'Salud', average: '$180 / mes', trend: '+4%', status: 'up' },
    { id: '3', role: 'Docente Universitario', sector: 'Educación', average: '$120 / mes', trend: '-2%', status: 'down' },
    { id: '4', role: 'Especialista en Marketing', sector: 'Comercial', average: '$310 / mes', trend: '0%', status: 'stable' },
  ];

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Índice de Salarios</Text>
        <Text style={styles.headerSubtitle}>Estadísticas y tabuladores reales reportados de forma anónima.</Text>
      </View>

      {/* Tarjeta de Resumen / Info */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={20} color={UI_COLORS.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Los datos mostrados reflejan el promedio neto estimado por la comunidad en las últimas semanas para combatir la especulación económica.
        </Text>
      </View>

      {/* Lista de Sectores/Salarios */}
      <Text style={styles.sectionTitle}>Promedios por sector</Text>
      
      {salaryData.map((item) => (
        <View key={item.id} style={styles.salaryCard}>
          <View style={styles.cardMain}>
            <Text style={styles.roleText}>{item.role}</Text>
            <Text style={styles.sectorText}>{item.sector}</Text>
          </View>
          
          <View style={styles.cardStats}>
            <Text style={styles.amountText}>{item.average}</Text>
            <View style={styles.trendWrapper}>
              <Ionicons 
                name={item.status === 'up' ? 'trending-up' : item.status === 'down' ? 'trending-down' : 'remove'} 
                size={14} 
                color={item.status === 'up' ? UI_COLORS.success : item.status === 'down' ? '#FF3B30' : UI_COLORS.textMuted} 
              />
              <Text style={[
                styles.trendText, 
                { color: item.status === 'up' ? UI_COLORS.success : item.status === 'down' ? '#FF3B30' : UI_COLORS.textMuted }
              ]}>
                {item.trend}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* Botón para aportar información */}
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="add" size={20} color="#000000" />
        <Text style={styles.actionButtonText}>Aportar Datos de Salario (Anónimo)</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI_COLORS.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 40 },
  
  header: { marginBottom: 24 },
  headerTitle: { color: UI_COLORS.text, fontSize: 24, fontWeight: '900', letterSpacing: 0.5 },
  headerSubtitle: { color: UI_COLORS.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },

  // Tarjeta informativa
  infoCard: { backgroundColor: 'rgba(255, 184, 0, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 184, 0, 0.15)', borderRadius: 12, padding: 14, flexDirection: 'row', marginBottom: 24, alignItems: 'flex-start' },
  infoIcon: { marginRight: 10, marginTop: 2 },
  infoText: { color: UI_COLORS.textMuted, fontSize: 12, flex: 1, lineHeight: 18 },

  sectionTitle: { color: UI_COLORS.text, fontSize: 14, fontWeight: '700', marginBottom: 14, letterSpacing: 0.3 },

  // Tarjetas de salarios
  salaryCard: { backgroundColor: UI_COLORS.surface, borderWidth: 1, borderColor: UI_COLORS.border, borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardMain: { flex: 1, marginRight: 10 },
  roleText: { color: UI_COLORS.text, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  sectorText: { color: UI_COLORS.textMuted, fontSize: 12 },
  
  cardStats: { alignItems: 'flex-end' },
  amountText: { color: UI_COLORS.primary, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  trendWrapper: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendText: { fontSize: 11, fontWeight: '600' },

  // Botón de acción
  actionButton: { backgroundColor: UI_COLORS.primary, height: 48, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 20, shadowColor: UI_COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 5 },
  actionButtonText: { color: '#000000', fontSize: 13, fontWeight: 'bold' }
});