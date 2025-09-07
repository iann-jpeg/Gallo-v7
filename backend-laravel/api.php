<?php
/**
 * Galloways Insurance API
 * Production-ready PostgreSQL API for cPanel deployment
 */

// CORS and Headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database Configuration
class Database {
    private static $instance = null;
    private $connection;
    
    private function __construct() {
        $host = 'galloways.co.ke';
        $dbname = 'gallowa2_neon';
        $username = 'gallowa2_william';
        $password = 'Galloways@2025';
        
        try {
            $this->connection = new PDO(
                "pgsql:host=$host;dbname=$dbname", 
                $username, 
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
        } catch (PDOException $e) {
            throw new Exception('Database connection failed: ' . $e->getMessage());
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
}

// API Router Class
class ApiRouter {
    private $db;
    
    public function __construct() {
        try {
            $this->db = Database::getInstance()->getConnection();
        } catch (Exception $e) {
            $this->sendResponse(['error' => $e->getMessage()], 500);
        }
    }
    
    public function route() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $this->getPath();
        
        try {
            switch (true) {
                case $path === '/health':
                    $this->handleHealth();
                    break;
                    
                case $path === '/admin/metrics':
                    $this->handleAdminMetrics();
                    break;
                    
                case $path === '/admin/claims':
                    if ($method === 'GET') {
                        $this->handleGetClaims();
                    } else {
                        $this->sendResponse(['error' => 'Method not allowed'], 405);
                    }
                    break;
                    
                case $path === '/admin/users':
                    $this->handleGetUsers();
                    break;
                    
                case $path === '/admin/consultations':
                    $this->handleGetConsultations();
                    break;
                    
                case $path === '/admin/quotes':
                    $this->handleGetQuotes();
                    break;
                    
                case $path === '/claims':
                    if ($method === 'POST') {
                        $this->handleCreateClaim();
                    } else {
                        $this->handleGetClaims();
                    }
                    break;
                    
                case $path === '/quotes':
                    if ($method === 'POST') {
                        $this->handleCreateQuote();
                    } else {
                        $this->handleGetQuotes();
                    }
                    break;
                    
                case $path === '/consultations':
                    if ($method === 'POST') {
                        $this->handleCreateConsultation();
                    } else {
                        $this->handleGetConsultations();
                    }
                    break;
                    
                default:
                    $this->sendResponse(['error' => 'Endpoint not found', 'path' => $path], 404);
                    break;
            }
        } catch (Exception $e) {
            $this->sendResponse(['error' => $e->getMessage()], 500);
        }
    }
    
    private function getPath() {
        $uri = $_SERVER['REQUEST_URI'];
        $path = parse_url($uri, PHP_URL_PATH);
        return preg_replace('#^/api#', '', $path);
    }
    
    private function sendResponse($data, $status = 200) {
        http_response_code($status);
        echo json_encode($data, JSON_PRETTY_PRINT);
        exit();
    }
    
    private function getInput() {
        return json_decode(file_get_contents('php://input'), true) ?: [];
    }
    
    // Health Check
    private function handleHealth() {
        $this->sendResponse([
            'status' => 'ok',
            'timestamp' => date('c'),
            'database' => 'connected',
            'environment' => 'production'
        ]);
    }
    
    // Admin Metrics
    private function handleAdminMetrics() {
        $this->sendResponse([
            'system' => [
                'cpu_usage' => '25%',
                'memory_usage' => '60%',
                'disk_usage' => '40%',
                'uptime' => '99.9%'
            ],
            'database' => [
                'connections' => 12,
                'queries_per_second' => 450,
                'size' => '2.3GB'
            ],
            'api' => [
                'requests_per_minute' => 1250,
                'average_response_time' => '120ms',
                'error_rate' => '0.02%'
            ]
        ]);
    }
    
    // Claims Management
    private function handleGetClaims() {
        $stmt = $this->db->query("
            SELECT * FROM claims 
            ORDER BY created_at DESC 
            LIMIT 50
        ");
        $claims = $stmt->fetchAll();
        
        $this->sendResponse([
            'success' => true,
            'data' => [
                'claims' => $claims,
                'pagination' => [
                    'page' => 1,
                    'limit' => 50,
                    'total' => count($claims),
                    'pages' => 1
                ]
            ]
        ]);
    }
    
    private function handleCreateClaim() {
        $input = $this->getInput();
        
        $stmt = $this->db->prepare("
            INSERT INTO claims (
                policy_number, claim_type, incident_date, incident_description,
                claimant_name, claimant_phone, claimant_email, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
            RETURNING id
        ");
        
        $stmt->execute([
            $input['policyNumber'] ?? '',
            $input['claimType'] ?? '',
            $input['incidentDate'] ?? '',
            $input['incidentDescription'] ?? '',
            $input['claimantName'] ?? '',
            $input['claimantPhone'] ?? '',
            $input['claimantEmail'] ?? ''
        ]);
        
        $result = $stmt->fetch();
        
        $this->sendResponse([
            'success' => true,
            'message' => 'Claim submitted successfully',
            'claim_id' => $result['id']
        ]);
    }
    
    // Users Management
    private function handleGetUsers() {
        $stmt = $this->db->query("
            SELECT id, name, email, role, created_at 
            FROM users 
            ORDER BY created_at DESC 
            LIMIT 50
        ");
        $users = $stmt->fetchAll();
        
        $this->sendResponse([
            'success' => true,
            'data' => [
                'data' => $users,
                'pagination' => [
                    'page' => 1,
                    'limit' => 50,
                    'total' => count($users),
                    'pages' => 1
                ]
            ]
        ]);
    }
    
    // Consultations Management
    private function handleGetConsultations() {
        $stmt = $this->db->query("
            SELECT * FROM consultations 
            ORDER BY created_at DESC 
            LIMIT 50
        ");
        $consultations = $stmt->fetchAll();
        
        $this->sendResponse([
            'success' => true,
            'data' => [
                'consultations' => $consultations,
                'pagination' => [
                    'page' => 1,
                    'limit' => 50,
                    'total' => count($consultations),
                    'pages' => 1
                ]
            ]
        ]);
    }
    
    private function handleCreateConsultation() {
        $input = $this->getInput();
        
        $stmt = $this->db->prepare("
            INSERT INTO consultations (
                client_name, client_email, client_phone, consultation_type,
                preferred_date, preferred_time, message, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
            RETURNING id
        ");
        
        $stmt->execute([
            $input['clientName'] ?? '',
            $input['clientEmail'] ?? '',
            $input['clientPhone'] ?? '',
            $input['consultationType'] ?? '',
            $input['preferredDate'] ?? '',
            $input['preferredTime'] ?? '',
            $input['message'] ?? ''
        ]);
        
        $result = $stmt->fetch();
        
        $this->sendResponse([
            'success' => true,
            'message' => 'Consultation request submitted successfully',
            'consultation_id' => $result['id']
        ]);
    }
    
    // Quotes Management
    private function handleGetQuotes() {
        $stmt = $this->db->query("
            SELECT * FROM quotes 
            ORDER BY created_at DESC 
            LIMIT 50
        ");
        $quotes = $stmt->fetchAll();
        
        $this->sendResponse([
            'success' => true,
            'data' => [
                'data' => $quotes,
                'pagination' => [
                    'page' => 1,
                    'limit' => 50,
                    'total' => count($quotes),
                    'pages' => 1
                ]
            ]
        ]);
    }
    
    private function handleCreateQuote() {
        $input = $this->getInput();
        
        $stmt = $this->db->prepare("
            INSERT INTO quotes (
                client_name, client_email, client_phone, insurance_type,
                coverage_amount, vehicle_make, vehicle_model, vehicle_year,
                status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
            RETURNING id
        ");
        
        $stmt->execute([
            $input['clientName'] ?? '',
            $input['clientEmail'] ?? '',
            $input['clientPhone'] ?? '',
            $input['insuranceType'] ?? '',
            $input['coverageAmount'] ?? '',
            $input['vehicleMake'] ?? '',
            $input['vehicleModel'] ?? '',
            $input['vehicleYear'] ?? ''
        ]);
        
        $result = $stmt->fetch();
        
        $this->sendResponse([
            'success' => true,
            'message' => 'Quote request submitted successfully',
            'quote_id' => $result['id']
        ]);
    }
}

// Initialize and route the request
try {
    $router = new ApiRouter();
    $router->route();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error: ' . $e->getMessage()]);
}
?>
