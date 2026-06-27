import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UI_COLORS = {
  background: '#0B111E',
  surface: '#151E2E',
  text: '#FFFFFF',
  textMuted: '#A0AEC0',
  primary: '#FFB800',
  critical: '#FF3B30',
  border: 'rgba(255, 255, 255, 0.08)'
};

export default function ReportScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'elec', label: 'Electricidad', icon: 'flash' },
    { id: 'water', label: 'Agua / Luz', icon: 'water' },
    { id: 'vial', label: 'Tránsito / Vial', icon: 'car' },
    { id: 'alert', label: 'Seguridad / Alerta', icon: 'alert-circle' },
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Crear Reporte</Text>
          <Text style={styles.headerSubtitle}>Publica lo que sucede en tiempo real de forma segura.</Text>
        </View>

        {/* Selector de Categoría */}
        <Text style={styles.inputLabel}>Selecciona una Categoría</Text>
        <View style={styles.categoryGrid}>
          {categories.map((item) => {
            const isSelected = category === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryCard,
                  isSelected && { borderColor: UI_COLORS.primary, backgroundColor: 'rgba(255, 184, 0, 0.05)' }
                ]}
                onPress={() => setCategory(item.id)}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={20} 
                  color={isSelected ? UI_COLORS.primary : UI_COLORS.textMuted} 
                />
                <Text style={[styles.categoryText, isSelected && { color: UI_COLORS.primary, fontWeight: 'bold' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Input del Título */}
        <Text style={styles.inputLabel}>Título del Suceso</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Explosión de transformador en..."
          placeholderTextColor={UI_COLORS.textMuted}
          value={title}
          onChangeText={setTitle}
        />

        {/* Input de la Descripción */}
        <Text style={styles.inputLabel}>¿Qué está pasando? (Detalles)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe la situación con la mayor precisión posible para informar a la comunidad..."
          placeholderTextColor={UI_COLORS.textMuted}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        {/* Zona para Adjuntar Archivos Media */}
        <TouchableOpacity style={styles.uploadBox}>
          <Ionicons name="camera" size={26} color={UI_COLORS.primary} />
          <Text style={styles.uploadTitle}>Añadir Fotos o Videos</Text>
          <Text style={styles.uploadSubtitle}>Evidencias multimedia aumentan la veracidad (Máx. 30MB)</Text>
        </TouchableOpacity>

        {/* Botón de Publicar */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Publicar Reporte Anónimo</Text>
          <Ionicons name="paper-plane" size={16} color="#000000" />
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: UI_COLORS.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 40 },
  
  header: { marginBottom: 24 },
  headerTitle: { color: UI_COLORS.text, fontSize: 24, fontWeight: '900', letterSpacing: 0.5 },
  headerSubtitle: { color: UI_COLORS.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },

  inputLabel: { color: UI_COLORS.text, fontSize: 13, fontWeight: '600', marginBottom: 10, marginTop: 12, letterSpacing: 0.3 },
  
  // Grid de Categorías
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 },
  categoryCard: { width: '48%', backgroundColor: UI_COLORS.surface, borderWidth: 1, borderColor: UI_COLORS.border, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  categoryText: { color: UI_COLORS.textMuted, fontSize: 12, marginLeft: 8 },

  // Inputs standard
  input: { backgroundColor: UI_COLORS.surface, borderWidth: 1, borderColor: UI_COLORS.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: UI_COLORS.text, fontSize: 14, marginBottom: 16 },
  textArea: { height: 110, paddingTop: 12 },

  // Caja de carga multimedia
  uploadBox: { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(255, 184, 0, 0.3)', borderRadius: 14, padding: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 26 },
  uploadTitle: { color: UI_COLORS.text, fontSize: 14, fontWeight: '600', marginTop: 8 },
  uploadSubtitle: { color: UI_COLORS.textMuted, fontSize: 11, textAlign: 'center', marginTop: 4, paddingHorizontal: 10 },

  // Botón Submit
  submitButton: { backgroundColor: UI_COLORS.primary, height: 48, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, shadowColor: UI_COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 6 },
  submitButtonText: { color: '#000000', fontSize: 14, fontWeight: 'bold' }
});