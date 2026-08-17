import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, LogIn, UserPlus, Radio, Users } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#040711] justify-between p-6">
      <StatusBar barStyle="light-content" />

      {/* Indicador de servidores */}
      <View className="items-center mt-4">
        <View className="flex-row items-center bg-[#0c1424] px-4 py-1.5 rounded-full border border-slate-800">
          <View className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
          <Text className="text-slate-300 text-xs font-bold">Servidores Activos · Venezuela 24/7</Text>
        </View>
      </View>

      {/* Logo y descripción */}
      <View className="items-center my-8">
        <Text className="text-4xl font-black text-amber-400 tracking-wider">VozVe</Text>
        <Text className="text-slate-400 text-center text-xs mt-3 px-6 leading-relaxed">
          Red de monitoreo ciudadano y noticias en tiempo real. Cero censura, cero rastreo y tolerancia cero a la desinformación.
        </Text>

        {/* Tarjetas de características */}
        <View className="flex-row justify-between w-full mt-8 gap-2">
          <View className="flex-1 p-3 rounded-2xl bg-[#09101f] border border-slate-800 items-center">
            <Radio size={18} color="#fbbf24" />
            <Text className="text-white text-[11px] font-bold mt-1">Salas de Voz</Text>
          </View>
          <View className="flex-1 p-3 rounded-2xl bg-[#09101f] border border-slate-800 items-center">
            <Users size={18} color="#38bdf8" />
            <Text className="text-white text-[11px] font-bold mt-1">Comunidad</Text>
          </View>
          <View className="flex-1 p-3 rounded-2xl bg-[#09101f] border border-slate-800 items-center">
            <ShieldCheck size={18} color="#34d399" />
            <Text className="text-white text-[11px] font-bold mt-1">Cero Fake News</Text>
          </View>
        </View>
      </View>

      {/* Botones de acción */}
      <View className="space-y-3 mb-6">
        <TouchableOpacity
          onPress={() => router.push('/(auth)/login')}
          className="w-full py-4 rounded-2xl bg-amber-500 flex-row justify-center items-center shadow-lg shadow-amber-500/30"
          activeOpacity={0.8}
        >
          <LogIn size={18} color="#020617" strokeWidth={2.5} />
          <Text className="text-slate-950 font-black text-xs uppercase tracking-wider ml-2">
            INICIAR SESIÓN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/register')}
          className="w-full py-4 rounded-2xl bg-[#0a101f] border border-amber-500/40 flex-row justify-center items-center mt-3"
          activeOpacity={0.8}
        >
          <UserPlus size={18} color="#fbbf24" strokeWidth={2.5} />
          <Text className="text-white font-black text-xs uppercase tracking-wider ml-2">
            CREAR CUENTA
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}