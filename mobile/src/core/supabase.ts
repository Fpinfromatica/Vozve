import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// URL oficial de tu proyecto Vozve
const SUPABASE_URL = 'https://gthwttrvzkndbuvtlgey.supabase.co';

// Clave anon pública completa de tu proyecto
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHd0dHJ2emtuZGJ1dnRsZ2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NjQyNjEsImV4cCI6MjEwMDE0MDI2MX0.ue9xg--CSnOD_uucEszyxSQT1kFN4MI-K2HpBp7xa0g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});