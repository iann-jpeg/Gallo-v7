<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quote;
use Illuminate\Support\Facades\Storage;

class QuotesController extends Controller
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

        $quote = Quote::create($data);
        return response()->json(['success'=>true,'data'=>$quote,'message'=>'Quote created']);
    }

    public function index()
    {
        $list = Quote::orderBy('created_at','desc')->get();
        return response()->json(['success'=>true,'data'=>['data'=>$list,'pagination'=>['page'=>1,'limit'=>count($list),'total'=>count($list)]]]);
    }

    public function show($id)
    {
        $quote = Quote::find($id);
        if(!$quote) return response()->json(['success'=>false,'message'=>'Not found'],404);
        return response()->json(['success'=>true,'data'=>$quote]);
    }

    public function updateStatus($id, Request $request)
    {
        $quote = Quote::find($id);
        if(!$quote) return response()->json(['success'=>false,'message'=>'Not found'],404);
        $quote->status = $request->input('status');
        $quote->save();
        return response()->json(['success'=>true,'data'=>$quote,'message'=>'Status updated']);
    }

    public function destroy($id)
    {
        $quote = Quote::find($id);
        if(!$quote) return response()->json(['success'=>false,'message'=>'Not found'],404);
        $quote->delete();
        return response()->json(['success'=>true,'message'=>'Quote deleted']);
    }
}
