import 'react-native-url-polyfill/auto'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://foykxwlsrfnuwqtiixed.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZveWt4d2xzcmZudXdxdGlpeGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMDUzMDMsImV4cCI6MjAxNzg4MTMwM30.dFYj6JU00P2c6FO0-99buDc9j1f3boXGIp9dsQJfGsE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// export const loginRequest = (email, password) =>
//   signInWithEmailAndPassword(auth, email, password);

// export const registerRequest = (email, password) =>
//   createUserWithEmailAndPassword(auth, email, password);
