<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OutsourcingRequest;

class OutsourcingController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();
        $req = OutsourcingRequest::create($data);
        return response()->json(['success'=>true,'data'=>$req,'message'=>'Outsourcing request created']);
    }

    public function index()
    {
        $list = OutsourcingRequest::orderBy('created_at','desc')->get();
        return response()->json(['success'=>true,'data'=>['data'=>$list,'pagination'=>['page'=>1,'limit'=>count($list),'total'=>count($list)]]]);
    }
}
