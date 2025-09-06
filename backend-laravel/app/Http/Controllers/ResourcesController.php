<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResourcesController extends Controller
{
    public function publicList()
    {
        return response()->json(['success'=>true,'data'=>['data'=>[],'pagination'=>['page'=>1,'limit'=>0,'total'=>0]]]);
    }

    public function download($id)
    {
        return response()->json(['success'=>false,'message'=>'Download not implemented'],404);
    }

    public function upload(Request $request)
    {
        return response()->json(['success'=>true,'message'=>'Uploaded (simulated)']);
    }
}
