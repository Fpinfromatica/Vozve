import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../core/supabase';

// Categorías de servicios públicos en Venezuela
const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: '🇻🇪' },
  { id: 'luz', label: 'Electricidad', icon: '⚡' },
  { id: 'agua', label: 'Agua Potable', icon: '💧' },
  { id: 'gasolina', label: 'Combustible', icon: '⛽' },
  { id: 'internet', label: 'Telecom / CANTV', icon: '🌐' },
  { id: 'vialidad', label: 'Vialidad', icon: '🚗' },
];

export default function FeedScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [profile, setProfile] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Lista de reportes iniciales en tiempo real
  const [reports, setReports] = useState([
    {
      id: '1',
      category: 'luz',
      categoryLabel: 'Electricidad',
      categoryColor: '#facc15',
      title: 'Falla eléctrica en Chacao y Bello Monte',
      description: 'Sin servicio eléctrico desde hace 45 minutos. Comercios funcionando con plantas.',
      location: 'Chacao, Gran Caracas',
      time: 'Hace 15 min',
      author: 'Centinela_342',
      isVerified: true,
      confirmations: 38,
      confirmedByUser: false,
    },
    {
      id: '2',
      category: 'agua',
      categoryLabel: 'Agua Potable',
      categoryColor: '#38bdf8',
      title: 'Bombeo suspendido en El Cafetal',
      description: 'Llegando agua con baja presión y color turbio en Santa Paula y Boulevard.',
      location: 'Baruta, Miranda',
      time: 'Hace 40 min',
      author: 'Veedor_Caracas',
      isVerified: true,
      confirmations: 64,
      confirmedByUser: false,
    },
    {
      id: '3',
      category: 'gasolina',
      categoryLabel: 'Combustible',
      categoryColor: '#f97316',
      title: 'Cola de 2 horas en E/S Las Mercedes',
      description: 'Surtidor internacional activo, cola fluida avanzando hacia la Principal.',
      location: 'Las Mercedes, Caracas',
      time: 'Hace 1 hora',
      author: 'Observador_Ve',
      isVerified: true,
      confirmations: 21,
      confirmedByUser: false,
    },
  ]);

  // Cargar usuario autenticado
  const loadUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        setProfile(data || { alias: user.email?.split('@')[0], is_verified: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUser();
    setTimeout(() => setRefreshing(false), 600);
  };

  // Botón para confirmar que a mí también me ocurre la falla
  const toggleConfirm = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const newStatus = !r.confirmedByUser;
          return {
            ...r,
            confirmedByUser: newStatus,
            confirmations: newStatus ? r.confirmations + 1 : r.confirmations - 1,
          };
        }
        return r;
      })
    );
  };

  const filteredReports =
    selectedCategory === 'all'
      ? reports
      : reports.filter((r) => r.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />

      {/* 1. Barra Superior con Logo y Perfil */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.logoTitle}>VOZVE</Text>
          <Text style={styles.logoSubtitle}>Gran Caracas • Venezuela en vivo</Text>
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.verifiedTag}>
            <Text style={styles.verifiedTagText}>
              {profile?.is_verified ? '✓ Verificado' : '🛡️ Ciudadano'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#eab308" />}
      >
        {/* 2. Banner informativo del usuario */}
        <View style={styles.userBanner}>
          <View style={styles.userBannerLeft}>
            <Text style={styles.userGreeting}>
              Hola, <Text style={styles.userAlias}>@{profile?.alias || 'Centinela'}</Text>
            </Text>
            <Text style={styles.userSub}>
              Reputación: <Text style={{ color: '#a3e635', fontWeight: 'bold' }}>100 pts</Text> • Red anti-noticias falsas activa
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnCreateMini}
            activeOpacity={0.8}
            onPress={() => alert('Función: Aquí se abrirá el formulario para reportar una falla')}
          >
            <Text style={styles.btnCreateMiniText}>+ Reportar</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Filtros Horizontales de Servicios */}
        <Text style={styles.filterTitle}>SERVICIOS PÚBLICOS & FALLAS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[styles.filterChip, isSelected && styles.filterChipActive]}
                activeOpacity={0.8}
              >
                <Text style={styles.filterIcon}>{cat.icon}</Text>
                <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 4. Lista de Reportes Comunitarios */}
        <View style={styles.reportsHeader}>
          <Text style={styles.reportsTitle}>INCIDENCIAS EN CURSO ({filteredReports.length})</Text>
          <Text style={styles.liveIndicator}>🟢 Actualizado</Text>
        </View>

        {filteredReports.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Cabecera de la tarjeta */}
            <View style={styles.cardHeader}>
              <View style={[styles.categoryBadge, { borderColor: item.categoryColor }]}>
                <Text style={[styles.categoryText, { color: item.categoryColor }]}>
                  {item.categoryLabel}
                </Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            {/* Contenido */}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            <Text style={styles.cardLocation}>📍 {item.location}</Text>

            {/* Pie de tarjeta */}
            <View style={styles.cardFooter}>
              <View style={styles.authorBox}>
                <Text style={styles.authorText}>Por @{item.author}</Text>
                {item.isVerified && <Text style={styles.verifiedCheck}> ✓</Text>}
              </View>

              {/* Botón de Confirmación comunitaria */}
              <TouchableOpacity
                style={[styles.btnConfirm, item.confirmedByUser && styles.btnConfirmed]}
                activeOpacity={0.8}
                onPress={() => toggleConfirm(item.id)}
              >
                <Text style={[styles.btnConfirmText, item.confirmedByUser && styles.btnConfirmedText]}>
                  {item.confirmedByUser ? '✓ Confirmado por ti' : '👍 A mí también me pasa'} ({item.confirmations})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#0b1329',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  logoTitle: {
    color: '#eab308',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },
  logoSubtitle: {
    color: '#94a3b8',
    fontSize: 11,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  verifiedTagText: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '800',
  },
  scroll: {
    padding: 16,
    maxWidth: 620,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 40,
  },
  userBanner: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userBannerLeft: {
    flex: 1,
  },
  userGreeting: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  userAlias: {
    color: '#eab308',
    fontWeight: '900',
  },
  userSub: {
    color: '#94a3b8',
    fontSize: 11,
  },
  btnCreateMini: {
    backgroundColor: '#eab308',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginLeft: 10,
  },
  btnCreateMiniText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '900',
  },
  filterTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  filtersScroll: {
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    borderColor: '#eab308',
  },
  filterIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  filterText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#facc15',
  },
  reportsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportsTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveIndicator: {
    color: '#a3e635',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
  },
  timeText: {
    color: '#64748b',
    fontSize: 11,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardDesc: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardLocation: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingTop: 12,
  },
  authorBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
  },
  verifiedCheck: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  btnConfirm: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  btnConfirmed: {
    backgroundColor: 'rgba(163, 230, 53, 0.15)',
    borderColor: '#a3e635',
  },
  btnConfirmText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
  },
  btnConfirmedText: {
    color: '#a3e635',
  },
});