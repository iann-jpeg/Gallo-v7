-- SQL seed for tables created by migrations

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50) DEFAULT 'USER',
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claims (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  policy_number VARCHAR(255),
  claim_type VARCHAR(255),
  incident_date DATE,
  estimated_loss NUMERIC(15,2),
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  submitter_email VARCHAR(255),
  submitter_name VARCHAR(255),
  submitter_phone VARCHAR(255),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(100),
  service_type VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  details TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consultations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(100),
  country VARCHAR(255),
  timezone VARCHAR(255),
  service_interest VARCHAR(255),
  service_type VARCHAR(255),
  scheduled_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  meeting_link VARCHAR(1024),
  duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diaspora_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(100),
  country VARCHAR(255),
  details TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS outsourcing_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  organization_name VARCHAR(255),
  core_functions TEXT,
  location VARCHAR(255),
  address TEXT,
  email VARCHAR(255),
  services JSONB,
  nature_of_outsourcing VARCHAR(255),
  budget_range VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  amount NUMERIC(15,2),
  currency VARCHAR(10) DEFAULT 'KES',
  method VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  reference VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- insert sample users
INSERT INTO users (name,email,role,created_at,updated_at) VALUES
('Admin','admin@example.com','ADMIN',now(),now()),
('John Doe','john.doe@example.com','USER',now(),now()),
('Jane Smith','jane.smith@example.com','USER',now(),now());

-- sample claims
INSERT INTO claims (policy_number, claim_type, incident_date, estimated_loss, description, status, submitter_email, submitter_name, submitter_phone) VALUES
('787663','Motor','2025-10-03',890000,'tech details','pending','excel6737@gmail.com','excel baraka','0759097157');

-- sample consultations
INSERT INTO consultations (name,email,phone,country,timezone,service_interest,service_type,scheduled_at,status,duration,created_at,updated_at) VALUES
('excel baraka','excel6737@gmail.com','0759097157','Kenya','America/New_York','policy-review','policy-review','2025-10-10 14:00:00','pending',60,now(),now());

-- sample outsourcing request
INSERT INTO outsourcing_requests (organization_name,location,email,services,nature_of_outsourcing,budget_range,status,created_at,updated_at) VALUES
('cipher','kisumu','excel6737@gmail.com','["Policy Administration"]','full','KES 250,000 - 500,000','pending',now(),now());

-- sample payment
INSERT INTO payments (amount,currency,method,status,reference,created_at,updated_at) VALUES
(1000,'KES','card','completed','REF123',now(),now());
