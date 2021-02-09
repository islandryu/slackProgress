<?php

namespace Database\Factories;

use App\Models\OutputText;
use Illuminate\Database\Eloquent\Factories\Factory;

class OutputTextFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OutputText::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'text' => $this->faker->text,
            'state_id' => 1
        ];
    }
    public function changeState1()
    {
        return $this->state(function () {
            return ['state_id' => 1];
        });
    }

    public function changeState2()
    {
        return $this->state(function () {
            return ['state_id' => 2];
        });
    }

    public function changeState3()
    {
        return $this->state(function () {
            return ['state_id' => 3];
        });
    }
}
