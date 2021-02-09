<?php

namespace App\Http\Controllers;

use App\Models\State;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class InitialValueController extends Controller
{
    //
    public function index()
    {
        $user = User::find(Auth::id());
        $states = State::all()->toJson();
        $tasks = $user->tasks()->get()->toJson();
        $res = [
            "outputTexts" => json_decode($user->outputTexts()->get()->toJson()),
            "states" => json_decode($states),
            "tasks" => json_decode($tasks),
        ];
        return response()->json($res, 200);
    }
}
