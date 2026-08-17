import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Shuffle, 
  ArrowRight,
  FileBadge,
  Camera,
  BadgeAlert
} from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Paso 1
  const [alias, setAlias] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedZone, setSelectedZone] = useState('Gran Caracas (Dtto. Capital & Miranda)');

  // Paso 2: Cédula & Anti-IA
  const [documentNumber, setDocumentNumber] = useState('');
  const [docUploaded, setDocUploaded] = useState(false);
  const [agreeTruth, setAgreeTruth] = useState(false);
  const [agreeAntiAi, setAgreeAntiAi] = useState(false);
  const [agreeBanWarning, setAgreeBanWarning] = useState(false);

  const generateAnonymousAlias = () => {
    const prefixes = ['Centinela_Caracas', 'VozLibre_VE', 'Centinela_Zulia', 'Faro_Andino', 'Guayana_Guard'];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const chosen = prefixes[Math.floor(Math.random() * prefixes.length)];
    setAlias(`${chosen}_${randomNum}`);
    setUsername(`@centinela_${randomNum}`);
  };

  const handleNextStep = () => {
    if (!alias || !email || !password || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Por favor completa todos tus datos de acceso.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error en clave', 'Las contraseñas maestras no coinciden.');
      return;
    }
    setStep(2);
  };

  const handleFinishRegister = () => {
    if (!documentNumber) {
      Alert.alert('Cédula requerida', 'Debes ingresar tu número de cédula oficial.');
      return;
    }
    if (!docUploaded) {
      Alert.alert('Escaneo requerido', 'Debes subir o escanear una foto de tu documento.');
      return;
    }
    if (!agreeTruth || !agreeAntiAi || !agreeBanWarning) {
      Alert.alert('Pacto Obligatorio', 'Debes aceptar los términos de veracidad y tolerancia cero a Fake News e IA.');
      return;
    }

    Alert.alert(
      '¡Bóveda Verificada Creada!',
      'Tu cédula y seudónimo han sido enlazados de forma segura.',
      [{ text: 'ENTRAR AL SISTEMA', onPress: () => router.replace('/(tabs)') }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#04060c]">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* Encabezado */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity 
            onPress={() => step === 2 ? setStep(1) : router.back()}
            className="flex-row items-center p-1"
          >
            <ArrowLeft size={16} color="#94a3b8" />
            <Text className="text-slate-400 text-xs font-bold ml-1">
              {step === 2 ? 'Paso 1' : 'Volver'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            <ShieldCheck size={12} color="#34d399" />
            <Text className="text-emerald-400 text-[10px] font-bold ml-1">
              VERIFICACIÓN DE IDENTIDAD & ANTI-IA
            </Text>
          </View>
        </View>

        {/* Títulos */}
        <View className="items-center my-3">
          <Text className="text-2xl font-black text-white">
            {step === 1 ? 'Crear Bóveda Ciudadana' : 'Validación de Cédula Oficial'}
          </Text>
          <Text className="text-slate-400 text-xs mt-1 text-center">
            {step === 1 ? 'Paso 1: Protege tu seudónimo y credenciales cifradas' : 'Paso 2: Registro obligatorio de Cédula contra Fake News e IA'}
          </Text>
        </View>

        {/* Barra de 2 Pasos */}
        <View className="flex-row gap-2 my-2">
          <View className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-slate-800'}`} />
          <View className={`h-1 flex-1 rounded-full ${step === 2 ? 'bg-amber-400' : 'bg-slate-800'}`} />
        </View>

        {/* ================= PASO 1 ================= */}
        {step === 1 && (
          <View className="space-y-4 mt-2">
            <View className="p-3 rounded-2xl bg-[#0d1424] border border-amber-500/30 flex-row items-start">
              <ShieldCheck size={16} color="#fbbf24" style={{ marginTop: 2 }} />
              <Text className="text-slate-300 text-xs ml-2 flex-1 leading-snug">
                <Text className="font-bold text-amber-400">Cero Rastreo de IP:</Text> Puedes utilizar un seudónimo anónimo para reportar con total seguridad y anonimato.
              </Text>
            </View>

            <View>
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-xs font-bold text-slate-200">Alias de Seguridad (Nombre Público)</Text>
                <TouchableOpacity 
                  onPress={generateAnonymousAlias}
                  className="flex-row items-center bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30"
                >
                  <Shuffle size={10} color="#fbbf24" />
                  <Text className="text-[10px] font-bold text-amber-400 ml-1">Generar Anónimo</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-2.5">
                <User size={14} color="#64748b" />
                <TextInput
                  value={alias}
                  onChangeText={setAlias}
                  placeholder="Ej. Centinela_Caracas o tu seudónimo"
                  placeholderTextColor="#64748b"
                  className="text-white text-xs ml-2 flex-1"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Identificador Único (@handle)</Text>
              <View className="flex-row items-center bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-2.5">
                <Text className="text-slate-500 font-mono text-xs font-bold">@</Text>
                <TextInput
                  value={username.replace(/^@/, '')}
                  onChangeText={(val) => setUsername(`@${val.trim()}`)}
                  placeholder="centinela_ve"
                  placeholderTextColor="#64748b"
                  className="text-white text-xs ml-1 flex-1 font-mono"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Correo Electrónico Privado</Text>
              <View className="flex-row items-center bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-2.5">
                <Mail size={14} color="#64748b" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="tu_correo@privado.com"
                  placeholderTextColor="#64748b"
                  className="text-white text-xs ml-2 flex-1"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Clave Maestra de Cifrado</Text>
              <View className="flex-row items-center bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-2.5">
                <Lock size={14} color="#64748b" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Mínimo 8 caracteres seguros"
                  placeholderTextColor="#64748b"
                  className="text-white text-xs ml-2 flex-1"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} color="#94a3b8" /> : <Eye size={16} color="#94a3b8" />}
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Confirmar Clave Maestra</Text>
              <View className="flex-row items-center bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-2.5">
                <KeyRound size={14} color="#64748b" />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Repite tu clave maestra"
                  placeholderTextColor="#64748b"
                  className="text-white text-xs ml-2 flex-1"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Zona de Monitoreo Preferida</Text>
              <View className="bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-3">
                <Text className="text-white text-xs">{selectedZone}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleNextStep}
              className="w-full py-4 rounded-2xl bg-amber-500 flex-row justify-center items-center mt-4 shadow-lg shadow-amber-500/30"
            >
              <Text className="text-slate-950 font-black text-xs uppercase tracking-wider mr-2">
                CONTINUAR A VERIFICACIÓN DE DOCUMENTO
              </Text>
              <ArrowRight size={16} color="#020617" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}

        {/* ================= PASO 2: CÉDULA & ANTI-IA ================= */}
        {step === 2 && (
          <View className="space-y-4 mt-2">
            <View className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/50">
              <View className="flex-row items-center mb-1">
                <BadgeAlert size={16} color="#f87171" />
                <Text className="text-red-400 font-bold text-xs uppercase ml-1.5">
                  Tolerancia Cero a Fake News e IA Falsa
                </Text>
              </View>
              <Text className="text-slate-300 text-xs leading-relaxed">
                VozVe es una red de noticias verídicas. Si publicas información falsa o montajes de IA, tu cuenta y tu cédula quedarán <Text className="font-bold text-red-300">bloqueadas de por vida</Text>.
              </Text>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Número de Cédula Venezolana (V-)</Text>
              <View className="flex-row items-center bg-[#0a1120] border border-slate-700 rounded-2xl px-3 py-2.5">
                <FileBadge size={14} color="#64748b" />
                <TextInput
                  value={documentNumber}
                  onChangeText={setDocumentNumber}
                  placeholder="V-24.891.203"
                  placeholderTextColor="#64748b"
                  className="text-white text-xs ml-2 flex-1 font-mono"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs font-bold text-slate-200 mb-1">Foto o Escaneo de la Cédula</Text>
              <TouchableOpacity
                onPress={() => setDocUploaded(true)}
                className={`p-4 rounded-2xl border border-dashed items-center justify-center ${
                  docUploaded ? 'bg-emerald-950/30 border-emerald-500' : 'bg-[#0a1120] border-slate-700'
                }`}
              >
                <Camera size={22} color={docUploaded ? '#34d399' : '#fbbf24'} />
                <Text className={`text-xs font-bold mt-1.5 ${docUploaded ? 'text-emerald-300' : 'text-slate-300'}`}>
                  {docUploaded ? '✓ Documento Escaneado y Cifrado E2EE' : 'Escanear o Subir Documento'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="space-y-3 pt-2">
              <TouchableOpacity onPress={() => setAgreeTruth(!agreeTruth)} className="flex-row items-start">
                <Text className="text-amber-400 font-bold mr-2">{agreeTruth ? '☑' : '☐'}</Text>
                <Text className="text-slate-300 text-xs flex-1">
                  <Text className="font-bold text-white">Pacto de Veracidad:</Text> Solo publicaré hechos reales comprobables.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setAgreeAntiAi(!agreeAntiAi)} className="flex-row items-start mt-2">
                <Text className="text-amber-400 font-bold mr-2">{agreeAntiAi ? '☑' : '☐'}</Text>
                <Text className="text-slate-300 text-xs flex-1">
                  <Text className="font-bold text-white">Prohibición de IA:</Text> No usaré imágenes ni audios simulados con IA.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setAgreeBanWarning(!agreeBanWarning)} className="flex-row items-start mt-2">
                <Text className="text-red-400 font-bold mr-2">{agreeBanWarning ? '☑' : '☐'}</Text>
                <Text className="text-red-300 text-xs flex-1 font-medium">
                  <Text className="font-bold text-red-200">Consecuencia de Bloqueo:</Text> Acepto que cualquier falsedad causará el bloqueo permanente de mi cuenta.
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={handleFinishRegister}
              className="w-full py-4 rounded-2xl bg-amber-500 flex-row justify-center items-center mt-4 shadow-lg shadow-amber-500/30"
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