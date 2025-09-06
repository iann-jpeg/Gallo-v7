<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Services\MpesaService;

class PaymentsController extends Controller
{
    protected $mpesa;

    public function __construct()
    {
        $this->mpesa = new MpesaService();
    }

    // Initiate STK push using MpesaService
    public function initiateStk(Request $request)
    {
        $phone = $request->input('phone');
        $amount = $request->input('amount');
        $description = $request->input('description', 'Payment');

        // Create payment record with status pending
        $payment = Payment::create([ 'amount'=>$amount, 'currency'=>'KES', 'method'=>'mpesa', 'status'=>'pending' ]);

        $res = $this->mpesa->initiateStkPush($phone, $amount, 'Galloways', $description);
        if (!$res['success']) {
            return response()->json(['success'=>false,'message'=>$res['message'] ?? 'MPESA request failed','raw'=>$res['raw'] ?? null], 500);
        }

        // Attempt to store checkout id if present
        if (isset($res['data']['CheckoutRequestID'])) {
            $payment->reference = $res['data']['CheckoutRequestID'];
            $payment->metadata = $res['data'];
            $payment->save();
        }

        return response()->json(['success'=>true,'data'=>$res['data'],'message'=>'STK push initiated']);
    }

    // Endpoint to receive MPESA callback
    public function mpesaCallback(Request $request)
    {
        $payload = $request->getContent();
        $data = json_decode($payload, true);

        // Basic safety check
        if (!$data) return response()->json(['success'=>false,'message'=>'Invalid payload'],400);

        // Try to extract CheckoutRequestID and result
        $checkoutId = $data['Body']['stkCallback']['CheckoutRequestID'] ?? null;
        $resultCode = $data['Body']['stkCallback']['ResultCode'] ?? null;
        $resultDesc = $data['Body']['stkCallback']['ResultDesc'] ?? null;

        if ($checkoutId) {
            $payment = Payment::where('reference', $checkoutId)->first();
            if ($payment) {
                $payment->status = $resultCode === 0 ? 'completed' : 'failed';
                $payment->metadata = array_merge($payment->metadata ?? [], ['mpesa_callback' => $data]);
                $payment->save();
            }
        }

        return response()->json(['success'=>true,'message'=>'Callback processed']);
    }

    // Check STK status by checkoutRequestId
    public function checkStkStatus($checkoutRequestId)
    {
        $payment = Payment::where('reference',$checkoutRequestId)->first();
        if(!$payment) return response()->json(['success'=>false,'message'=>'Not found'],404);
        return response()->json(['success'=>true,'data'=>['status'=>$payment->status,'reference'=>$payment->reference]]);
    }

    public function create(Request $request)
    {
        $data = $request->all();
        $payment = Payment::create($data);
        return response()->json(['success'=>true,'data'=>$payment,'message'=>'Payment recorded']);
    }

    public function processPayment($id, Request $request)
    {
        $payment = Payment::find($id);
        if(!$payment) return response()->json(['success'=>false,'message'=>'Not found'],404);
        $payment->status = $request->input('status', 'completed');
        $payment->save();
        return response()->json(['success'=>true,'data'=>$payment,'message'=>'Payment processed']);
    }

    public function status($id)
    {
        $payment = Payment::find($id);
        if(!$payment) return response()->json(['success'=>false,'message'=>'Not found'],404);
        return response()->json(['success'=>true,'data'=>['status'=>$payment->status]]);
    }

    public function payForConsultation(Request $request)
    {
        $data = $request->all();
        $payment = Payment::create($data);
        return response()->json(['success'=>true,'data'=>$payment,'message'=>'Consultation payment recorded']);
    }
}
