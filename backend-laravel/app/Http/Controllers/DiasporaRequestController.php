<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DiasporaRequest;

class DiasporaRequestController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();
        $diaspora = DiasporaRequest::create($data);
        return response()->json(['success' => true, 'data' => $diaspora, 'message' => 'Diaspora request created']);
    }

    public function index()
    {
        $list = DiasporaRequest::orderBy('created_at', 'desc')->get();
        return response()->json(['success' => true, 'data' => $list]);
    }

    public function show($id)
    {
        $diaspora = DiasporaRequest::find($id);
        if (!$diaspora) {
            return response()->json(['success' => false, 'message' => 'Not found'], 404);
        }
        return response()->json(['success' => true, 'data' => $diaspora]);
    }
}
