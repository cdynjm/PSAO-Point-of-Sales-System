<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transactions extends Model
{
    use SoftDeletes;

    protected $table = 'transactions';
    protected $fillable = ['receiptNumber', 'totalPayment', 'totalItems'];

    public function salesinventories()
    {
        return $this->hasMany(SalesInventory::class, 'transactions_id');
    }
}
