<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use \App\Models\State;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\Sanctum;
use App\Models\OutputText;

class InitialValueApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_index()
    {
        $state1 = State::create(['name' => 'hoo']);
        $state2 = State::create(['name' => 'bar']);
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);
        $taskValue = [
            'user_id' => $user->id,
            'title' => "hoge",
            'detail' => "fugafuga",
            'state_id' => $state1->id
        ];
        $task = Task::create($taskValue);
        $outputTextValue = [
            'user_id' => $user->id,
            'text' => "hoge",
            'state_id' => $state2->id
        ];
        $outputText = OutputText::create($outputTextValue);
        $response = $this->getJson('/api/initialValue');
        $response->assertStatus(200);
        $response->assertJson([
            "outputTexts" => [0 => $outputTextValue],
            "tasks" => [0 => $taskValue],
            "states" => [0 => ["name" => $state1->name], 1 => ["name" => $state2->name]]
        ]);
    }
}
