import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [activeTab, setActiveTab] = useState('noticias');

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado Principal */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>VozVe</Text>
        <Text style={styles.headerSubtitle}>La realidad de Venezuela en tiempo real</Text>
      </View>

      {/* Selector de Categorías (Botones) */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'noticias' && styles.tabActive]} 
            onPress={() => setActiveTab('noticias')}
          >
            <Text style={[styles.tabText, activeTab === 'noticias' && styles.tabTextActive]}>📢 Noticias/Vivos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'terremoto' && styles.tabActive]} 
            onPress={() => setActiveTab('terremoto')}
          >
            <Text style={[styles.tabText, activeTab === 'terremoto' && styles.tabTextActive]}>🚨 Sismo S.O.S</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'desaparecidos' && styles.tabActive]} 
            onPress={() => setActiveTab('desaparecidos')}
          >
            <Text style={[styles.tabText, activeTab === 'desaparecidos' && styles.tabTextActive]}>🔍 Desaparecidos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'servicios' && styles.tabActive]} 
            onPress={() => setActiveTab('servicios')}
          >
            <Text style={[styles.tabText, activeTab === 'servicios' && styles.tabTextActive]}>🏥 Hospitales y Sueldos</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Contenido Dinámico según la pestaña seleccionada */}
      <ScrollView style={styles.content}>
        {activeTab === 'noticias' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reportes Ciudadanos Sin Censura</Text>
            <TouchableOpacity style={styles.btnReportar}>
              <Text style={styles.btnReportarText}>🎥 Transmitir en Vivo / Reportar Noticia</Text>
            </TouchableOpacity>
            
            {/* Ejemplo de Noticia */}
            <View style={styles.card}>
              <Text style={styles.cardTag}>Caracas • Hace 5 min</Text>
              <Text style={styles.cardBody}>Vecinos reportan fallas totales de luz eléctrica en sectores de Altamira tras réplicas sísmicas.</Text>
            </View>
          </View>
        )}

        {activeTab === 'terremoto' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Crisis Terremotos (24 de Junio)</Text>
            <Text style={styles.infoText}>Epicentros en Yaracuy afectando gravemente al norte y centro del país. Zonas de desastre declaradas.</Text>
            
            <View style={[styles.card, { borderColor: '#d9534f', borderWidth: 1 }]}>
              <Text style={[styles.cardTag, { color: '#d9534f' }]}>ALERTA CRÍTICA • La Guaira</Text>
              <Text style={styles.cardBody}>Colapso de estructuras residenciales y daños severos en el Aeropuerto de Maiquetía. Se solicita ayuda humanitaria urgente.</Text>
            </View>
          </View>
        )}

        {activeTab === 'desaparecidos' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registro de Desaparecidos y Fallecidos</Text>
            <Text style={styles.infoText}>Sube información real de familiares no localizados para cruzar datos de rescate de forma independiente.</Text>
            
            <TouchableOpacity style={[styles.btnReportar, { backgroundColor: '#333' }]}>
              <Text style={styles.btnReportarText}>➕ Publicar Familiar / Reportar Caso</Text>
            </TouchableOpacity>

            <View style={styles.card}>
              <Text style={styles.cardTag}>BÚSQUEDA ACTIVA • Naguanagua, Carabobo</Text>
              <Text style={styles.cardBody}>Nombre: Carlos Eduardo Mendoza. Edad: 34 años. Visto por última vez en la zona del desplome de estructuras del 24 de junio.</Text>
            </View>
          </View>
        )}

        {activeTab === 'servicios' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hospitales, Canasta Básica y Salarios</Text>
            
            <View style={styles.card}>
              <Text style={styles.cardTag}>SITUACIÓN MÉDICA</Text>
              <Text style={styles.cardBody}>Hospital Dr. Molina Sierra y Adolfo Prince Lara en Puerto Cabello saturados de emergencias. Faltan insumos quirúrgicos básicos.</Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTag}>ECONOMÍA REAL</Text>
              <Text style={styles.cardBody}>Monitoreo del salario y costos de alimentos por estado frente a la devaluación actual en las calles.</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  header: { padding: 20, backgroundColor: '#004b93' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#e0e0e0', marginTop: 4 },
  tabsContainer: { backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 },
  tabsScroll: { paddingVertical: 12, paddingHorizontal: 10 },
  tabButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 10 },
  tabActive: { backgroundColor: '#004b93' },
  tabText: { fontWeight: '600', color: '#555' },
  tabTextActive: { color: '#fff' },
  content: { flex: 1, padding: 15 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  infoText: { fontSize: 14, color: '#666', marginBottom: 15, lineHeight: 20 },
  btnReportar: { backgroundColor: '#0088cc', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  btnReportarText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, elevation: 1 },
  cardTag: { fontSize: 11, fontWeight: 'bold', color: '#004b93', marginBottom: 5, textTransform: 'uppercase' },
  cardBody: { fontSize: 14, color: '#444', lineHeight: 20 }
});
