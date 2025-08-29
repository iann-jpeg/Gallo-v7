// Enhanced error handling for Supabase operations
export class SupabaseErrorHandler {
  static handleRealtimeError(error: any) {
    console.warn('Supabase Real-time connection issue:', error);
    
    // Common real-time issues and fallback strategies
    if (error.message?.includes('WebSocket')) {
      console.warn('WebSocket connection failed. Real-time features will be limited.');
      return { usePolling: true, interval: 30000 };
    }
    
    if (error.message?.includes('third-party')) {
      console.warn('Third-party cookies blocked. Disabling session persistence.');
      return { disableAuth: true, usePolling: true };
    }
    
    return { fallback: true };
  }
  
  static handleAuthError(error: any) {
    console.warn('Supabase Auth issue:', error);
    
    // For now, we're not using auth, so we can safely ignore these
    if (error.message?.includes('setToken') || error.message?.includes('token')) {
      console.warn('Token-related error ignored (auth disabled)');
      return { ignored: true };
    }
    
    return { handled: false };
  }
  
  static createSafeClient(supabaseUrl: string, supabaseKey: string) {
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials are required');
    }
    
    try {
      const { createClient } = require('@supabase/supabase-js');
      
      return createClient(supabaseUrl, supabaseKey, {
        auth: {
          storage: undefined, // Disable storage to avoid cookie issues
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        realtime: {
          params: {
            eventsPerSecond: 2
          },
          timeout: 20000,
          // Add error handlers
          logger: (level: string, message: string, details?: any) => {
            if (level === 'error') {
              SupabaseErrorHandler.handleRealtimeError({ message, details });
            }
          }
        },
        global: {
          headers: {
            'x-client-info': 'galloways-frontend@1.0.0'
          }
        }
      });
    } catch (error) {
      console.error('Failed to create Supabase client:', error);
      throw error;
    }
  }
}
