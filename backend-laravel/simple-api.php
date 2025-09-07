<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
function getDbConnection() {
    $host = 'galloways.co.ke';
    $dbname = 'gallowa2_neon';
    $username = 'gallowa2_william';
    $password = 'Galloways@2025';
    
    try {
        $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        return null;
    }
}

// Get request path and method
$requestUri = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($requestUri, PHP_URL_PATH);

// Remove /api from path if present
$path = preg_replace('#^/api#', '', $path);

// Route handlers
function handleHealth() {
    $db = getDbConnection();
    return [
        'status' => 'ok',
        'timestamp' => date('c'),
        'database' => $db ? 'connected' : 'disconnected'
    ];
}

function handleAdminMetrics() {
    return [
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
    ];
}

function handleAdminClaims() {
    $db = getDbConnection();
    if (!$db) {
        return ['error' => 'Database connection failed'];
    }
    
    try {
        $stmt = $db->query("SELECT * FROM claims ORDER BY created_at DESC LIMIT 50");
        $claims = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return [
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
        ];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function handleAdminUsers() {
    $db = getDbConnection();
    if (!$db) {
        return ['error' => 'Database connection failed'];
    }
    
    try {
        $stmt = $db->query("SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 50");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return [
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
        ];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function handleCreateClaim() {
    $db = getDbConnection();
    if (!$db) {
        return ['error' => 'Database connection failed'];
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $db->prepare("
            INSERT INTO claims (
                policy_number, claim_type, incident_date, incident_description,
                claimant_name, claimant_phone, claimant_email, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
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
        
        return [
            'success' => true,
            'message' => 'Claim submitted successfully',
            'claim_id' => $db->lastInsertId()
        ];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

// Router
try {
    switch ($path) {
        case '/health':
            $response = handleHealth();
            break;
            
        case '/admin/metrics':
            $response = handleAdminMetrics();
            break;
            
        case '/admin/claims':
            if ($method === 'GET') {
                $response = handleAdminClaims();
            } else {
                $response = ['error' => 'Method not allowed'];
            }
            break;
            
        case '/admin/users':
            $response = handleAdminUsers();
            break;
            
        case '/claims':
            if ($method === 'POST') {
                $response = handleCreateClaim();
            } else {
                $response = handleAdminClaims();
            }
            break;
            
        default:
            $response = ['error' => 'Endpoint not found', 'path' => $path];
            break;
    }
} catch (Exception $e) {
    $response = ['error' => $e->getMessage()];
}

echo json_encode($response);
?>
