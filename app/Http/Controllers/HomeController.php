<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Security\AESCipher;
use App\Models\Items;
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
            'name' => $product->productName,
            'price' => $product->price,
        ], 200);
    }

    public function checkoutProcess(Request $request)
    {
        $items = $request->items;
        $errors = [];

        foreach ($items as $item) {
            $product = Items::where('barcode', $item['barcode'])->first();

            if ($product->stocks < $item['quantity']) {
                $errors[] = 'Insufficient stock for ' . $product->productName . 
                            ' (Requested: ' . $item['quantity'] . ', Available: ' . $product->stocks . ')';
                continue;
            }

            $product->decrement('stocks', $item['quantity']);
        }
        
        if (!empty($errors)) {
            return back()->withErrors(['items' => $errors]);
        }

        return back()->with('success', 'Checkout completed.');
    }
}
