import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Tu URL oficial de tu proyecto
const SUPABASE_URL = 'https://gthwttrvzkndbuvtlgey.supabase.co';

// Pega aquí la clave anon que copiaste en el Paso 1
const SUPABASE_ANON_KEY = 'PEGA_AQUI_TU_CLAVE_ANON';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});