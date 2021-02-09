<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OutputText extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'state_id',
        'text'
    ];

    function user()
    {
        return $this->belongsTo(User::class);
    }
    function state()
    {
        return $this->belongsTo(State::class);
    }
}
