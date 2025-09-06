<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentsController extends Controller
{
    public function claimDownload($filename)
    {
        $path = 'uploads/' . $filename;
        if (!Storage::exists($path)) {
            return response()->json(['success' => false, 'message' => 'File not found'], 404);
        }
        $stream = Storage::get($path);
        $mime = Storage::mimeType($path) ?: 'application/octet-stream';
        return response($stream, 200)
            ->header('Content-Type', $mime)
            ->header('Content-Disposition', 'attachment; filename="' . basename($path) . '"');
    }

    public function quoteDownload($filename)
    {
        return $this->claimDownload($filename);
    }

    public function view($id)
    {
        // Not implemented: view by id would require mapping id->filename stored in DB
        return response()->json(['success' => false, 'message' => 'Not implemented'], 404);
    }
}
