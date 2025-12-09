<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesInventory extends Model
{
    use SoftDeletes;

    protected $table = 'sales_inventory';
    protected $fillable = ['productName', 'quantity', 'price', 'barcode', 'sold_at'];
}
