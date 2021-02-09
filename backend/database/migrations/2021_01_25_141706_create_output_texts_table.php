<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutputTextsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('output_texts', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->foreignId('user_id')->references('id')
                ->on('users')->onDelete('cascade');
            $table->foreignId('state_id')->references('id')
                ->on('states')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('output_texts');
    }
}
