<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validatedRequest = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => 'required'
        ]);
        if ($validatedRequest->fails()) {
            return response()->json(["message" => "validationエラー"], 400);
        }
        $credentials = [
            'email' => $request['email'],
            'password' => $request['password']
        ];
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([], 200);
        }
        return response()->json([], 401);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Logged out'], 200);
    }
    public function signup(Request $request)
    {
        $validatedRequest = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'email' => ['required', 'string'],
            'password' => ['required', 'string']
        ]);

        if ($validatedRequest->fails()) {
            return response()->json(["message" => "validationエラー"], 400);
        }
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);
        $credentials = [
            'email' => $request['email'],
            'password' => $request['password']
        ];
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json([], 200);
        }
        throw ValidationException::withMessages([]);
    }

    public function isAuthenticated(Request $request)
    {
        if (Auth::check()) {
            $user = User::find(Auth::id());
            return response()->json(["isAuthenticated" => true, "userName" => $user->name], 200);
        } else {
            return response()->json(["isAuthenticated" => false], 401);
        }
    }
}
