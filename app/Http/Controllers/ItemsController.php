<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Security\AESCipher;

use App\Models\Items;

class ItemsController extends Controller
{
    protected AESCipher $aes;

    public function __construct(AESCipher $aes)
    {
        $this->aes = $aes;
    }

    public function index()
    {
        $items = Items::orderBy('productName', 'asc')->get()->map(function ($item) {
            $item->encrypted_id = $this->aes->encrypt($item->id);
            return $item;
        });

        return Inertia::render('items', [
            'items' => $items,
        ]);
    }

    public function store(Request $request)
    {
        Items::create([
            'productName' => $request->productName,
            'stocks' => $request->stocks,
            'price' => $request->price,
            'barcode' => $request->barcode,
        ]);
    }

    public function update(Request $request)
    {
        $id = $this->aes->decrypt($request->encrypted_id);
        $item = Items::where('id', $id)->update([
                'productName' => $request->productName,
                'stocks' => $request->stocks,
                'price' => $request->price,
                'barcode' => $request->barcode,
            ]);
        
    }

    public function destroy(Request $request)
    {
        $id = $this->aes->decrypt($request->encrypted_id);
        Items::where('id', $id)->delete();
    }
}
