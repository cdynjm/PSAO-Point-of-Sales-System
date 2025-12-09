import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductDetails, User } from '@/types';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { CheckCheck, Loader2, MessageCircleWarningIcon, ScanLineIcon, ShoppingBagIcon, ShoppingCartIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
interface BarcodeScannerPageProps {
    auth: {
        user: User | null;
    };
}

export default function BarcodeScannerPage({ auth }: BarcodeScannerPageProps) {
    const [barcode, setBarcode] = useState('');
    const [items, setItems] = useState<ProductDetails[]>([]);
    const isLoggedIn = !!auth.user;
    const barcodeRef = useRef<HTMLInputElement>(null);
    const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
    const [loading, setLoading] = useState(false);

    type ScanStatus = 'idle' | 'success' | 'error';

    useEffect(() => {
        const input = barcodeRef.current;
        if (!input) return;

        if (!/Mobi|Android/i.test(navigator.userAgent)) {
            input.focus();
            const handleBlur = () => input.focus();
            input.addEventListener('blur', handleBlur);

            return () => {
                input.removeEventListener('blur', handleBlur);
            };
        }
    }, []);

    useEffect(() => {
        barcodeRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!barcode) return;

        const handler = setTimeout(() => {
                scanBarcode(barcode);
        }, 100);

        return () => {
            clearTimeout(handler);
        };
    }, [barcode]);

    const scanBarcode = async (code: string) => {
        try {
            const response = await axios.post(route('scan.barcode'), {
                barcode: code,
            });

            const product = response.data;

            if (!product || !product.name) {
                setScanStatus('error');
                setTimeout(() => setScanStatus('idle'), 1000);
            } else {
                setScanStatus('success');
                setItems((items) => {
                    const existing = items.find((item) => item.barcode === code);

                    if (existing) {
                        return items.map((item) => (item.barcode === code ? { ...item, quantity: item.quantity + 1 } : item));
                    }

                    return [
                        ...items,
                        {
                            barcode: code,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                        },
                    ];
                });

                setTimeout(() => setScanStatus('idle'), 1000);
            }

            setBarcode('');
        } catch (error) {
            console.error('Scan error:', error);
            setScanStatus('error');
            setTimeout(() => setScanStatus('idle'), 1000);
            setBarcode('');
        }
    };

    const removeItem = (barcode: string) => {
        setItems((items) => {
            return items
                .map((item) => (item.barcode === barcode ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0);
        });
    };

    const checkoutItems = () => {
        setLoading(true);
        router.post(
            route('checkout.process'),
            {
                items: items.map((item) => ({
                    barcode: item.barcode,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
            {
                onSuccess: () => {
                    toast('Success', {
                        description: `Checkout completed. Your order has been processed with an amount of ₱${total.toFixed(2)}.`,
                        duration: 10000,
                        className: 'text-md p-4',
                        action: {
                            label: 'Close',
                            onClick: () => console.log(''),
                        },
                    });
                    setItems([]);
                },
                onError: (errors) => {
                    toast('Checkout Failed', {
                        description: errors.items ?? 'Checkout failed.',
                        duration: 10000,
                        className: 'text-lg p-4',
                        action: {
                            label: 'Close',
                            onClick: () => console.log(''),
                        },
                    });
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* HEADER */}
            <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-full items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-3">
                        <img src="/pos-logo.png" className="h-10 w-auto" alt="POS Logo" />
                        <div>
                            <div className="text-lg font-semibold text-[#1b1b18]">POS - PSAO</div>
                            <div className="text-[12px] text-gray-600">Point of Sale</div>
                        </div>
                    </div>
                    <button className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100">
                        <Link href={isLoggedIn ? route('dashboard') : route('login')}>{isLoggedIn ? 'Go to Dashboard' : 'Login'}</Link>
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 pt-15">
                <div className="flex w-full justify-center p-6 text-[#1b1b18]">
                    <div className="mt-5 grid w-full max-w-full grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
                        {/* LEFT COLUMN — PRODUCT TABLE */}
                        <Card className="rounded-2xl shadow-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-1 text-xl font-semibold text-primary">
                                    <ShoppingCartIcon className="text-green-600" /> Your Cart
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* TABLE */}
                                <Table className="w-full text-sm">
                                    <TableHeader className="border-b text-left">
                                        <TableRow>
                                            <TableHead className="">Product</TableHead>
                                            <TableHead className="">Qty</TableHead>
                                            <TableHead className="">Price</TableHead>
                                            <TableHead className="">Subtotal</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.length === 0 ? (
                                            <TableRow>
                                                <td colSpan={6} className="py-4 text-center text-red-500">
                                                    Please scan product barcode...
                                                </td>
                                            </TableRow>
                                        ) : (
                                            items.map((item) => (
                                                <TableRow key={item.barcode} className="border-b">
                                                    <TableCell className="text-nowrap">{item.name}</TableCell>
                                                    <TableCell className="text-lg font-bold">{item.quantity}</TableCell>
                                                    <TableCell className="text-lg">₱{item.price}</TableCell>
                                                    <TableCell className="text-lg font-bold">₱{(item.price * item.quantity).toFixed(2)}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="text-[12px]"
                                                            onClick={() => removeItem(item.barcode)}
                                                        >
                                                            <Trash2Icon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>

                                {/* TOTAL */}
                                <div className="pt-3 text-right text-lg font-bold text-primary">
                                    <small>Total: </small> ₱{total.toFixed(2)}
                                </div>

                                <Button className="float-end text-[12px]" disabled={items.length === 0 || loading} onClick={checkoutItems}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBagIcon className="h-4 w-4" />
                                            Checkout
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* RIGHT COLUMN — BARCODE SCANNER */}
                        <Card className="rounded-2xl shadow-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold text-primary">
                                    <ScanLineIcon /> Barcode Scanner
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* ANIMATION */}
                                <div className="bg-diagonal-lines relative flex h-50 w-full items-center justify-center overflow-hidden rounded-xl border bg-white text-sm text-gray-700">
                                    <div className="z-10 flex items-center gap-2 text-sm">
                                        {scanStatus === 'success' && (
                                            <>
                                                <CheckCheck className="h-4 w-4 text-green-600" />
                                                <span className="flex items-center gap-2 text-lg text-green-600">
                                                    <ShoppingBagIcon /> Added to cart
                                                </span>
                                            </>
                                        )}
                                        {scanStatus === 'error' && (
                                            <span className="flex items-center gap-2 text-lg text-red-600">
                                                <MessageCircleWarningIcon /> Product not found
                                            </span>
                                        )}
                                        {scanStatus === 'idle' && <span className="text-lg text-gray-500">Please scan product barcode...</span>}
                                    </div>

                                    <div
                                        className={`animate-scan absolute top-0 left-0 h-[3px] w-full ${
                                            scanStatus === 'success' ? 'bg-green-500' : scanStatus === 'error' ? 'bg-red-600' : 'bg-red-500'
                                        }`}
                                    ></div>
                                </div>

                                <Input
                                    id="barcode"
                                    ref={barcodeRef}
                                    value={barcode}
                                    onChange={(e) => setBarcode(e.target.value)}
                                    placeholder="Scan barcode..."
                                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                                    autoComplete="off"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <Toaster position="top-right" richColors />
            </main>
            <Footer className="mt-5 mb-10" />
        </div>
    );
}
