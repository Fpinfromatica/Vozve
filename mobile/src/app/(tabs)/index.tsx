import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  background: '#0B111E',
  surface: '#151E2E',
  text: '#FFFFFF',
  textMuted: '#A0AEC0',
  primary: '#FFB800',
  critical: '#FF3B30',
  success: '#34C759',
  border: 'rgba(255, 255, 255, 0.08)'
};

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('recientes');

  const mockReports = [
    {
      id: '1',
      tag: 'CRÍTICO',
      tagColor: UI_COLORS.critical,
      time: 'Hace 4 min',
      location: 'Maracaibo - Sector Bella Vista',
      title: 'Fluctuación eléctrica severa (Foco de Calor)',
      description: 'Reportan explosión de transformador de alta tensión. Zona comercial completamente a oscuras. Fluctuaciones se extienden a sectores aledaños.',
      votes: 142
    },
    {
      id: '2',
      tag: 'ALERTAS',
      tagColor: UI_COLORS.primary,
      time: 'Hace 18 min',
      location: 'Caracas - Autopista Prados del Este',
      title: 'Restricción de tránsito por control policial',
      description: 'Punto de control imprevisto ralentiza el tráfico hacia el centro. Usuarios reportan demoras de hasta 45 minutos.',
      votes: 89
    }
  ];

  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>VOZVE</Text>
          <Text style={styles.headerSubtitle}>La realidad sin filtros ni censura</Text>
        </View>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Ionicons name="flash" size={18} color={UI_COLORS.primary} />
          <Text style={styles.metricValue}>14</Text>
          <Text style={styles.metricLabel}>Focos Eléctricos</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="alert-circle" size={18} color={UI_COLORS.critical} />
          <Text style={styles.metricValue}>6</Text>
          <Text style={styles.metricLabel}>Eventos Críticos</Text>
        </View>
      </View>

      <View style={styles.feedContainer}>
        {mockReports.map((report) => (
          <View key={report.id} style={styles.reportCard}>
            <View style={styles.cardMeta}>
              <View style={[styles.tagBadge, { backgroundColor: report.tagColor + '15', borderColor: report.tagColor }]}>
                <Text style={[styles.tagText, { color: report.tagColor }]}>{report.tag}</Text>
              </View>
              <Text style={styles.metaText}>{report.time} • {report.location}</Text>
            </View>
            <Text style={styles.cardTitle}>{report.title}</Text>
            <Text style={styles.cardDescription}>{report.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI_COLORS.background, paddingHorizontal: 16, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerTitle: { color: UI_COLORS.text, fontSize: 24, fontWeight: '900', letterSpacing: 1.5 },
  headerSubtitle: { color: UI_COLORS.textMuted, fontSize: 12, marginTop: 2 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 59, 48, 0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: UI_COLORS.critical },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: UI_COLORS.critical, marginRight: 6 },
  liveText: { color: UI_COLORS.critical, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  metricCard: { flex: 1, backgroundColor: UI_COLORS.surface, borderRadius: 12, padding: 12, marginHorizontal: 4, borderWidth: 1, borderColor: UI_COLORS.border, alignItems: 'flex-start' },
  metricValue: { color: UI_COLORS.text, fontSize: 20, fontWeight: 'bold', marginVertical: 4 },
  metricLabel: { color: UI_COLORS.textMuted, fontSize: 10, fontWeight: '500' },
  feedContainer: { marginBottom: 40 },
  reportCard: { backgroundColor: UI_COLORS.surface, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: UI_COLORS.border },
  cardMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tagBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, marginRight: 8 },
  tagText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.3 },
  metaText: { color: UI_COLORS.textMuted, fontSize: 11, flex: 1 },
  cardTitle: { color: UI_COLORS.text, fontSize: 15, fontWeight: 'bold', lineHeight: 20, marginBottom: 6 },
  cardDescription: { color: '#D1D5DB', fontSize: 13, lineHeight: 18, marginBottom: 14 }
});