<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Security\AESCipher;
use App\Models\Items;
use App\Models\SalesInventory;
use App\Models\Transactions;
use Illuminate\Validation\ValidationException;

class HomeController extends Controller
{
    protected AESCipher $aes;

    public function __construct(AESCipher $aes)
    {
        $this->aes = $aes;
    }

    public function index()
    {
        return Inertia::render('barcode-scanner');
    }

    public function scanBarcode(Request $request)
    {
        $barcode = $request->barcode;

        $product = Items::where('barcode', $barcode)->first();

        if (!$product) {
            return response()->json([
                'name' => null
            ]);
        }

        return response()->json([
            'encrypted_id' => $this->aes->encrypt($product->id),
            'name' => $product->productName,
            'price' => $product->price,
        ], 200);
    }

    public function checkoutProcess(Request $request)
    {
        $items = $request->items;
        $errors = [];
        $totalItem = 0;
        $validItems = [];

        foreach ($items as $item) {
            $product = Items::where('id', $this->aes->decrypt($item['encrypted_id']))->first();

            if (!$product || $product->stocks < $item['quantity']) {
                $errors[] = 'Insufficient stock for ' . ($product?->productName ?? 'Unknown') . 
                            ' (Requested: ' . $item['quantity'] . ', Available: ' . ($product?->stocks ?? 0) . ')';

                return back()->withErrors(['items' => $errors]);
            }

            $validItems[] = [
                'product' => $product,
                'quantity' => $item['quantity'],
            ];
        }

        if(empty($errors)) {
            $transaction = Transactions::create([
                'receiptNumber' => 'RCPT-' . strtoupper(uniqid()),
                'totalPayment' => $request->totalPayment,
            ]);

            foreach ($validItems as $vItem) {
                $product = $vItem['product'];
                $quantity = $vItem['quantity'];

                $product->decrement('stocks', $quantity);

                SalesInventory::create([
                    'items_id' => $product->id,
                    'transactions_id' => $transaction->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                    'barcode' => $product->barcode,
                    'sold' => now(),
                ]);

                $totalItem += $quantity;
            }

            $transaction->update([
                'totalItems' => $totalItem,
            ]);
        }
    
        return back()->with('success', 'Checkout completed.');
    }
}
