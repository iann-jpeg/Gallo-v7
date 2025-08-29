-- ============================================
-- COMPLETE SUPABASE DATABASE SETUP
-- Run this script in your Supabase SQL Editor
-- ============================================

-- Enable RLS for all tables
-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.claims CASCADE;
DROP TABLE IF EXISTS public.consultations CASCADE;
DROP TABLE IF EXISTS public.quotes CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.diaspora_requests CASCADE;
DROP TABLE IF EXISTS public.outsourcing_requests CASCADE;
DROP TABLE IF EXISTS public.resources CASCADE;

-- Create Users table
CREATE TABLE public.users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'SUPER_ADMIN')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Claims table
CREATE TABLE public.claims (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    policy_number TEXT,
    claim_type TEXT NOT NULL,
    service_type TEXT,
    description TEXT NOT NULL,
    estimated_loss DECIMAL(10,2) DEFAULT 0,
    amount DECIMAL(10,2) DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_review')),
    incident_date DATE,
    location TEXT,
    file_url TEXT,
    file_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Consultations table  
CREATE TABLE public.consultations (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_type TEXT NOT NULL,
    consultation_type TEXT,
    message TEXT,
    description TEXT,
    budget DECIMAL(10,2) DEFAULT 0,
    timeline TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Quotes table
CREATE TABLE public.quotes (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_type TEXT NOT NULL,
    quote_type TEXT,
    description TEXT,
    message TEXT,
    budget DECIMAL(10,2) DEFAULT 0,
    amount DECIMAL(10,2) DEFAULT 0,
    timeline TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'in_review')),
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Payments table
CREATE TABLE public.payments (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT,
    email TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_method TEXT,
    transaction_id TEXT,
    reference TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Diaspora Requests table
CREATE TABLE public.diaspora_requests (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    service_type TEXT NOT NULL,
    message TEXT,
    description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Outsourcing Requests table
CREATE TABLE public.outsourcing_requests (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_type TEXT NOT NULL,
    project_type TEXT,
    description TEXT,
    message TEXT,
    budget DECIMAL(10,2) DEFAULT 0,
    timeline TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Activities table for logging
CREATE TABLE public.activities (
    id BIGSERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    entity_id TEXT,
    entity_type TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Resources table
CREATE TABLE public.resources (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    url TEXT,
    file_path TEXT,
    file_size INTEGER,
    admin_only BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_claims_status ON public.claims(status);
CREATE INDEX idx_claims_created_at ON public.claims(created_at DESC);
CREATE INDEX idx_claims_email ON public.claims(email);

CREATE INDEX idx_consultations_status ON public.consultations(status);
CREATE INDEX idx_consultations_created_at ON public.consultations(created_at DESC);
CREATE INDEX idx_consultations_email ON public.consultations(email);

CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX idx_quotes_email ON public.quotes(email);

CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_created_at ON public.payments(created_at DESC);

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_status ON public.users(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diaspora_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outsourcing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (you can modify these for security)
-- For now, we'll allow all operations for simplicity

-- Claims policies
CREATE POLICY "Allow all operations on claims" ON public.claims
    FOR ALL USING (true) WITH CHECK (true);

-- Consultations policies  
CREATE POLICY "Allow all operations on consultations" ON public.consultations
    FOR ALL USING (true) WITH CHECK (true);

-- Quotes policies
CREATE POLICY "Allow all operations on quotes" ON public.quotes
    FOR ALL USING (true) WITH CHECK (true);

-- Payments policies
CREATE POLICY "Allow all operations on payments" ON public.payments
    FOR ALL USING (true) WITH CHECK (true);

-- Users policies
CREATE POLICY "Allow all operations on users" ON public.users
    FOR ALL USING (true) WITH CHECK (true);

-- Diaspora requests policies
CREATE POLICY "Allow all operations on diaspora_requests" ON public.diaspora_requests
    FOR ALL USING (true) WITH CHECK (true);

-- Outsourcing requests policies  
CREATE POLICY "Allow all operations on outsourcing_requests" ON public.outsourcing_requests
    FOR ALL USING (true) WITH CHECK (true);

-- Activities policies
CREATE POLICY "Allow all operations on activities" ON public.activities
    FOR ALL USING (true) WITH CHECK (true);

-- Resources policies
CREATE POLICY "Allow all operations on resources" ON public.resources
    FOR ALL USING (true) WITH CHECK (true);

-- Insert some sample data
INSERT INTO public.users (name, full_name, email, role, status) VALUES 
('Admin User', 'Admin User', 'admin@galloways.com', 'ADMIN', 'active'),
('John Doe', 'John Doe', 'john@example.com', 'USER', 'active'),
('Jane Smith', 'Jane Smith', 'jane@example.com', 'USER', 'active');

INSERT INTO public.claims (client_name, email, phone, claim_type, service_type, description, estimated_loss, amount, status) VALUES
('Test Client', 'test@example.com', '+44 20 1234 5678', 'Property Damage', 'Insurance Claim', 'Test claim for water damage', 5000.00, 5000.00, 'pending'),
('Sample User', 'sample@example.com', '+44 20 9876 5432', 'Personal Injury', 'Legal Claim', 'Sample personal injury claim', 15000.00, 15000.00, 'approved');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON public.claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON public.consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diaspora_requests_updated_at BEFORE UPDATE ON public.diaspora_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_outsourcing_requests_updated_at BEFORE UPDATE ON public.outsourcing_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions to authenticated and anon users
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;  
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;

-- ============================================
-- SETUP COMPLETE!
-- 
-- Next steps:
-- 1. Run this script in your Supabase SQL Editor
-- 2. Verify tables are created in the Table Editor
-- 3. Test form submissions in your frontend app
-- 4. Check the admin dashboard to see data
-- ============================================
