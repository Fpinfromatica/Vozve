import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LogIn, UserPlus } from 'lucide-react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Polygon, Line, Circle, G } from 'react-native-svg';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#03060f] justify-between items-center relative overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 1. Bandera Venezolana Superior Ondeante (Diagonal) */}
      <View className="absolute top-0 left-0 right-0 h-48 overflow-hidden pointer-events-none opacity-95 z-0">
        <View className="absolute -top-10 -left-8 -right-8 h-36 -rotate-6 transform origin-top-left shadow-2xl">
          <View className="h-10 bg-[#eab308]" />
          <View className="h-10 bg-[#1d4ed8] flex-row justify-center items-center gap-2">
            <Text className="text-white text-[11px] font-black tracking-widest">
              ★ ★ ★ ★ ★ ★ ★ ★
            </Text>
          </View>
          <View className="h-10 bg-[#b91c1c]" />
        </View>
      </View>

      {/* Espaciador superior */}
      <View className="h-14" />

      {/* 2. Centro: Emblema Dorado 3D + Estrella Radiante */}
      <View className="items-center justify-center my-auto z-10">
        {/* Resplandor Dorado de fondo */}
        <View className="absolute w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        {/* Escudo SVG Completo */}
        <Svg width={220} height={270} viewBox="0 0 240 320">
          <Defs>
            <LinearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#FFFFFF" />
              <Stop offset="25%" stopColor="#FFF2A3" />
              <Stop offset="50%" stopColor="#EAB308" />
              <Stop offset="85%" stopColor="#A16207" />
              <Stop offset="100%" stopColor="#451A03" />
            </LinearGradient>

            <LinearGradient id="goldDark" x1="100%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FEF08A" />
              <Stop offset="40%" stopColor="#CA8A04" />
              <Stop offset="70%" stopColor="#854D0E" />
              <Stop offset="100%" stopColor="#2E1065" />
            </LinearGradient>

            <LinearGradient id="flagYellow" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FDE047" />
              <Stop offset="100%" stopColor="#EAB308" />
            </LinearGradient>

            <LinearGradient id="flagBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#1E40AF" />
              <Stop offset="100%" stopColor="#0F172A" />
            </LinearGradient>

            <LinearGradient id="flagRed" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#EF4444" />
              <Stop offset="100%" stopColor="#7F1D1D" />
            </LinearGradient>

            <RadialGradient id="starGlow" cx="50%" cy="50%" rx="50%" ry="50%">
              <Stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85" />
              <Stop offset="50%" stopColor="#F59E0B" stopOpacity="0.35" />
              <Stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Destellos Luminosos */}
          <G x={120} y={85}>
            <Circle cx={0} cy={0} r={70} fill="url(#starGlow)" />
            <Line x1={0} y1={-80} x2={0} y2={80} stroke="#FFFBEB" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
            <Line x1={-80} y1={0} x2={80} y2={0} stroke="#FFFBEB" strokeWidth={3} strokeLinecap="round" opacity={0.9} />
            <Line x1={-55} y1={-55} x2={55} y2={55} stroke="#FDE68A" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
            <Line x1={-55} y1={55} x2={55} y2={-55} stroke="#FDE68A" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
          </G>

          {/* Escudo 'V' */}
          <G>
            <Polygon points="30,85 120,290 120,240 68,105" fill="url(#goldDark)" />
            <Polygon points="30,85 68,105 120,240 120,255" fill="url(#goldLight)" opacity={0.9} />
            <Polygon points="210,85 120,290 120,240 172,105" fill="url(#goldLight)" />
            <Polygon points="210,85 172,105 120,240 120,255" fill="url(#goldDark)" opacity={0.9} />
          </G>

          {/* Tricolor Interior */}
          <G>
            <Polygon points="75,115 165,115 152,145 88,145" fill="url(#flagYellow)" />
            <Polygon points="88,145 152,145 138,195 102,195" fill="url(#flagBlue)" />
            <Polygon points="102,195 138,195 120,245" fill="url(#flagRed)" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const angle = -145 + i * (110 / 7);
              const rad = (angle * Math.PI) / 180;
              const cx = 120 + 26 * Math.cos(rad);
              const cy = 180 + 16 * Math.sin(rad);
              return <Circle key={i} cx={cx} cy={cy} r={1.8} fill="#FFFFFF" />;
            })}
          </G>

          {/* Estrella Dorada de 8 Puntas */}
          <G x={120} y={85}>
            <Polygon points="0,-48 0,0 12,-12" fill="url(#goldDark)" />
            <Polygon points="0,-48 0,0 -12,-12" fill="url(#goldLight)" />
            <Polygon points="0,48 0,0 -12,12" fill="url(#goldDark)" />
            <Polygon points="0,48 0,0 12,12" fill="url(#goldLight)" />
            <Polygon points="48,0 0,0 12,-12" fill="url(#goldLight)" />
            <Polygon points="48,0 0,0 12,12" fill="url(#goldDark)" />
            <Polygon points="-48,0 0,0 -12,12" fill="url(#goldLight)" />
            <Polygon points="-48,0 0,0 -12,-12" fill="url(#goldDark)" />
            <Polygon points="32,-32 0,0 0,-16" fill="url(#goldLight)" />
            <Polygon points="32,-32 0,0 16,0" fill="url(#goldDark)" />
            <Polygon points="32,32 0,0 16,0" fill="url(#goldLight)" />
            <Polygon points="32,32 0,0 0,16" fill="url(#goldDark)" />
            <Polygon points="-32,32 0,0 0,16" fill="url(#goldLight)" />
            <Polygon points="-32,32 0,0 -16,0" fill="url(#goldDark)" />
            <Polygon points="-32,-32 0,0 -16,0" fill="url(#goldLight)" />
            <Polygon points="-32,-32 0,0 0,-16" fill="url(#goldDark)" />
            <Polygon points="0,-8 8,0 0,8 -8,0" fill="#FFFFFF" />
          </G>
        </Svg>

        {/* Título Oficial */}
        <View className="items-center mt-2">
          <Text className="text-3xl font-black text-amber-400 tracking-widest">
            VOZVE
          </Text>
          <Text className="text-slate-400 text-[10px] font-black tracking-[0.25em] uppercase mt-0.5">
            LA VERDAD NOS UNE
          </Text>
        </View>
      </View>

      {/* 3. Botones Directos */}
      <View className="w-full px-6 pb-8 z-10">
        {/* Botón Dorado: INICIAR SESIÓN */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.85}
          className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 border border-amber-300 shadow-xl shadow-amber-500/40 flex-row justify-center items-center"
        >
          <LogIn size={18} color="#020617" strokeWidth={2.5} />
          <Text className="text-slate-950 font-black text-xs uppercase tracking-wider ml-2">
            INICIAR SESIÓN
          </Text>
        </TouchableOpacity>

        {/* Botón Oscuro: CREAR CUENTA */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.85}
          className="w-full py-4 rounded-full bg-[#070d1a] border border-amber-500/50 flex-row justify-center items-center mt-3 shadow-md"
        >
          <UserPlus size={18} color="#fbbf24" strokeWidth={2.5} />
          <Text className="text-amber-300 font-black text-xs uppercase tracking-wider ml-2">
            CREAR CUENTA
          </Text>
        </TouchableOpacity>

        <Text className="text-slate-500 text-[9px] text-center mt-3">
          © 2026 VozVe · Red de Monitoreo Ciudadano y Veeduría
        </Text>
      </View>
    </SafeAreaView>
  );
}