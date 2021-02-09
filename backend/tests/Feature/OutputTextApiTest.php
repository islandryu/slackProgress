<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use \App\Models\State;
use \App\Models\User;
use \App\Models\OutputText;
use Laravel\Sanctum\Sanctum;

class OutputTextApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->state = State::create(['name' => 'hoo']);
    }

    public function test_index()
    {
        $stateId = $this->state->id;
        $user = User::factory()->has(
            OutputText::factory()->state(function ($attributes, User $user) use (&$stateId) {
                return [
                    'user_id' => $user->id,
                    'state_id' => $stateId,
                    'text' => 'hoge'
                ];
            })
        )->create();
        Sanctum::actingAs($user, ['*']);
        $response = $this->get('/api/outputText');
        $response->assertStatus(200)->assertJson([0 => [
            'text' => 'hoge'
        ]]);
    }
    public function test_store()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user, ['*']);
        $response = $this->postJson('/api/outputText', ['text' => 'hoge', 'state_id' => $this->state->id]);
        $outputText = $user->outputTexts()->first();
        $response->assertStatus(200);
        $this->assertEquals($outputText->text, 'hoge');
        $response->assertJson(['id' => $outputText->id]);
    }
    public function test_delete()
    {
        $user = User::factory()->create();
        $outputText = OutputText::create([
            'user_id' => $user->id,
            'state_id' => $this->state->id,
            'text' => 'hoge'
        ]);
        Sanctum::actingAs($user, ['*']);
        $response = $this->deleteJson('api/outputText/' . $outputText->id);
        $response->assertStatus(200);
        $outputText = OutputText::find($outputText->id);
        $this->assertNull($outputText);
    }

    public function test_update()
    {
        $user = User::factory()->create();
        $outputText = OutputText::create([
            'user_id' => $user->id,
            'text' => 'hoge',
            'state_id' => $this->state->id
        ]);
        Sanctum::actingAs($user, ['*']);
        $response = $this->putJson('api/outputText/' . $outputText->id, [
            'text' => 'fuga',
            'state_id' => $this->state->id
        ]);
        $response->assertStatus(200);
        $outputText = OutputText::find($outputText->id);
        $this->assertEquals($outputText->text, 'fuga');
    }

    public function test_auth()
    {
        $legitimateUser = User::factory()->create();
        $outputText = OutputText::create([
            'user_id' => $legitimateUser->id,
            'text' => 'hoge',
            'state_id' => $this->state->id
        ]);
        $unauthorizedUser = User::factory()->create();
        Sanctum::actingAs($unauthorizedUser, ['*']);
        $response = $this->deleteJson('api/outputText/' . $outputText->id);
        $response->assertStatus(403);
        $response = $this->putJson('api/outputText/' . $outputText->id, [
            'state_id' => $this->state->id,
            'text' => 'hoge'
        ]);
        $response->assertStatus(403);
    }
}
