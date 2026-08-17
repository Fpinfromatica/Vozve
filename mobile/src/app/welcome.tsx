import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LogIn, UserPlus } from 'lucide-react-native';
import { VozVeEmblem } from '../shared/components/VozVeEmblem';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#03060f] justify-between items-center relative overflow-hidden">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Bandera Venezolana Superior Ondeante */}
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

      <View className="h-14" />

      {/* Centro: Emblema Dorado 3D */}
      <View className="items-center justify-center my-auto z-10">
        <View className="absolute w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <VozVeEmblem width={220} height={260} />

        <View className="items-center mt-2">
          <Text className="text-3xl font-black text-amber-400 tracking-widest">
            VOZVE
          </Text>
          <Text className="text-slate-400 text-[10px] font-black tracking-[0.25em] uppercase mt-0.5">
            LA VERDAD NOS UNE
          </Text>
        </View>
      </View>

      {/* Botones Directos */}
      <View className="w-full px-6 pb-8 z-10">
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