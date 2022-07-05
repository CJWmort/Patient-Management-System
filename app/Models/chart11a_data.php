<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class chart11a_data extends Model
{
    use HasFactory;
    protected $fillable = ['a_inccidentDate'];
    protected $primaryKey = 'a_inccidentDate';
    public $timestamps = false;
}
