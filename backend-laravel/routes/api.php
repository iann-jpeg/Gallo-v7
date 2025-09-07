<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;

// Health check endpoint
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'database' => 'connected'
    ]);
});

// Admin endpoints
Route::prefix('admin')->group(function(){
    Route::get('/dashboard/comprehensive',[AdminController::class,'dashboard']);
    Route::get('/activities',[AdminController::class,'activities']);
    Route::get('/notifications',[AdminController::class,'notifications']);
    Route::get('/users',[AdminController::class,'users']);
    Route::get('/quotes',[AdminController::class,'quotes']);
    Route::get('/diaspora',[AdminController::class,'diaspora']);
    Route::get('/claims',[AdminController::class,'claims']);
    Route::get('/claims/{id}',[AdminController::class,'claimById']);
    Route::put('/claims/{id}/status',[AdminController::class,'updateClaimStatus']);
    Route::delete('/claims/{id}',[AdminController::class,'deleteClaim']);
    Route::get('/outsourcing',[AdminController::class,'outsourcing']);
    Route::get('/payments',[AdminController::class,'payments']);
    Route::get('/metrics', function () {
        return response()->json([
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
    });
});

Route::post('/auth/login',[AuthController::class,'login']);

// Public API endpoints used by frontend
use App\Http\Controllers\ClaimsController;
use App\Http\Controllers\ConsultationsController;
use App\Http\Controllers\QuotesController;
use App\Http\Controllers\OutsourcingController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\DiasporaRequestController;
// Diaspora Requests
Route::post('/diaspora-requests', [DiasporaRequestController::class, 'create']);
Route::get('/diaspora-requests', [DiasporaRequestController::class, 'index']);
Route::get('/diaspora-requests/{id}', [DiasporaRequestController::class, 'show']);

// Claims
Route::post('/claims',[ClaimsController::class,'create']);
Route::get('/claims',[ClaimsController::class,'index']);
Route::get('/claims/{id}',[ClaimsController::class,'show']);
Route::put('/claims/{id}/status',[ClaimsController::class,'updateStatus']);

// Consultations
Route::post('/consultations',[ConsultationsController::class,'create']);
Route::get('/consultations',[ConsultationsController::class,'index']);
Route::get('/consultations/{id}',[ConsultationsController::class,'show']);
Route::put('/consultations/{id}/status',[ConsultationsController::class,'updateStatus']);
Route::post('/consultations/{id}/schedule-meeting',[ConsultationsController::class,'scheduleMeeting']);
Route::post('/consultations/{id}/send-whatsapp-details',[ConsultationsController::class,'sendWhatsAppDetails']);

// Quotes
Route::post('/quotes',[QuotesController::class,'create']);
Route::get('/quotes',[QuotesController::class,'index']);
Route::get('/quotes/{id}',[QuotesController::class,'show']);
Route::put('/quotes/{id}/status',[QuotesController::class,'updateStatus']);
Route::delete('/quotes/{id}',[QuotesController::class,'destroy']);

// Outsourcing
Route::post('/outsourcing',[OutsourcingController::class,'create']);
Route::get('/outsourcing',[OutsourcingController::class,'index']);

// Payments and MPESA
Route::post('/payments/mpesa/stk',[PaymentsController::class,'initiateStk']);
Route::get('/payments/mpesa/status/{checkoutRequestId}',[PaymentsController::class,'checkStkStatus']);
// MPESA callback endpoint (Safaricom will POST here)
Route::post('/payments/mpesa/callback',[PaymentsController::class,'mpesaCallback']);
Route::post('/payments',[PaymentsController::class,'create']);
Route::post('/payments/process/{id}',[PaymentsController::class,'processPayment']);
Route::get('/payments/{id}/status',[PaymentsController::class,'status']);
Route::post('/payments/consultation',[PaymentsController::class,'payForConsultation']);

// Resources & documents
Route::get('/resources/public',[ResourcesController::class,'publicList']);
Route::get('/resources/download/{id}',[ResourcesController::class,'download']);
Route::post('/resources',[ResourcesController::class,'upload']);
Route::get('/documents/claims/{filename}',[DocumentsController::class,'claimDownload']);
Route::get('/documents/quotes/{filename}',[DocumentsController::class,'quoteDownload']);
Route::get('/documents/view/{id}',[DocumentsController::class,'view']);
