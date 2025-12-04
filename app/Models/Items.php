<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Items extends Model
{
    use SoftDeletes;

    protected $table = 'items';
    protected $fillable = ['productName', 'stocks', 'price', 'barcode'];
}
