import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { 
  Menu, 
  Bell, 
  Search, 
  SlidersHorizontal, 
  DollarSign, 
  Building2, 
  ShieldAlert, 
  Fuel, 
  CloudSun, 
  Plus, 
  MessageSquare,
  Car,
  Users,
  Zap,
  Droplets
} from 'lucide-react-native';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState<'mapa' | 'noticias' | 'envivo' | 'alertas'>('mapa');

  return (
    <SafeAreaView className="flex-1 bg-[#04060c]">
      
      {/* 1. Header Oficial (Logo VozVe + Campana + Avatar) */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-slate-900">
        <TouchableOpacity className="p-1">
          <Menu size={22} color="#ffffff" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-lg font-black tracking-wider text-amber-400">
            V<Text className="text-white">OZ</Text><Text className="text-red-500">VE</Text>
          </Text>
          <Text className="text-[8px] font-bold text-slate-400 tracking-widest -mt-1">
            LA VERDAD NOS UNE
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="relative p-1">
            <Bell size={20} color="#cbd5e1" />
            <View className="absolute -top-1 -right-1 bg-red-600 px-1.5 py-0.2 rounded-full">
              <Text className="text-white text-[9px] font-black">12</Text>
            </View>
          </TouchableOpacity>
          <View className="w-8 h-8 rounded-full bg-slate-700 border border-amber-400/50 overflow-hidden items-center justify-center">
            <Text className="text-white font-bold text-xs">J</Text>
          </View>
        </View>
      </View>

      {/* 2. Selector de Pestañas Superiores */}
      <View className="flex-row border-b border-slate-800/80 px-2">
        {[
          { id: 'mapa', label: 'MAPA EN VIVO' },
          { id: 'noticias', label: 'NOTICIAS' },
          { id: 'envivo', label: 'EN VIVO' },
          { id: 'alertas', label: 'ALERTAS' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 items-center border-b-2 ${
              activeTab === tab.id ? 'border-amber-400' : 'border-transparent'
            }`}
          >
            <Text className={`text-[11px] font-black ${
              activeTab === tab.id ? 'text-amber-400' : 'text-slate-400'
            }`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 14 }} className="space-y-4">
        
        {/* Barra de Búsqueda */}
        <View className="flex-row gap-2">
          <View className="flex-1 flex-row items-center bg-[#0a1120] border border-slate-800 rounded-2xl px-3 py-2.5">
            <Search size={14} color="#64748b" />
            <TextInput
              placeholder="Buscar ciudad, suceso o transmisión..."
              placeholderTextColor="#64748b"
              className="text-white text-xs ml-2 flex-1"
            />
          </View>
          <TouchableOpacity className="bg-[#0a1120] border border-slate-800 px-3.5 rounded-2xl justify-center items-center">
            <SlidersHorizontal size={14} color="#fbbf24" />
          </TouchableOpacity>
        </View>

        {/* 3. Mapa de Incidencias Activas */}
        <View className="rounded-3xl bg-[#070d18] border border-slate-800 p-4 relative overflow-hidden">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xs font-black text-white">🔴 32 INCIDENCIAS ACTIVAS EN EL PAÍS</Text>
            <Text className="text-[10px] text-emerald-400 font-bold">● Actualizado hace 2 min</Text>
          </View>

          <View className="h-44 bg-[#050811] rounded-2xl border border-slate-900 p-3 relative justify-between">
            <View className="flex-row justify-between">
              <View className="bg-red-600/90 px-2 py-1 rounded-full items-center">
                <Text className="text-white font-black text-[10px]">8 Maracaibo</Text>
              </View>
              <View className="bg-red-600/90 px-2.5 py-1 rounded-full items-center">
                <Text className="text-white font-black text-[10px]">12 Caracas</Text>
              </View>
            </View>
            <View className="flex-row justify-around">
              <View className="bg-amber-500/90 px-2 py-1 rounded-full items-center">
                <Text className="text-slate-950 font-black text-[10px]">3 Barquisimeto</Text>
              </View>
              <View className="bg-red-600/90 px-2 py-1 rounded-full items-center">
                <Text className="text-white font-black text-[10px]">6 Valencia</Text>
              </View>
              <View className="bg-red-600/90 px-2 py-1 rounded-full items-center">
                <Text className="text-white font-black text-[10px]">5 Barcelona</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="bg-amber-500/90 px-2 py-1 rounded-full items-center">
                <Text className="text-slate-950 font-black text-[10px]">4 San Cristóbal</Text>
              </View>
              <View className="bg-emerald-500/90 px-2 py-1 rounded-full items-center">
                <Text className="text-slate-950 font-black text-[10px]">2 Pto Ordaz</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4. Carrusel: EN VIVO AHORA */}
        <View className="space-y-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-black text-white">EN VIVO AHORA</Text>
            <Text className="text-xs text-amber-400 font-bold">Ver todas</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
            {[
              { city: 'Caracas', area: 'Distrib. Altamira', views: '1.2K' },
              { city: 'Maracaibo', area: 'Av. Bella Vista', views: '856' },
              { city: 'Valencia', area: 'Av. Bolívar', views: '633' },
              { city: 'San Cristóbal', area: 'Táchira', views: '421' },
            ].map((stream, idx) => (
              <View key={idx} className="w-36 bg-[#09101f] border border-slate-800 rounded-2xl p-2.5 mr-3">
                <View className="flex-row justify-between items-center mb-6">
                  <View className="bg-red-600 px-1.5 py-0.5 rounded-md">
                    <Text className="text-white text-[8px] font-black">EN VIVO</Text>
                  </View>
                  <Text className="text-slate-400 text-[9px]">👁 {stream.views}</Text>
                </View>
                <Text className="text-white font-bold text-xs">{stream.city}</Text>
                <Text className="text-slate-400 text-[10px]">{stream.area}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 5. Cuadrícula de Accesos Rápidos */}
        <View className="flex-row justify-between gap-2">
          <View className="flex-1 bg-[#09101f] border border-slate-800 p-2.5 rounded-2xl items-center">
            <DollarSign size={16} color="#34d399" />
            <Text className="text-slate-200 text-[10px] font-bold mt-1">S. Mínimo</Text>
          </View>
          <View className="flex-1 bg-[#09101f] border border-slate-800 p-2.5 rounded-2xl items-center">
            <Building2 size={16} color="#a855f7" />
            <Text className="text-slate-200 text-[10px] font-bold mt-1">Política</Text>
          </View>
          <View className="flex-1 bg-[#09101f] border border-slate-800 p-2.5 rounded-2xl items-center">
            <ShieldAlert size={16} color="#38bdf8" />
            <Text className="text-slate-200 text-[10px] font-bold mt-1">Hospitales</Text>
          </View>
          <View className="flex-1 bg-[#09101f] border border-slate-800 p-2.5 rounded-2xl items-center">
            <DollarSign size={16} color="#fbbf24" />
            <Text className="text-slate-200 text-[10px] font-bold mt-1">BCV Dólar</Text>
          </View>
          <View className="flex-1 bg-[#09101f] border border-slate-800 p-2.5 rounded-2xl items-center">
            <Fuel size={16} color="#fb923c" />
            <Text className="text-slate-200 text-[10px] font-bold mt-1">Gasolina</Text>
          </View>
        </View>

        {/* 6. Widget Tasa del BCV y Salario Mínimo */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-[#09101f] border border-slate-800 p-3.5 rounded-3xl">
            <Text className="text-[10px] font-bold text-slate-400">TASA DEL BCV</Text>
            <Text className="text-amber-400 font-black text-sm mt-1">USD - Bs. 36,25</Text>
            <Text className="text-slate-300 font-bold text-xs mt-0.5">EUR - Bs. 39,10</Text>
          </View>

          <View className="flex-1 bg-[#09101f] border border-slate-800 p-3.5 rounded-3xl">
            <Text className="text-[10px] font-bold text-slate-400">SALARIO MÍNIMO OFICIAL</Text>
            <Text className="text-emerald-400 font-black text-base mt-1">Bs. 130,00</Text>
            <Text className="text-[9px] text-slate-500">Actualizado 2024</Text>
          </View>
        </View>

        {/* 7. Botón Rojo: REPORTAR SUCESO */}
        <TouchableOpacity className="w-full py-4 rounded-2xl bg-red-600 flex-row justify-center items-center shadow-xl shadow-red-600/40 my-2">
          <Plus size={18} color="#ffffff" strokeWidth={3} />
          <Text className="text-white font-black text-xs uppercase tracking-wider ml-2">
            REPORTAR SUCESO
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}