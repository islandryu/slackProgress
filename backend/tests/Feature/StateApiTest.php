<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use \App\Models\State;

class StateApiTest extends TestCase
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
        $response = $this->getJson('api/state');
        $response->assertStatus(200);
        $response->assertJson([
            0 => [
                "name" => "hoo"
            ],
            1 => [
                "name" => "bar"
            ]
        ]);
    }
}
