-- CRITICAL: Run this SQL script in your Supabase Dashboard -> SQL Editor
-- This will create all required tables for the Galloways Admin Dashboard
-- Go to: https://supabase.com/dashboard/project/wctkikgmncnunntsiqdu/sql

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text,
  email text UNIQUE,
  phone text,
  role text DEFAULT 'client',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Claims table  
CREATE TABLE IF NOT EXISTS claims (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text NOT NULL,
  description text,
  amount decimal(10,2) DEFAULT 0,
  status text DEFAULT 'pending',
  file_url text,
  file_name text,
  file_size bigint,
  file_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text NOT NULL,
  message text,
  preferred_date date,
  status text DEFAULT 'pending',
  scheduled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text NOT NULL,
  description text,
  amount decimal(10,2),
  status text DEFAULT 'pending',
  file_url text,
  file_name text,
  file_size bigint,
  file_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL,
  description text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- 6. Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  amount decimal(10,2) NOT NULL,
  payment_method text NOT NULL,
  status text DEFAULT 'pending',
  reference text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 7. Diaspora requests table
CREATE TABLE IF NOT EXISTS diaspora_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  current_country text,
  service_type text NOT NULL,
  description text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. Outsourcing requests table
CREATE TABLE IF NOT EXISTS outsourcing_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text NOT NULL,
  project_description text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 9. Resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  file_url text,
  file_name text,
  file_size bigint,
  file_type text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaspora_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE outsourcing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- 11. Create public access policies (for development)
-- Users policies
DROP POLICY IF EXISTS "Enable all access for users" ON users;
CREATE POLICY "Enable all access for users" ON users FOR ALL USING (true);

-- Claims policies
DROP POLICY IF EXISTS "Enable all access for claims" ON claims;
CREATE POLICY "Enable all access for claims" ON claims FOR ALL USING (true);

-- Consultations policies
DROP POLICY IF EXISTS "Enable all access for consultations" ON consultations;
CREATE POLICY "Enable all access for consultations" ON consultations FOR ALL USING (true);

-- Quotes policies
DROP POLICY IF EXISTS "Enable all access for quotes" ON quotes;
CREATE POLICY "Enable all access for quotes" ON quotes FOR ALL USING (true);

-- Activities policies
DROP POLICY IF EXISTS "Enable all access for activities" ON activities;
CREATE POLICY "Enable all access for activities" ON activities FOR ALL USING (true);

-- Payments policies
DROP POLICY IF EXISTS "Enable all access for payments" ON payments;
CREATE POLICY "Enable all access for payments" ON payments FOR ALL USING (true);

-- Diaspora requests policies
DROP POLICY IF EXISTS "Enable all access for diaspora_requests" ON diaspora_requests;
CREATE POLICY "Enable all access for diaspora_requests" ON diaspora_requests FOR ALL USING (true);

-- Outsourcing requests policies
DROP POLICY IF EXISTS "Enable all access for outsourcing_requests" ON outsourcing_requests;
CREATE POLICY "Enable all access for outsourcing_requests" ON outsourcing_requests FOR ALL USING (true);

-- Resources policies
DROP POLICY IF EXISTS "Enable all access for resources" ON resources;
CREATE POLICY "Enable all access for resources" ON resources FOR ALL USING (true);

-- 12. Create storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('files', 'files', true)
ON CONFLICT (id) DO NOTHING;

-- 13. Storage policies
DROP POLICY IF EXISTS "Public file access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated file upload" ON storage.objects;
CREATE POLICY "Public file access" ON storage.objects FOR SELECT USING (bucket_id = 'files');
CREATE POLICY "Authenticated file upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'files');

-- 14. Insert sample data
INSERT INTO activities (type, description, entity_type, entity_id) VALUES
('SYSTEM_INIT', 'Database tables created successfully', 'SYSTEM', NULL),
('ADMIN_SETUP', 'Admin dashboard is now ready to use', 'SYSTEM', NULL)
ON CONFLICT DO NOTHING;

-- 15. Add some sample data for testing
INSERT INTO claims (client_name, email, phone, service_type, description, status) VALUES
('John Doe', 'john@example.com', '+1234567890', 'Insurance Claim', 'Sample insurance claim for testing', 'pending'),
('Jane Smith', 'jane@example.com', '+0987654321', 'Legal Claim', 'Sample legal claim for testing', 'pending')
ON CONFLICT DO NOTHING;

INSERT INTO consultations (client_name, email, phone, service_type, message, status) VALUES
('Mike Johnson', 'mike@example.com', '+1122334455', 'Legal Consultation', 'Need legal advice', 'pending'),
('Sarah Wilson', 'sarah@example.com', '+5566778899', 'Business Consultation', 'Business setup guidance needed', 'pending')
ON CONFLICT DO NOTHING;

INSERT INTO quotes (client_name, email, phone, service_type, description, status) VALUES
('Alex Brown', 'alex@example.com', '+1111222233', 'Insurance Quote', 'Need insurance quote', 'pending'),
('Emma Davis', 'emma@example.com', '+4444555566', 'Legal Quote', 'Legal services quote request', 'pending')
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Database tables created successfully! Admin dashboard is now ready.' as message, 
       'All tables, policies, and sample data have been set up.' as details;
