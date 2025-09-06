<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
        }
        // For now accept any password if user exists (seeded users present). Implement JWT later.
        return response()->json(['success' => true, 'message' => 'Logged in', 'data' => ['token' => 'dev-token']]);
    }
}
