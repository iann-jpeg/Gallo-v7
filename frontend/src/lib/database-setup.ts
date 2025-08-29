// Critical Database Auto-Setup for Galloways Admin Dashboard
// This will check table existence and provide setup guidance

import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const getEnvVar = (key: string, fallback: string): string => {
  if (typeof window !== 'undefined') {
    // Browser environment - use fallback values directly
    return fallback;
  }
  
  // Try to access Vite env vars if available
  try {
    return (import.meta as any)?.env?.[key] || fallback;
  } catch {
    return fallback;
  }
};

// Create a flexible client for setup operations
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://wctkikgmncnunntsiqdu.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjdGtpa2dtbmNudW5udHNpcWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMDYyMjAsImV4cCI6MjA1MDg4MjIyMH0.C3_pEe3yOI0-eMTgejBDr_R4HJH6lAXdcMmBJUgYCmw');

const setupClient = createClient(supabaseUrl, supabaseAnonKey)

// Required tables for the admin dashboard
const requiredTables = [
  'users',
  'claims', 
  'consultations',
  'quotes',
  'payments',
  'activities',
  'diaspora_requests',
  'outsourcing_requests',
  'resources'
];

// Check if tables exist and are accessible
export const checkTableExistence = async (): Promise<{ 
  success: boolean; 
  existingTables: string[];
  missingTables: string[];
  message: string;
}> => {
  const existingTables: string[] = [];
  const missingTables: string[] = [];

  // Only log table checking once per session to reduce noise
  if (!sessionStorage.getItem('db-table-check-logged')) {
    console.log('🔍 Checking database tables...');
    sessionStorage.setItem('db-table-check-logged', 'true');
  }

  for (const table of requiredTables) {
    try {
      // Try to query the table
      const { error } = await setupClient
        .from(table as any)
        .select('id', { count: 'exact', head: true })
        .limit(0);
      
      if (!error) {
        existingTables.push(table);
        // Only log successes once per session
        if (!sessionStorage.getItem(`${table}-success-logged`)) {
          console.log(`✅ Table '${table}' is accessible`);
          sessionStorage.setItem(`${table}-success-logged`, 'true');
        }
      } else {
        missingTables.push(table);
        // Suppress routine "table doesn't exist" errors
        if (!error.message?.includes('relation') && !error.message?.includes('does not exist')) {
          if (!sessionStorage.getItem(`${table}-error-logged`)) {
            console.log(`❌ Table '${table}' issue: ${error.message}`);
            sessionStorage.setItem(`${table}-error-logged`, 'true');
          }
        }
      }
    } catch (err) {
      missingTables.push(table);
      // Only log unexpected errors once per session
      if (!sessionStorage.getItem(`${table}-exception-logged`)) {
        console.log(`❌ Table '${table}' check failed:`, err);
        sessionStorage.setItem(`${table}-exception-logged`, 'true');
      }
    }
  }

  const success = existingTables.length >= 5; // At least half the tables should exist
  const message = success 
    ? `Database ready: ${existingTables.length}/${requiredTables.length} tables accessible`
    : `Database needs setup: ${missingTables.length} tables missing. Run the SQL setup script.`;

  return {
    success,
    existingTables,
    missingTables,
    message
  };
};

// Create sample data for testing
export const createSampleData = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Suppress sample data creation logging to reduce noise
    if (!sessionStorage.getItem('sample-data-logged')) {
      console.log('🎯 Creating sample data...');
      sessionStorage.setItem('sample-data-logged', 'true');
    }
    
    // Create sample user if users table exists
    try {
      const { error: userError } = await setupClient
        .from('users' as any)
        .upsert({
          id: 'sample-user-id',
          email: 'admin@galloways.com',
          full_name: 'System Admin',
          created_at: new Date().toISOString()
        });

      if (!userError) {
        console.log('✅ Sample user created');
      }
    } catch (e) {
      console.log('Sample user creation skipped');
    }

    return { success: true, message: 'Sample data creation attempted' };
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
    return { success: false, message: 'Failed to create sample data' };
  }
};

// Main setup function
export const setupDatabase = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🚀 Starting database setup check...');
    
    const tableCheck = await checkTableExistence();
    
    if (tableCheck.success) {
      console.log('✅ Database is ready!');
      // Optionally create sample data
      await createSampleData();
      return { 
        success: true, 
        message: `Database ready! ${tableCheck.existingTables.length} tables accessible.` 
      };
    } else {
      // Suppress repeated warnings - only log once per session
      if (!sessionStorage.getItem('db-setup-warning-shown')) {
        console.log('ℹ️ Database setup needed - using demo data for now');
        sessionStorage.setItem('db-setup-warning-shown', 'true');
      }
      
      return { 
        success: false, 
        message: `Demo mode active - run SQL setup script for live data.`
      };
    }
  } catch (error) {
    // Suppress error details, just indicate offline mode
    return { 
      success: false, 
      message: 'Demo mode - database offline' 
    };
  }
};

// Auto-run setup on import
if (typeof window !== 'undefined') {
  setupDatabase().then(result => {
    if (result.success) {
      console.log('🎉 Database auto-setup completed successfully!');
    } else {
      console.warn('⚠️ Database auto-setup incomplete:', result.message);
    }
  }).catch(err => {
    console.error('💥 Database auto-setup failed:', err);
  });
}
