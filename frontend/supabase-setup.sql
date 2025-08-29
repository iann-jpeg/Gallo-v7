-- Missing Tables for Complete Supabase Implementation
-- Run these migrations in your Supabase SQL Editor

-- 1. Users table (if not exists)
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

-- 2. Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text NOT NULL,
  message text,
  preferred_date date,
  preferred_time time,
  status text DEFAULT 'pending',
  scheduled_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Quotes table
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
  valid_until date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Diaspora requests table
CREATE TABLE IF NOT EXISTS diaspora_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  current_country text,
  service_type text NOT NULL,
  description text,
  urgency_level text DEFAULT 'normal',
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Outsourcing requests table
CREATE TABLE IF NOT EXISTS outsourcing_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text NOT NULL,
  project_description text,
  budget_range text,
  timeline text,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. Activities table for tracking system activities
CREATE TABLE IF NOT EXISTS activities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL,
  description text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- 7. Storage bucket for files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('files', 'files', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'files');
CREATE POLICY "Authenticated users can upload files" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'files' AND auth.role() = 'authenticated');

-- 9. Row Level Security (Enable RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaspora_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE outsourcing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- 10. RLS Policies (Allow public access for now - adjust as needed)
CREATE POLICY "Enable all access for users" ON users FOR ALL USING (true);
CREATE POLICY "Enable all access for consultations" ON consultations FOR ALL USING (true);
CREATE POLICY "Enable all access for quotes" ON quotes FOR ALL USING (true);
CREATE POLICY "Enable all access for diaspora_requests" ON diaspora_requests FOR ALL USING (true);
CREATE POLICY "Enable all access for outsourcing_requests" ON outsourcing_requests FOR ALL USING (true);
CREATE POLICY "Enable all access for activities" ON activities FOR ALL USING (true);

-- 11. Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER diaspora_requests_updated_at BEFORE UPDATE ON diaspora_requests FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();
CREATE TRIGGER outsourcing_requests_updated_at BEFORE UPDATE ON outsourcing_requests FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- 12. Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE consultations;
ALTER PUBLICATION supabase_realtime ADD TABLE quotes;
ALTER PUBLICATION supabase_realtime ADD TABLE diaspora_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE outsourcing_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE activities;

-- 13. Sample data for testing (optional)
-- INSERT INTO users (full_name, email, role) VALUES 
-- ('Admin User', 'admin@galloways.co.ke', 'admin'),
-- ('John Doe', 'john@example.com', 'client');

-- INSERT INTO activities (type, description, entity_type, entity_id) VALUES
-- ('SYSTEM_START', 'System initialized successfully', 'SYSTEM', NULL),
-- ('USER_REGISTERED', 'New user registered', 'USER', '1'),
-- ('CONSULTATION_BOOKED', 'New consultation booking received', 'CONSULTATION', '1');
