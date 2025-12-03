import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';

import { BrowserMultiFormatReader } from '@zxing/browser';
import { Camera } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Items',
        href: route('items'),
    },
];

interface ItemsProps {
    auth: {
        user: User;
    };
}

export default function Items({ auth }: ItemsProps) {
    const [barcode, setBarcode] = useState('');
    const [openScanner, setOpenScanner] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

    const startScanner = async () => {
    try {
        // Request camera with environment mode only — required on iOS
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: 'environment' }
            }
        });

        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute("playsinline", "true");
            await videoRef.current.play();
        }

        // You can still decode once, no change here
        codeReader
            .decodeOnceFromVideoDevice(undefined, videoRef.current!)
            .then((result) => {
                if (result) {
                    setBarcode(result.getText());
                    setOpenScanner(false);
                }
            })
            .catch((err) => console.error("Scan error:", err));

    } catch (error) {
        console.error("Camera error:", error);
    }
};


    const stopScanner = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="Items" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold text-gray-500">List of Items</Label>

                    {/* Add Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="text-[12px]">
                                + Add
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Item</DialogTitle>
                                <DialogDescription>Fill in the details below to add a new product item.</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                {/* Barcode Number with Scanner Button */}
                                <div className="flex flex-col gap-2">
                                    <Label>Barcode Number</Label>

                                    <div className="relative">
                                        <Input
                                            value={barcode}
                                            onChange={(e) => setBarcode(e.target.value)}
                                            placeholder="Enter barcode number"
                                            className="pr-10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenScanner(true);
                                                setTimeout(startScanner, 300); // give modal time to open
                                            }}
                                            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:text-black"
                                        >
                                            <Camera size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Product Name */}
                                <div className="flex flex-col gap-2">
                                    <Label>Product Name</Label>
                                    <Input placeholder="Enter product name" />
                                </div>

                                {/* Stocks */}
                                <div className="flex flex-col gap-2">
                                    <Label>Stocks</Label>
                                    <Input type="number" placeholder="Enter stocks" />
                                </div>

                                {/* Price */}
                                <div className="flex flex-col gap-2">
                                    <Label>Price</Label>
                                    <Input type="number" placeholder="Enter price" />
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button>Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead className="text-nowrap">Product Name</TableHead>
                                <TableHead className="w-[100px] text-nowrap">Stocks</TableHead>
                                <TableHead className="text-center text-nowrap">Price</TableHead>
                                <TableHead className="text-center text-nowrap">Barcode</TableHead>
                                <TableHead className="text-center text-nowrap">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody></TableBody>
                    </Table>
                </div>
            </div>

            {/* Scanner Dialog */}
            <Dialog
                open={openScanner}
                onOpenChange={(open) => {
                    if (!open) stopScanner();
                    setOpenScanner(open);
                }}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Scan Barcode</DialogTitle>
                        <DialogDescription>Align the barcode inside the frame.</DialogDescription>
                    </DialogHeader>

                    <video ref={videoRef} className="w-full rounded-md" playsInline autoPlay muted />

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                stopScanner();
                                setOpenScanner(false);
                            }}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
