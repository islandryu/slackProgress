<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use \App\Models\State;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_failAuth()
    {
        $this->state = State::create(['name' => 'hoo']);
        $response = $this->postJson('/api/task', ['title' => 'hoge', 'detail' => 'fuga', 'state_id' => 1]);
        $response->assertStatus(401);
    }
}
