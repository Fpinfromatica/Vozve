import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#02040a" />

      {/* Contenedor Principal */}
      <View style={styles.container}>
        {/* Fondo con degradado y estrellas */}
        <View style={styles.backgroundGlow} />

        {/* 1. SECTOR SUPERIOR: Bandera de Venezuela ondeando */}
        <View style={styles.flagContainer}>
          <View style={styles.flagRibbon}>
            <View style={[styles.flagStripe, { backgroundColor: '#facc15' }]} />
            <View style={[styles.flagStripe, { backgroundColor: '#1d4ed8' }]}>
              {/* Estrellas decorativas en la franja azul */}
              <View style={styles.starsRow}>
                {['★', '★', '★', '★', '★', '★', '★', '★'].map((star, i) => (
                  <Text key={i} style={styles.starText}>
                    {star}
                  </Text>
                ))}
              </View>
            </View>
            <View style={[styles.flagStripe, { backgroundColor: '#dc2626' }]} />
          </View>
          <View style={styles.flagShadow} />
        </View>

        {/* 2. SECTOR CENTRAL: Emblema / Escudo Dorado en "V" con Estrella Radiante */}
        <View style={styles.emblemWrapper}>
          {/* Resplandor dorado de fondo */}
          <View style={styles.sunGlow} />

          {/* Estrella radiante de 8 puntas */}
          <View style={styles.starburst}>
            <View style={styles.starPointCenter} />
            <Text style={styles.starburstGlyph}>✦</Text>
          </View>

          {/* Escudo en V dorado tricolor */}
          <View style={styles.vShield}>
            <View style={styles.vWingLeft} />
            <View style={styles.vWingRight} />
            <View style={styles.vCenterCore}>
              {/* Franjas Tricolor dentro de la V */}
              <View style={styles.vCoreYellow} />
              <View style={styles.vCoreBlue}>
                <Text style={styles.vStars}>★ ★ ★ ★ ★ ★ ★ ★</Text>
              </View>
              <View style={styles.vCoreRed} />
            </View>
          </View>

          <Text style={styles.brandTitle}>VOZVE</Text>
          <Text style={styles.brandSubtitle}>VENEZUELA EN TIEMPO REAL</Text>
        </View>

        {/* 3. SECTOR INFERIOR: Botones de Iniciar Sesión y Registrarse */}
        <View style={styles.bottomSection}>
          {/* Botón Principal Dorado: Empezar / Registrarse */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.btnGold}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.btnGoldText}>REGISTRARSE</Text>
          </TouchableOpacity>

          {/* Botón Secundario: Iniciar Sesión */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.btnLogin}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.btnLoginText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          {/* Acceso directo sin cuenta */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnGuest}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.btnGuestText}>Explorar mapa en vivo sin cuenta →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030712',
  },
  container: {
    flex: 1,
    backgroundColor: '#020611',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGlow: {
    position: 'absolute',
    top: '30%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
    filter: 'blur(60px)',
  },

  /* Bandera ondeada superior */
  flagContainer: {
    width: '120%',
    height: 110,
    transform: [{ rotate: '-12deg' }, { translateY: -30 }],
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  flagRibbon: {
    flex: 1,
    flexDirection: 'column',
  },
  flagStripe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  flagShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  /* Emblema Dorado Central */
  emblemWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  sunGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(234, 179, 8, 0.22)',
  },
  starburst: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -25,
    zIndex: 2,
  },
  starPointCenter: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: 'rgba(250, 204, 21, 0.4)',
    borderRadius: 35,
    transform: [{ scale: 1.2 }],
  },
  starburstGlyph: {
    color: '#fef08a',
    fontSize: 90,
    fontWeight: '900',
    textShadowColor: 'rgba(234, 179, 8, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  /* V Shield */
  vShield: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 3,
  },
  vWingLeft: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 26,
    height: 120,
    backgroundColor: '#ca8a04',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 6,
    transform: [{ rotate: '-32deg' }],
    borderWidth: 2,
    borderColor: '#fef08a',
  },
  vWingRight: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 26,
    height: 120,
    backgroundColor: '#ca8a04',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 6,
    transform: [{ rotate: '32deg' }],
    borderWidth: 2,
    borderColor: '#fef08a',
  },
  vCenterCore: {
    width: 70,
    height: 85,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#eab308',
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  vCoreYellow: {
    flex: 1,
    backgroundColor: '#eab308',
  },
  vCoreBlue: {
    flex: 1,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vStars: {
    color: '#ffffff',
    fontSize: 6,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  vCoreRed: {
    flex: 1,
    backgroundColor: '#b91c1c',
  },

  brandTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 20,
  },
  brandSubtitle: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 4,
  },

  /* Botones Inferiores */
  bottomSection: {
    width: '100%',
    maxWidth: 380,
    gap: 12,
    paddingBottom: 15,
  },
  btnGold: {
    backgroundColor: '#eab308',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fef08a',
    shadowColor: '#eab308',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 8,
  },
  btnGoldText: {
    color: '#1a1300',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 2,
  },
  btnLogin: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#334155',
  },
  btnLoginText: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1.5,
  },
  btnGuest: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  btnGuestText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
  },
});