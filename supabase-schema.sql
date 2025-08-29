-- Supabase Database Schema for Insurance Platform
-- Run these SQL commands in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for admin/user management if needed)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Claims table
CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    claim_type TEXT,
    amount DECIMAL(10,2),
    status TEXT DEFAULT 'pending',
    file_url TEXT,
    file_name TEXT,
    file_size INTEGER,
    file_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT,
    preferred_date DATE,
    preferred_time TIME,
    message TEXT,
    status TEXT DEFAULT 'pending',
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Diaspora requests table
CREATE TABLE IF NOT EXISTS diaspora_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT,
    current_location TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outsourcing requests table
CREATE TABLE IF NOT EXISTS outsourcing_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT,
    project_description TEXT,
    budget_range TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT,
    transaction_id TEXT UNIQUE,
    status TEXT DEFAULT 'pending',
    metadata JSONB,
    related_service TEXT,
    related_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT,
    description TEXT,
    amount DECIMAL(10,2),
    status TEXT DEFAULT 'draft',
    file_url TEXT,
    file_name TEXT,
    file_size INTEGER,
    file_type TEXT,
    valid_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources table
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size INTEGER,
    file_type TEXT,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table (for audit logs)
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    description TEXT,
    table_name TEXT,
    record_id UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('files', 'files', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS) but create permissive policies for open access
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE diaspora_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE outsourcing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for anonymous access (open system)
-- Users policies
CREATE POLICY "Allow anonymous read access on users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on users" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on users" ON users FOR DELETE USING (true);

-- Claims policies
CREATE POLICY "Allow anonymous read access on claims" ON claims FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on claims" ON claims FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on claims" ON claims FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on claims" ON claims FOR DELETE USING (true);

-- Consultations policies
CREATE POLICY "Allow anonymous read access on consultations" ON consultations FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on consultations" ON consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on consultations" ON consultations FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on consultations" ON consultations FOR DELETE USING (true);

-- Diaspora requests policies
CREATE POLICY "Allow anonymous read access on diaspora_requests" ON diaspora_requests FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on diaspora_requests" ON diaspora_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on diaspora_requests" ON diaspora_requests FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on diaspora_requests" ON diaspora_requests FOR DELETE USING (true);

-- Outsourcing requests policies
CREATE POLICY "Allow anonymous read access on outsourcing_requests" ON outsourcing_requests FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on outsourcing_requests" ON outsourcing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on outsourcing_requests" ON outsourcing_requests FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on outsourcing_requests" ON outsourcing_requests FOR DELETE USING (true);

-- Payments policies
CREATE POLICY "Allow anonymous read access on payments" ON payments FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on payments" ON payments FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on payments" ON payments FOR DELETE USING (true);

-- Quotes policies
CREATE POLICY "Allow anonymous read access on quotes" ON quotes FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on quotes" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on quotes" ON quotes FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on quotes" ON quotes FOR DELETE USING (true);

-- Resources policies
CREATE POLICY "Allow anonymous read access on resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on resources" ON resources FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on resources" ON resources FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on resources" ON resources FOR DELETE USING (true);

-- Activities policies
CREATE POLICY "Allow anonymous read access on activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on activities" ON activities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on activities" ON activities FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on activities" ON activities FOR DELETE USING (true);

-- Storage policies for file uploads
CREATE POLICY "Allow anonymous uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'files');
CREATE POLICY "Allow anonymous downloads" ON storage.objects FOR SELECT USING (bucket_id = 'files');
CREATE POLICY "Allow anonymous updates" ON storage.objects FOR UPDATE USING (bucket_id = 'files');
CREATE POLICY "Allow anonymous deletes" ON storage.objects FOR DELETE USING (bucket_id = 'files');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diaspora_requests_updated_at BEFORE UPDATE ON diaspora_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_outsourcing_requests_updated_at BEFORE UPDATE ON outsourcing_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO resources (title, description, category, file_url, file_name) VALUES 
('Sample Insurance Guide', 'A comprehensive guide to understanding insurance', 'guides', 'https://example.com/guide.pdf', 'insurance-guide.pdf'),
('Claims Process Document', 'Step by step claims process', 'processes', 'https://example.com/claims.pdf', 'claims-process.pdf')
ON CONFLICT DO NOTHING;

INSERT INTO activities (action, description, table_name) VALUES 
('system_init', 'Database schema initialized', 'system'),
('sample_data', 'Sample data inserted', 'resources')
ON CONFLICT DO NOTHING;
