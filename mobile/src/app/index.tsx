import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  TextInput
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function VozVeHomeScreen() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080d18" />
      
      {/* Header Superior */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <TouchableOpacity>
            <Feather name="menu" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.brandText}>
            VOZ<Text style={{ color: '#e5b150' }}>V</Text><Text style={{ color: '#ef4444' }}>E</Text>
          </Text>
          <MaterialIcons name="verified" size={18} color="#38bdf8" />
        </View>

        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>VENEZUELA EN TIEMPO REAL</Text>
        </View>

        <TouchableOpacity style={styles.bellButton}>
          <Feather name="bell" size={20} color="#ffffff" />
          <View style={styles.badge}><Text style={styles.badgeText}>12</Text></View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Tarjeta de Radar y Estadísticas */}
        <View style={styles.radarCard}>
          <View style={styles.radarHeader}>
            <Text style={styles.radarTitle}>EVENTOS ACTIVOS: <Text style={{ color: '#ffffff', fontSize: 20 }}>24</Text></Text>
            <View style={styles.chipsRow}>
              <Text style={[styles.chip, { backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171' }]}>🔴 CRÍTICOS: 4</Text>
              <Text style={[styles.chip, { backgroundColor: 'rgba(234,179,8,0.2)', color: '#fde047' }]}>🟡 IMPORTANTES: 18</Text>
            </View>
          </View>
          <Text style={styles.radarPrompt}>📍 Toca un punto en el mapa para ver reportes</Text>
        </View>

        {/* Sección En Vivo */}
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Feather name="radio" size={18} color="#ef4444" />
            <Text style={styles.sectionTitle}>EN VIVO AHORA · 248 TRANSMISIONES</Text>
          </View>
          <TouchableOpacity style={styles.verTodasBtn}>
            <Text style={styles.verTodasText}>VER TODAS</Text>
          </TouchableOpacity>
        </View>

        {/* Últimos Eventos */}
        <Text style={[styles.sectionTitle, { marginTop: 16, marginBottom: 8 }]}>ÚLTIMOS EVENTOS</Text>

        <View style={styles.eventCard}>
          <View style={styles.eventCardTop}>
            <Text style={styles.tagUltimaHora}>ÚLTIMA HORA</Text>
            <View style={styles.confidenceGauge}>
              <Text style={styles.confText}>CONFIANZA</Text>
              <Text style={styles.confNum}>92%</Text>
            </View>
          </View>
          <Text style={styles.eventTitle}>Corte eléctrico en varios sectores de Caracas</Text>
          <Text style={styles.eventLocation}>📍 Caracas, Dtto. Capital · Hace 3 min</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05070d' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#080d18',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b'
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandText: { fontSize: 20, fontWeight: '900', color: '#ffffff' },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' },
  liveText: { fontSize: 10, fontWeight: 'bold', color: '#cbd5e1' },
  bellButton: { padding: 4, position: 'relative' },
  badge: { position: 'absolute', top: -2, right: -4, backgroundColor: '#dc2626', borderRadius: 8, paddingHorizontal: 4 },
  badgeText: { color: '#ffffff', fontSize: 9, fontWeight: 'bold' },
  scrollContent: { padding: 16, paddingBottom: 90 },
  radarCard: { backgroundColor: '#09152e', borderWidth: 1, borderColor: '#06b6d4', borderRadius: 18, padding: 16, marginBottom: 16 },
  radarHeader: { marginBottom: 8 },
  radarTitle: { color: '#f87171', fontSize: 12, fontWeight: 'bold' },
  chipsRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  chip: { fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  radarPrompt: { color: '#67e8f9', fontSize: 11, marginTop: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
  sectionTitle: { color: '#ffffff', fontWeight: '900', fontSize: 13, textTransform: 'uppercase' },
  verTodasBtn: { backgroundColor: '#dc2626', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  verTodasText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
  eventCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#1e293b' },
  eventCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagUltimaHora: { backgroundColor: '#e5b150', color: '#000', fontWeight: '900', fontSize: 10, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  confidenceGauge: { backgroundColor: '#020617', borderColor: '#10b981', borderWidth: 1, padding: 4, borderRadius: 8, alignItems: 'center' },
  confText: { color: '#94a3b8', fontSize: 8, fontWeight: 'bold' },
  confNum: { color: '#34d399', fontSize: 12, fontWeight: '900' },
  eventTitle: { color: '#ffffff', fontSize: 15, fontWeight: 'bold', marginTop: 8 },
  eventLocation: { color: '#e5b150', fontSize: 11, marginTop: 4 }
});