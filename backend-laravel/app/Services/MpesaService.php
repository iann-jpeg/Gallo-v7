<?php

namespace App\Services;

class MpesaService
{
    protected $env;

    public function __construct()
    {
        $this->env = env('MPESA_ENV', 'sandbox');
    }

    protected function baseUrl()
    {
        return $this->env === 'production' ? 'https://api.safaricom.co.ke' : 'https://sandbox.safaricom.co.ke';
    }

    public function getAccessToken()
    {
        $consumerKey = env('MPESA_CONSUMER_KEY');
        $consumerSecret = env('MPESA_CONSUMER_SECRET');
        if (!$consumerKey || !$consumerSecret) {
            return ['success' => false, 'message' => 'MPESA credentials not configured'];
        }

        $url = $this->baseUrl() . '/oauth/v1/generate?grant_type=client_credentials';

        $credentials = base64_encode($consumerKey . ':' . $consumerSecret);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Basic ' . $credentials]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
            return ['success' => false, 'message' => $err];
        }

        $data = json_decode($response, true);
        if (!isset($data['access_token'])) {
            return ['success' => false, 'message' => 'Failed to obtain access token', 'raw' => $data];
        }

        return ['success' => true, 'access_token' => $data['access_token']];
    }

    public function initiateStkPush($phone, $amount, $accountRef = 'Payment', $description = 'Payment')
    {
        $tokenRes = $this->getAccessToken();
        if (!$tokenRes['success']) return $tokenRes;

        $accessToken = $tokenRes['access_token'];
        $shortcode = env('MPESA_SHORTCODE');
        $passkey = env('MPESA_PASSKEY');
        $callbackUrl = env('MPESA_CALLBACK_URL', env('APP_URL') . '/api/payments/mpesa/callback');

        if (!$shortcode || !$passkey) {
            return ['success' => false, 'message' => 'MPESA shortcode or passkey missing'];
        }

        $timestamp = date('YmdHis');
        $password = base64_encode($shortcode . $passkey . $timestamp);

        $payload = [
            'BusinessShortCode' => $shortcode,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'TransactionType' => 'CustomerPayBillOnline',
            'Amount' => (int)$amount,
            'PartyA' => $this->formatPhone($phone),
            'PartyB' => $shortcode,
            'PhoneNumber' => $this->formatPhone($phone),
            'CallBackURL' => $callbackUrl,
            'AccountReference' => $accountRef,
            'TransactionDesc' => $description,
        ];

        $url = $this->baseUrl() . '/mpesa/stkpush/v1/processrequest';

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $accessToken,
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) return ['success' => false, 'message' => $err];

        $data = json_decode($response, true);
        if (!$data) return ['success' => false, 'message' => 'Invalid response from MPESA', 'raw' => $response];

        // Typical response contains CheckoutRequestID and MerchantRequestID
        return ['success' => true, 'data' => $data];
    }

    protected function formatPhone($phone)
    {
        // Ensure phone in 2547XXXXXXXX format
        $p = preg_replace('/[^0-9]/', '', $phone);
        if (strlen($p) === 10 && strpos($p, '0') === 0) {
            return '254' . substr($p, 1);
        }
        if (strlen($p) === 12 && strpos($p, '254') === 0) {
            return $p;
        }
        return $p; // best effort
    }
}
