import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck, Mail, Lock, User, FileBadge, Camera, BadgeAlert, ArrowRight } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Paso 1
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Paso 2: Cédula & Anti-IA
  const [documentNumber, setDocumentNumber] = useState('');
  const [docUploaded, setDocUploaded] = useState(false);
  const [agreeTruth, setAgreeTruth] = useState(false);
  const [agreeAntiAi, setAgreeAntiAi] = useState(false);
  const [agreeBanWarning, setAgreeBanWarning] = useState(false);

  const handleNextStep = () => {
    if (!alias || !email || !password) {
      Alert.alert('Campos incompletos', 'Por favor ingresa alias, correo y contraseña.');
      return;
    }
    setStep(2);
  };

  const handleCompleteRegistration = () => {
    if (!documentNumber) {
      Alert.alert('Cédula requerida', 'Debes ingresar tu número de cédula oficial.');
      return;
    }
    if (!docUploaded) {
      Alert.alert('Foto requerida', 'Debes escanear o cargar la foto de tu documento.');
      return;
    }
    if (!agreeTruth || !agreeAntiAi || !agreeBanWarning) {
      Alert.alert('Pacto de Veracidad', 'Debes aceptar los acuerdos contra Fake News e Inteligencia Artificial.');
      return;
    }

    Alert.alert(
      '¡Bóveda Verificada Creada!',
      'Tu cédula ha sido auditada. Recuerda que publicar noticias falsas o con IA resultará en el bloqueo permanente de tu cuenta.',
      [{ text: 'Entrar a VozVe', onPress: () => router.replace('/(tabs)') }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#04060c]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* Volver */}
        <TouchableOpacity 
          onPress={() => step === 2 ? setStep(1) : router.back()}
          className="flex-row items-center py-2"
        >
          <ArrowLeft size={16} color="#94a3b8" />
          <Text className="text-slate-400 text-xs font-bold ml-1.5">
            {step === 2 ? 'Volver a Paso 1' : 'Volver'}
          </Text>
        </TouchableOpacity>

        {/* Título */}
        <Text className="text-xl font-black text-white mt-3">
          {step === 1 ? 'Crear Bóveda Ciudadana' : 'Verificación de Cédula Oficial'}
        </Text>
        <Text className="text-xs text-slate-400 mt-1">
          {step === 1 
            ? 'Paso 1: Protege tu seudónimo y credenciales cifradas' 
            : 'Paso 2: Registro obligatorio de Cédula contra Fake News e IA'}
        </Text>

        {/* PASO 1: DATOS */}
        {step === 1 && (
          <View className="mt-6 space-y-4">
            <View className="p-3.5 rounded-2xl bg-[#0d1424] border border-amber-500/30 flex-row items-start">
              <ShieldCheck size={16} color="#fbbf24" style={{ marginTop: 2 }} />
              <Text className="text-slate-300 text-xs ml-2 flex-1">
                <Text className="font-bold text-amber-400">Cero Rastreo de IP:</Text> Puedes usar un alias público anónimo para proteger tu identidad física.
              </Text>
            </View>

            <View className="mt-3">
              <Text className="text-xs font-bold text-slate-200 mb-1">Alias de Seguridad (Público)</Text>
              <TextInput
                value={alias}
                onChangeText={setAlias}
                placeholder="Ej. Centinela_Caracas"
                placeholderTextColor="#64748b"
                className="bg-[#0a1120] border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs"
              />
            </View>

            <View className="mt-3">
              <Text className="text-xs font-bold text-slate-200 mb-1">Correo Electrónico Privado</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="tu_correo@privado.com"
                placeholderTextColor="#64748b"
                className="bg-[#0a1120] border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs"
              />
            </View>

            <View className="mt-3">
              <Text className="text-xs font-bold text-slate-200 mb-1">Clave Maestra de Cifrado</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor="#64748b"
                className="bg-[#0a1120] border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs"
              />
            </View>

            <TouchableOpacity
              onPress={handleNextStep}
              className="w-full mt-6 py-4 rounded-2xl bg-amber-500 flex-row justify-center items-center"
            >
              <Text className="text-slate-950 font-black text-xs uppercase tracking-wider mr-2">
                CONTINUAR A VERIFICAR CÉDULA
              </Text>
              <ArrowRight size={16} color="#020617" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}

        {/* PASO 2: CÉDULA & PACTO ANTI-IA */}
        {step === 2 && (
          <View className="mt-6 space-y-4">
            {/* Aviso de Tolerancia Cero */}
            <View className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/50">
              <View className="flex-row items-center mb-1">
                <BadgeAlert size={16} color="#f87171" />
                <Text className="text-red-400 font-bold text-xs uppercase ml-1.5">
                  Tolerancia Cero a Fake News e IA
                </Text>
              </View>
              <Text className="text-slate-300 text-xs leading-relaxed">
                Si publicas noticias falsas o montajes generados por Inteligencia Artificial, tu cuenta y tu cédula quedarán <Text className="font-bold text-red-300">bloqueadas permanentemente</Text>.
              </Text>
            </View>

            {/* Número de Cédula */}
            <View className="mt-3">
              <Text className="text-xs font-bold text-slate-200 mb-1">Número de Cédula Venezolana (V-)</Text>
              <TextInput
                value={documentNumber}
                onChangeText={setDocumentNumber}
                placeholder="V-24.891.203"
                placeholderTextColor="#64748b"
                className="bg-[#0a1120] border border-slate-700 rounded-2xl px-4 py-3 text-white text-xs"
              />
            </View>

            {/* Carga de Foto */}
            <View className="mt-3">
              <Text className="text-xs font-bold text-slate-200 mb-1">Foto del Documento</Text>
              <TouchableOpacity
                onPress={() => setDocUploaded(true)}
                className={`p-4 rounded-2xl border border-dashed items-center justify-center ${
                  docUploaded ? 'bg-emerald-950/30 border-emerald-500' : 'bg-[#0a1120] border-slate-700'
                }`}
              >
                <Camera size={22} color={docUploaded ? '#34d399' : '#fbbf24'} />
                <Text className={`text-xs font-bold mt-1.5 ${docUploaded ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {docUploaded ? '✓ Documento Escaneado & Cifrado' : 'Tomar Foto de la Cédula'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Checkboxes de Acuerdos */}
            <View className="mt-4 space-y-3">
              <TouchableOpacity onPress={() => setAgreeTruth(!agreeTruth)} className="flex-row items-start">
                <Text className="text-amber-400 font-bold mr-2">{agreeTruth ? '☑' : '☐'}</Text>
                <Text className="text-slate-300 text-xs flex-1">
                  <Text className="font-bold text-white">Pacto de Veracidad:</Text> Solo publicaré hechos reales y presenciados.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setAgreeAntiAi(!agreeAntiAi)} className="flex-row items-start mt-2">
                <Text className="text-amber-400 font-bold mr-2">{agreeAntiAi ? '☑' : '☐'}</Text>
                <Text className="text-slate-300 text-xs flex-1">
                  <Text className="font-bold text-white">Prohibición de IA Falsa:</Text> No usaré imágenes ni audios generados por IA que simulen hechos falsos.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setAgreeBanWarning(!agreeBanWarning)} className="flex-row items-start mt-2">
                <Text className="text-red-400 font-bold mr-2">{agreeBanWarning ? '☑' : '☐'}</Text>
                <Text className="text-red-300 text-xs flex-1 font-medium">
                  <Text className="font-bold text-red-200">Consecuencia de Bloqueo:</Text> Acepto que una mentira causará la expulsión y bloqueo irreversible de mi cuenta.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botón Final */}
            <TouchableOpacity
              onPress={handleCompleteRegistration}
              className="w-full mt-6 py-4 rounded-2xl bg-amber-500 flex-row justify-center items-center shadow-lg shadow-amber-500/30"
            >
              <ShieldCheck size={18} color="#020617" strokeWidth={2.5} />
              <Text className="text-slate-950 font-black text-xs uppercase tracking-wider ml-2">
                ACTIVAR BÓVEDA VERIFICADA
              </Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}