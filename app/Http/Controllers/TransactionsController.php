<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;
use Inertia\Inertia;
use App\Http\Controllers\Security\AESCipher;

class TransactionsController extends Controller
{
    protected AESCipher $aes;

    public function __construct(AESCipher $aes)
    {
        $this->aes = $aes;
    }

    public function index(Request $request)
    {
        $year = $request->year ?? date('Y');
        $month = $request->month ?? date('n');

        $transactions = Transactions::with('salesInventories')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($t) {
                $t->encrypted_id = $this->aes->encrypt($t->id);
                return $t;
            });

        $years = Transactions::selectRaw("YEAR(created_at) as year")
            ->distinct()
            ->pluck('year');

        $months = Transactions::selectRaw("YEAR(created_at) as year, MONTH(created_at) as month")
            ->get()
            ->groupBy('year')
            ->map(fn ($rows) => $rows->pluck('month')->unique()->values());

        return Inertia::render('transactions', [
            'transactions' => $transactions,
            'years' => $years,
            'months' => $months,
            'initialYear' => $year,
            'initialMonth' => $month,
        ]);
    }

    public function viewTransaction(Request $request)
    {
        $id = $this->aes->decrypt($request->encrypted_id);

        $transaction = Transactions::with('salesinventories.item')
            ->where('id', $id)
            ->firstOrFail();
        
        $transaction->salesinventories->map(function ($sale) {
            $sale->encrypted_id = $this->aes->encrypt($sale->id);
            return $sale;
        });

        return Inertia::render('view-transaction-inventory', [
            'encrypted_id' => $request->encrypted_id,
            'transaction' => $transaction
        ]);
    }
}
