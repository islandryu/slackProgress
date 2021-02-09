<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Task;
use Laravel\Sanctum\Sanctum;
use App\Models\User;
use \App\Models\State;


class TaskApiTest extends TestCase
{
    use RefreshDatabase;
    public function setUp(): void
    {
        parent::setUp();
        $this->state = State::create(['name' => 'hoo']);
    }
    public function test_store()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);
        $response = $this->postJson('/api/task', ['title' => 'hoge', 'detail' => 'fuga', 'state_id' => $this->state->id]);
        $task = $user->tasks()->first();
        $response->assertStatus(200);
        $this->assertEquals($task->title, 'hoge');
        $this->assertEquals($task->detail, 'fuga');
        $content = $response->getData();
        $this->assertIsInt($content->id);
    }
    public function test_delete()
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'hoge',
            'detail' => 'fuga',
            'state_id' => $this->state->id
        ]);
        Sanctum::actingAs($user, ['*']);
        $response = $this->deleteJson('api/task/' . $task->id);
        $response->assertStatus(200);
        $task = Task::find($task->id);
        $this->assertNull($task);
    }
    public function test_update()
    {
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'hoge',
            'detail' => 'hoge',
            'state_id' => $this->state->id
        ]);
        Sanctum::actingAs($user, ['*']);
        $response = $this->putJson('api/task/' . $task->id, [
            'title' => 'fuga',
            'detail' => 'fuga',
            'state_id' => $this->state->id
        ]);
        $response->assertStatus(200);
        $task = Task::find($task->id);
        $this->assertEquals($task->title, 'fuga');
    }
    public function test_index()
    {
        $stateId = $this->state->id;
        $user = User::factory()->has(
            Task::factory()->state(function ($attributes, User $user) use (&$stateId) {
                return [
                    'user_id' => $user->id,
                    'title' => 'hoge',
                    'state_id' => $stateId
                ];
            })
        )->create();
        Sanctum::actingAs($user, ['*']);
        $response = $this->get('/api/task');
        $response->assertStatus(200)->assertJson([0 => [
            'title' => 'hoge'
        ]]);
    }
    public function test_auth()
    {
        $legitimateUser = User::factory()->create();
        $task = Task::create([
            'user_id' => $legitimateUser->id,
            'title' => 'hoge',
            'detail' => 'hoge',
            'state_id' => $this->state->id
        ]);
        $unauthorizedUser = User::factory()->create();
        Sanctum::actingAs($unauthorizedUser, ['*']);
        $response = $this->deleteJson('api/task/' . $task->id);
        $response->assertStatus(403);
        $response = $this->putJson('api/task/' . $task->id, [
            'title' => 'fuga',
            'detail' => 'fuga',
            'state_id' => $this->state->id
        ]);
        $response->assertStatus(403);
    }
    public function test_updateState()
    {
        $newState = State::create(['name' => 'bar']);
        $user = User::factory()->create();
        $task = Task::create([
            'user_id' => $user->id,
            'title' => 'hoge',
            'detail' => 'hoge',
            'state_id' => $this->state->id
        ]);
        Sanctum::actingAs($user, ['*']);
        $response = $this->putJson('api/task/' . $task->id . '/state', [
            'state' => $newState->id
        ]);
        $response->assertStatus(200);
        $task = Task::find($task->id);
        $this->assertEquals($task['state_id'], $newState->id);
    }
}
