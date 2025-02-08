import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-application-name': 'ezsumm',
    },
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  }
});

// Helper function to check connection with exponential backoff
export async function checkSupabaseConnection(maxRetries = 3): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      // Use a simple health check query
      const { data, error } = await supabase.rpc('version');
      
      if (!error) {
        return true;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, i), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
    } catch (err) {
      console.warn(`Connection attempt ${i + 1}/${maxRetries} failed:`, err);
      
      if (i === maxRetries - 1) {
        return false;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, i), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  return false;
}

// Helper to handle Supabase errors consistently
export function handleSupabaseError(error: any): string {
  if (error?.message?.includes('Failed to fetch')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }
  if (error?.code === 'PGRST116') {
    return 'Authentication required. Please sign in.';
  }
  if (error?.code?.startsWith('PGRST')) {
    return 'Database error occurred. Please try again.';
  }
  return error?.message || 'An unexpected error occurred';
}