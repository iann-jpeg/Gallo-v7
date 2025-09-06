<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consultation;

class ConsultationsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();
        $consult = Consultation::create($data);
        return response()->json(['success'=>true,'data'=>$consult,'message'=>'Consultation created']);
    }

    public function index()
    {
        $list = Consultation::orderBy('created_at','desc')->get();
        return response()->json(['success'=>true,'data'=>['data'=>$list,'pagination'=>['page'=>1,'limit'=>count($list),'total'=>count($list)]]]);
    }

    public function show($id)
    {
        $consult = Consultation::find($id);
        if(!$consult) return response()->json(['success'=>false,'message'=>'Not found'],404);
        return response()->json(['success'=>true,'data'=>$consult]);
    }

    public function updateStatus($id, Request $request)
    {
        $consult = Consultation::find($id);
        if(!$consult) return response()->json(['success'=>false,'message'=>'Not found'],404);
        $consult->status = $request->input('status');
        $consult->save();
        return response()->json(['success'=>true,'data'=>$consult,'message'=>'Status updated']);
    }

    public function scheduleMeeting($id, Request $request)
    {
        $consult = Consultation::find($id);
        if(!$consult) return response()->json(['success'=>false,'message'=>'Not found'],404);
        $consult->meeting_link = $request->input('meetingLink');
        $consult->scheduled_at = $request->input('meetingDate') . ' ' . $request->input('meetingTime');
        $consult->duration = $request->input('duration');
        $consult->save();
        return response()->json(['success'=>true,'data'=>$consult,'message'=>'Meeting scheduled']);
    }

    public function sendWhatsAppDetails($id, Request $request)
    {
        // placeholder - integrate WhatsApp API later
        return response()->json(['success'=>true,'message'=>'WhatsApp details queued']);
    }
}
