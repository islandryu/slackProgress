<?php

namespace App\Http\Controllers;

use App\Models\OutputText;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class OutputTextController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(Auth::id());
        $outputTexts = $user->outputTexts()->get()->toJson();
        return $outputTexts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validatedRequest = $request->validate([
            'text' => ['required', 'string'],
            'state_id' => ['required', 'integer']
        ]);
        $outputText = OutputText::create([
            'user_id' => Auth::id(),
            'text' => $validatedRequest['text'],
            'state_id' => $validatedRequest['state_id']
        ]);
        return response()->json(["id" => $outputText->id], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validatedRequest = $request->validate([
            'text' => ['required', 'string'],
            'state_id' => ['required', 'integer']
        ]);
        $outputText = OutputText::find($id);
        $this->authorize('update', $outputText);
        $outputText->update([
            'text' => $validatedRequest['text'],
            'state_id' => $validatedRequest['state_id']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $outputText = OutputText::find($id);
        $this->authorize('delete', $outputText);
        $outputText->delete();
    }
}
