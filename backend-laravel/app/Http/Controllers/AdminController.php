<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Claim;
use App\Models\Quote;
use App\Models\Consultation;
use App\Models\DiasporaRequest;
use App\Models\OutsourcingRequest;
use App\Models\Payment;

class AdminController extends Controller
{
    public function dashboard()
    {
        // minimal aggregated stats
        $totalUsers = User::count();
        // other counts will be zero placeholders until models/migrations added
        $data = [
            'totalUsers' => $totalUsers,
            'totalClaims' => 0,
            'totalQuotes' => 0,
            'totalConsultations' => 0,
            'totalOutsourcingRequests' => 0,
            'totalDiasporaRequests' => 0,
            'pendingClaims' => 0,
            'pendingConsultations' => 0,
        ];
        return response()->json(['success' => true, 'message' => 'Dashboard stats retrieved successfully', 'data' => $data]);
    }

    public function users(Request $request)
    {
        $page = max(1, (int)$request->get('page', 1));
        $limit = max(1, (int)$request->get('limit', 50));
        $users = User::orderBy('id', 'desc')->skip(($page-1)*$limit)->take($limit)->get(['id','name','email','role','created_at','updated_at']);
        $total = User::count();
        $pagination = ['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>ceil($total/$limit)];
        return response()->json(['success'=>true,'message'=>'Users retrieved successfully','data'=>['data'=>$users,'pagination'=>$pagination]]);
    }

    public function activities(Request $request)
    {
        // Build activities from recent claims, consultations, outsourcing, payments
        $activities = [];
        $recentClaims = Claim::orderBy('created_at','desc')->take(10)->get();
        foreach ($recentClaims as $c) {
            $activities[] = ['id' => (string)$c->id, 'type' => 'claim', 'createdAt' => $c->created_at->toIso8601String(), 'raw' => $c];
        }

        $recentConsults = Consultation::orderBy('created_at','desc')->take(10)->get();
        foreach ($recentConsults as $c) {
            $activities[] = ['id' => (string)$c->id, 'type' => 'consultation', 'createdAt' => $c->created_at->toIso8601String(), 'raw' => $c];
        }

        $recentOuts = OutsourcingRequest::orderBy('created_at','desc')->take(10)->get();
        foreach ($recentOuts as $o) {
            $activities[] = ['id' => (string)$o->id, 'type' => 'outsourcing', 'createdAt' => $o->created_at->toIso8601String(), 'raw' => $o];
        }

        // Optionally include recent payments
        $recentPayments = Payment::orderBy('created_at','desc')->take(10)->get();
        foreach ($recentPayments as $p) {
            $activities[] = ['id' => (string)$p->id, 'type' => 'payment', 'createdAt' => $p->created_at->toIso8601String(), 'raw' => $p];
        }

        return response()->json(['success' => true, 'data' => ['activities' => $activities], 'message' => 'Recent activities retrieved']);
    }

    public function notifications(Request $request)
    {
        return response()->json(['success'=>true,'message'=>'Notifications retrieved successfully','data'=>['data'=>[],'pagination'=>['page'=>1,'limit'=>50,'total'=>0]]]);
    }

    public function quotes(Request $request)
    {
    $page = max(1, (int)$request->get('page', 1));
    $limit = max(1, (int)$request->get('limit', 50));
    $quotes = Quote::orderBy('created_at','desc')->skip(($page-1)*$limit)->take($limit)->get();
    $total = Quote::count();
    $pagination = ['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>ceil($total/$limit)];
    return response()->json(['success'=>true,'message'=>'Quotes retrieved successfully','data'=>['data'=>$quotes,'pagination'=>$pagination]]);
    }

    public function diaspora(Request $request)
    {
        $page = max(1, (int)$request->get('page', 1));
        $limit = max(1, (int)$request->get('limit', 50));
        $list = DiasporaRequest::orderBy('created_at','desc')->skip(($page-1)*$limit)->take($limit)->get();
        $total = DiasporaRequest::count();
        $pagination = ['page'=>$page,'limit'=>$limit,'total'=>$total,'totalPages'=>ceil($total/$limit)];
        return response()->json(['success'=>true,'message'=>'Diaspora requests retrieved successfully','data'=>['data'=>$list,'pagination'=>$pagination]]);

    }

    // Claims endpoints
    public function claims(Request $request){
        $page = max(1, (int)$request->get('page', 1));
        $limit = max(1, (int)$request->get('limit', 50));
        $list = Claim::orderBy('created_at','desc')->skip(($page-1)*$limit)->take($limit)->get();
        $total = Claim::count();
        $pagination = ['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>ceil($total/$limit)];
        return response()->json(['success'=>true,'message'=>'Claims retrieved successfully','data'=>['claims'=>$list,'pagination'=>$pagination]]);
    }

    public function claimById($id){
        $claim = Claim::find($id);
        if(!$claim) return response()->json(['success'=>false,'message'=>'Claim not found'],404);
        return response()->json(['success'=>true,'data'=>$claim,'message'=>'Claim retrieved successfully']);
    }

    public function updateClaimStatus($id, Request $request){
        $status = $request->input('status');
        $claim = Claim::find($id);
        if(!$claim) return response()->json(['success'=>false,'message'=>'Claim not found'],404);
        $claim->status = $status;
        $claim->save();
        return response()->json(['success'=>true,'data'=>$claim,'message'=>'Claim status updated']);
    }

    public function deleteClaim($id){
        $claim = Claim::find($id);
        if(!$claim) return response()->json(['success'=>false,'message'=>'Claim not found'],404);
        $claim->delete();
        return response()->json(['success'=>true,'message'=>'Claim deleted']);
    }

    public function outsourcing(Request $request){
        $page = max(1, (int)$request->get('page', 1));
        $limit = max(1, (int)$request->get('limit', 50));
        $list = OutsourcingRequest::orderBy('created_at','desc')->skip(($page-1)*$limit)->take($limit)->get();
        $total = OutsourcingRequest::count();
        $pagination = ['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>ceil($total/$limit)];
        return response()->json(['success'=>true,'message'=>'Outsourcing retrieved successfully','data'=>['requests'=>$list,'pagination'=>$pagination]]);
    }

    public function payments(Request $request){
        $page = max(1, (int)$request->get('page', 1));
        $limit = max(1, (int)$request->get('limit', 50));
        $list = Payment::orderBy('created_at','desc')->skip(($page-1)*$limit)->take($limit)->get();
        $total = Payment::count();
        $pagination = ['page'=>$page,'limit'=>$limit,'total'=>$total,'pages'=>ceil($total/$limit)];
        return response()->json(['success'=>true,'message'=>'Payments retrieved successfully','data'=>['data'=>$list,'pagination'=>$pagination]]);
}

}
