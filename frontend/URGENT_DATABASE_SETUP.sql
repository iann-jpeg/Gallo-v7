-- 🚨 CRITICAL DATABASE SETUP FOR GALLOWAYS ADMIN - RUN THIS IN SUPABASE SQL EDITOR
-- This will create all required tables and configure proper access permissions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Claims table
CREATE TABLE IF NOT EXISTS claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    claim_type VARCHAR(100),
    amount DECIMAL(12,2),
    status VARCHAR(50) DEFAULT 'pending',
    description TEXT,
    documents JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Consultations table
CREATE TABLE IF NOT EXISTS consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    consultation_type VARCHAR(100),
    service_category VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'requested',
    description TEXT,
    scheduled_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    service_type VARCHAR(100),
    amount DECIMAL(12,2),
    status VARCHAR(50) DEFAULT 'pending',
    valid_until DATE,
    description TEXT,
    items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Activities table (for system logging)
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    activity_type VARCHAR(100),
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'GBP',
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(100),
    reference_id VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Diaspora requests table
CREATE TABLE IF NOT EXISTS diaspora_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    request_type VARCHAR(100),
    country_of_origin VARCHAR(100),
    country_of_residence VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    description TEXT,
    documents JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Outsourcing requests table
CREATE TABLE IF NOT EXISTS outsourcing_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    service_type VARCHAR(100),
    project_scope TEXT,
    budget_range VARCHAR(50),
    timeline VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    requirements JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Resources table
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100),
    category VARCHAR(100),
    content TEXT,
    file_url VARCHAR(500),
    access_level VARCHAR(50) DEFAULT 'public',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 🔓 CRITICAL: DISABLE RLS AND ENABLE PUBLIC ACCESS FOR ADMIN DASHBOARD
-- This allows the anon key to access all tables

-- Disable RLS on all tables (for admin access)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE claims DISABLE ROW LEVEL SECURITY;
ALTER TABLE consultations DISABLE ROW LEVEL SECURITY;
ALTER TABLE quotes DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE diaspora_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE outsourcing_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE resources DISABLE ROW LEVEL SECURITY;

-- Grant full access to anon role (for admin dashboard)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at);

CREATE INDEX IF NOT EXISTS idx_consultations_user_id ON consultations(user_id);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);

CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at);

-- Insert sample admin user
INSERT INTO users (id, email, full_name, phone) 
VALUES (
    'admin-user-001',
    'admin@galloways.com',
    'System Administrator',
    '+44 20 7123 4567'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample data for testing
INSERT INTO claims (user_id, claim_type, amount, status, description) VALUES
    ('admin-user-001', 'Insurance Claim', 2500.00, 'pending', 'Property damage claim for water leak'),
    ('admin-user-001', 'Compensation Claim', 5000.00, 'approved', 'Personal injury compensation'),
    ('admin-user-001', 'Refund Request', 750.00, 'processing', 'Service refund request')
ON CONFLICT DO NOTHING;

INSERT INTO consultations (user_id, consultation_type, service_category, status, description) VALUES
    ('admin-user-001', 'Legal Consultation', 'Property Law', 'scheduled', 'Property dispute consultation'),
    ('admin-user-001', 'Business Consultation', 'Corporate Law', 'completed', 'Business formation advice'),
    ('admin-user-001', 'Immigration Consultation', 'Visa Services', 'requested', 'Visa application guidance')
ON CONFLICT DO NOTHING;

INSERT INTO quotes (user_id, service_type, amount, status, description) VALUES
    ('admin-user-001', 'Legal Services', 3000.00, 'pending', 'Contract review and negotiation'),
    ('admin-user-001', 'Immigration Services', 1500.00, 'approved', 'Spouse visa application'),
    ('admin-user-001', 'Business Services', 2000.00, 'draft', 'Company registration and setup')
ON CONFLICT DO NOTHING;

INSERT INTO payments (user_id, amount, status, payment_method, description) VALUES
    ('admin-user-001', 1500.00, 'completed', 'Bank Transfer', 'Legal consultation payment'),
    ('admin-user-001', 500.00, 'pending', 'Credit Card', 'Document processing fee'),
    ('admin-user-001', 2000.00, 'failed', 'PayPal', 'Service fee payment')
ON CONFLICT DO NOTHING;

INSERT INTO activities (user_id, activity_type, description) VALUES
    ('admin-user-001', 'login', 'User logged into admin dashboard'),
    ('admin-user-001', 'claim_submitted', 'New insurance claim submitted'),
    ('admin-user-001', 'payment_processed', 'Payment successfully processed'),
    ('admin-user-001', 'consultation_scheduled', 'Legal consultation scheduled'),
    ('admin-user-001', 'document_uploaded', 'Supporting documents uploaded')
ON CONFLICT DO NOTHING;

-- Create updated_at triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diaspora_requests_updated_at BEFORE UPDATE ON diaspora_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_outsourcing_requests_updated_at BEFORE UPDATE ON outsourcing_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Final verification query
SELECT 
    'Database setup complete! Tables created:' as status,
    COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'claims', 'consultations', 'quotes', 'payments', 'activities', 'diaspora_requests', 'outsourcing_requests', 'resources');
