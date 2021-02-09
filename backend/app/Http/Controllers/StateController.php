<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\State;

class StateController extends Controller
{
    //
    public function index()
    {
        $states = State::all();
        return $states->toJson();
    }
}
