<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $states = ["未処理", "処理中", "完了"];
        foreach ($states as $stateName) {
            $state = new \App\Models\State();
            $state->name = $stateName;
            $state->save();
        }
        \App\Models\User::factory()->has(
            \App\Models\Task::factory()->count(3)
                ->state(function ($attributes, \App\Models\User $user) {
                    return ['user_id' => $user->id];
                })
        )->has(
            \App\Models\OutputText::factory()->count(3)
                ->state(function ($attributes, \App\Models\User $user) {
                    return ['user_id' => $user->id];
                })
        )->create();
    }
}
