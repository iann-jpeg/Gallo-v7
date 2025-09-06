<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Claim;
use Illuminate\Support\Facades\Storage;

class ClaimsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();

        $documents = [];
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $path = $file->store('uploads', 'local');
                $documents[] = $path;
            }
        }

        if (!empty($documents)) $data['documents'] = $documents;

        $claim = Claim::create($data);
        return response()->json(['success'=>true,'data'=>$claim,'message'=>'Claim created']);
    }

    public function index()
    {
        $claims = Claim::orderBy('created_at','desc')->get();
        return response()->json(['success'=>true,'data'=>['data'=>$claims,'pagination'=>['page'=>1,'limit'=>count($claims),'total'=>count($claims)]]]);
    }

    public function show($id)
    {
        $claim = Claim::find($id);
        if(!$claim) return response()->json(['success'=>false,'message'=>'Not found'],404);
        return response()->json(['success'=>true,'data'=>$claim]);
    }

    public function updateStatus($id, Request $request)
    {
        $claim = Claim::find($id);
        if(!$claim) return response()->json(['success'=>false,'message'=>'Not found'],404);
        $claim->status = $request->input('status');
        $claim->save();
        return response()->json(['success'=>true,'data'=>$claim,'message'=>'Status updated']);
    }
}
