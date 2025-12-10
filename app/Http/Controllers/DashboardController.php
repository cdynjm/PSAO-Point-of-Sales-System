<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Security\AESCipher;
use App\Models\Items;
use App\Models\Transactions;

class DashboardController extends Controller
{

    protected AESCipher $aes;

    public function __construct(AESCipher $aes)
    {
        $this->aes = $aes;
    }

    public function index()
    {
        $transactions = Transactions::with('salesInventories')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($t) {
                $t->encrypted_id = $this->aes->encrypt($t->id);
                return $t;
            });

        $years = $transactions->map(function ($t) {
            return date('Y', strtotime($t->created_at));
        })->unique()->values()->toArray();

        $months = $transactions->groupBy(function ($t) {
            return date('Y', strtotime($t->created_at));
        })->map(function ($yearGroup) {
            return $yearGroup->map(function ($t) {
                return date('n', strtotime($t->created_at));
            })
            ->unique()
            ->values()
            ->toArray();
        });

        return Inertia::render('dashboard', [
            'transactions' => $transactions,
            'years' => $years,
            'months' => $months,
        ]);
    }

}
