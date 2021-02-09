<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(Auth::id());
        $tasks = $user->tasks()->get()->toJson();

        return $tasks;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
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
            'title' => ['required', 'string'],
            'detail' => ['required', 'string'],
            'state_id' => ['required', 'integer']
        ]);
        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $validatedRequest['title'],
            'detail' => $validatedRequest['detail'],
            'state_id' => $validatedRequest['state_id']
        ]);
        return response()->json(['id' => $task->id], 200);
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
        $validatedRequest = $request->validate([
            'title' => ['required', 'string'],
            'detail' => ['required', 'string'],
            'state_id' => ['required', 'integer']
        ]);
        $task = Task::find($id);
        $this->authorize('update', $task);
        $task->update([
            'title' => $validatedRequest['title'],
            'detail' => $validatedRequest['detail'],
            'state_id' => $validatedRequest['state_id']
        ]);
    }

    public function updateState(Request $request, $id)
    {
        $validatedRequest = $request->validate([
            'state' => ['required', 'integer']
        ]);
        $task = Task::find($id);
        $this->authorize('update', $task);
        $task->update([
            'state_id' => $validatedRequest['state']
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
        //
        $task = Task::find($id);
        $this->authorize('delete', $task);
        $task->delete();
    }
}
