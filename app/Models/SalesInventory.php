<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SalesInventory extends Model
{
    use SoftDeletes;

    protected $table = 'sales_inventory';
    protected $fillable = ['items_id', 'transactions_id', 'quantity', 'price', 'barcode', 'sold'];

    public function item()
    {
        return $this->belongsTo(Items::class, 'items_id');
    }

    public function transaction()
    {
        return $this->belongsTo(Transactions::class, 'transactions_id');
    }
}
