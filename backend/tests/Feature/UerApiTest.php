<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UerApiTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user = User::factory()->create();
        $response = $this->getJson('/api/user/' . $user->id);
        $response->assertStatus(200);
    }

    public function test_signup()
    {
        $response = $this->postJson('/api/signup', [
            'name' => 'hoge',
            'email' => 'fuga@example.com',
            'password' => 'var'
        ]);
        $response->assertStatus(200);
        $user = User::where('name', 'hoge')->first();
        $this->assertEquals($user->email, 'fuga@example.com');
        $loginUser = User::find(Auth::id());
        $this->assertEquals($user->email, $loginUser->email);
    }


    public function test_login()
    {
        $user = User::factory()->state(function () {
            return ['password' => Hash::make('hoge')];
        })->create();
        $response = $this->postJson('/api/login', ['email' => $user->email, 'password' => 'hoge']);
        $response->assertStatus(200);
        $loginUser = User::find(Auth::id());
        $this->assertEquals($user->email, $loginUser->email);
    }
}
