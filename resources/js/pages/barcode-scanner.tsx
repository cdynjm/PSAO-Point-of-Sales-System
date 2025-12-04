import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import { LucideShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function BarcodeScannerPage() {
    const [barcode, setBarcode] = useState('');

    return (
        <>
            <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <img src="/pos-logo.png" className="h-10 w-auto" alt="POS Logo" />
                        <div className="">
                            <div className="text-lg font-semibold text-[#1b1b18]">POS - PSAO</div>
                            <div className="text-gray-600 text-[12px]">Point of Sale</div>
                        </div>
                    </div>
                    <button className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100">
                        <Link href={route('login')}>Login</Link>
                    </button>
                </div>
            </header>
            <div className="mt-20 flex min-h-screen w-full items-start justify-center bg-[#FDFDFC] p-6 text-[#1b1b18]">
                <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* LEFT COLUMN — PRODUCT DETAILS */}
                    <Card className="rounded-2xl shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="product_name">Product Name</Label>
                                <Input id="product_name" placeholder="Scanned product name" disabled />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Available Stocks</Label>
                                <Input id="category" placeholder="Product category" disabled />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" placeholder="₱0.00" disabled />
                            </div>

                            <hr className="my-8" />

                            <div className="grid gap-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input id="quantity" placeholder="0" type={'number'} min={1} />
                            </div>

                            <div className="pt-4">
                                <Button className="flex w-full items-center gap-2 text-[13px] font-bold">
                                    <LucideShoppingCart className="h-4 w-4" />
                                    <span>Checkout Item</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* RIGHT COLUMN — BARCODE SCANNER + DESIGN */}
                    <Card className="rounded-2xl shadow-none">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Barcode Scanner</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* BARCODE SCANNER PREVIEW BOX */}
                            <div className="flex h-64 w-full items-center justify-center rounded-xl border border-gray-300 bg-[#ececec] text-sm text-gray-600">
                                <img src="/pos-logo.png" className="h-auto w-45" alt="" />
                            </div>

                            {/* DISPLAY BARCODE VALUE */}
                            <div className="grid gap-2">
                                <Label htmlFor="barcode">Scanned Barcode</Label>
                                <Input
                                    id="barcode"
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    placeholder="Awaiting scan..."
                                    disabled
                                />
                            </div>

                            {/* BARCODE DESIGN PREVIEW */}
                            <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-xl border bg-white text-sm text-gray-700">
                                <span className="z-10">Please scan product's barcode...</span>
                                <div className="animate-scan absolute top-0 left-0 h-[3px] w-full bg-red-500"></div>
                            </div>

                            <style>{`
                                @keyframes scan {
                                    0% { transform: translateY(0); }
                                    100% { transform: translateY(120px); }
                                }
                                .animate-scan {
                                    animation: scan 2s linear infinite;
                                }
                            `}</style>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
