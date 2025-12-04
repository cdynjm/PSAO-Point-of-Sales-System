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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

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
    items: {
        encrypted_id: string;
        productName: string;
        stocks: number;
        price: number;
        barcode: string;
    }[];
}

export default function Items({ auth, items }: ItemsProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const createForm = useForm({
        barcode: '',
        productName: '',
        stocks: '',
        price: '',
    });

    const addItem = () => {
        createForm.post(route('items.store'), {
            onSuccess: () => {
                toast('Created', {
                    description: 'Item has been added successfully.',
                    action: {
                        label: 'Close',
                        onClick: () => console.log(''),
                    },
                });
                createForm.reset();
                setOpenDialog(false);
            },
            onError: () => {
                toast('Failed', {
                    description: 'Failed to add item. Please try again.',
                    action: {
                        label: 'Close',
                        onClick: () => console.log(''),
                    },
                });
            },
        });
    };

    const editForm = useForm({
        barcode: '',
        encrypted_id: '',
        productName: '',
        stocks: '',
        price: '',
    });

    const openEditDialog = (item: ItemsProps['items'][number]) => {
        editForm.setData({
            encrypted_id: String(item.encrypted_id),
            productName: item.productName,
            stocks: String(item.stocks),
            price: String(item.price),
            barcode: item.barcode,
        });

        setEditDialogOpen(true);
    };

    const updateItem = () => {
        editForm.patch(route('items.update'), {
            onSuccess: () => {
                toast('Updated', {
                    description: 'Item updated successfully.',
                    action: {
                        label: 'Close',
                        onClick: () => console.log(''),
                    },
                });
                setEditDialogOpen(false);
            },
            onError: () => {
                toast('Error', {
                    description: 'Update failed. Please try again.',
                    action: {
                        label: 'Close',
                        onClick: () => console.log(''),
                    },
                });
            },
        });
    };

    const deleteForm = useForm({
        encrypted_id: '',
    });

    const openDeleteDialog = (encrypted_id: string) => {
        deleteForm.setData({ encrypted_id: String(encrypted_id) });
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        deleteForm.delete(route('items.destroy'), {
            onSuccess: () => {
                toast('Deleted', {
                    description: 'Item was deleted successfully.',
                    action: {
                        label: 'Close',
                        onClick: () => console.log(''),
                    },
                });
                setDeleteDialogOpen(false);
            },
            onError: () => {
                toast('Failed', {
                    description: 'Unable to delete item. Please try again.',
                    action: {
                        label: 'Close',
                        onClick: () => console.log(''),
                    },
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="Items" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold text-gray-500">List of Items</Label>

                    {/* Add Dialog */}
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                                {/* Barcode */}
                                <div className="flex flex-col gap-2">
                                    <Label>Barcode Number</Label>
                                    <Input
                                        value={createForm.data.barcode}
                                        onChange={(e) => createForm.setData('barcode', e.target.value)}
                                        placeholder="Enter barcode number"
                                    />
                                    {createForm.errors.barcode && <span className="text-xs text-red-500">{createForm.errors.barcode}</span>}
                                </div>

                                {/* Product Name */}
                                <div className="flex flex-col gap-2">
                                    <Label>Product Name</Label>
                                    <Input
                                        value={createForm.data.productName}
                                        onChange={(e) => createForm.setData('productName', e.target.value)}
                                        placeholder="Enter product name"
                                    />
                                    {createForm.errors.productName && <span className="text-xs text-red-500">{createForm.errors.productName}</span>}
                                </div>

                                {/* Stocks */}
                                <div className="flex flex-col gap-2">
                                    <Label>Stocks</Label>
                                    <Input
                                        type="number"
                                        value={createForm.data.stocks}
                                        onChange={(e) => createForm.setData('stocks', e.target.value)}
                                        placeholder="Enter stocks"
                                    />
                                    {createForm.errors.stocks && <span className="text-xs text-red-500">{createForm.errors.stocks}</span>}
                                </div>

                                {/* Price */}
                                <div className="flex flex-col gap-2">
                                    <Label>Price</Label>
                                    <Input
                                        type="number"
                                        value={createForm.data.price}
                                        onChange={(e) => createForm.setData('price', e.target.value)}
                                        placeholder="Enter price"
                                    />
                                    {createForm.errors.price && <span className="text-xs text-red-500">{createForm.errors.price}</span>}
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <Button onClick={addItem} disabled={createForm.processing}>
                                    {createForm.processing ? 'Saving...' : 'Save'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Dialog */}
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Item</DialogTitle>
                                <DialogDescription>Update the item details below.</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                {/* Barcode */}
                                <div className="flex flex-col gap-2">
                                    <Label>Barcode Number</Label>
                                    <Input value={editForm.data.barcode} onChange={(e) => editForm.setData('barcode', e.target.value)} />
                                    {editForm.errors.barcode && <span className="text-xs text-red-500">{editForm.errors.barcode}</span>}
                                </div>
                                {/* Product Name */}
                                <div className="flex flex-col gap-2">
                                    <Label>Product Name</Label>
                                    <Input value={editForm.data.productName} onChange={(e) => editForm.setData('productName', e.target.value)} />
                                    {editForm.errors.productName && <span className="text-xs text-red-500">{editForm.errors.productName}</span>}
                                </div>

                                {/* Stocks */}
                                <div className="flex flex-col gap-2">
                                    <Label>Stocks</Label>
                                    <Input type="number" value={editForm.data.stocks} onChange={(e) => editForm.setData('stocks', e.target.value)} />
                                    {editForm.errors.stocks && <span className="text-xs text-red-500">{editForm.errors.stocks}</span>}
                                </div>

                                {/* Price */}
                                <div className="flex flex-col gap-2">
                                    <Label>Price</Label>
                                    <Input type="number" value={editForm.data.price} onChange={(e) => editForm.setData('price', e.target.value)} />
                                    {editForm.errors.price && <span className="text-xs text-red-500">{editForm.errors.price}</span>}
                                </div>

                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={updateItem} disabled={editForm.processing}>
                                    {editForm.processing ? 'Updating...' : 'Update'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Item</DialogTitle>
                                <DialogDescription>Are you sure you want to delete this item? This action cannot be undone.</DialogDescription>
                            </DialogHeader>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <Button variant="destructive" onClick={deleteItem} disabled={deleteForm.processing}>
                                    {deleteForm.processing ? 'Deleting...' : 'Delete'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px] text-center">#</TableHead>
                                <TableHead className="text-start text-nowrap">Product Name</TableHead>
                                <TableHead className="w-[100px] text-center text-nowrap">Stocks</TableHead>
                                <TableHead className="text-center text-nowrap">Price</TableHead>
                                <TableHead className="text-center text-nowrap">Barcode</TableHead>
                                <TableHead className="text-center text-nowrap">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <td colSpan={6} className="py-4 text-center text-gray-500">
                                        No items found.
                                    </td>
                                </TableRow>
                            ) : (
                                items.map((item, index) => (
                                    <TableRow key={item.encrypted_id}>
                                        <TableCell className="p-2 text-center">{index + 1}</TableCell>

                                        <TableCell className="p-2 text-start whitespace-nowrap">
                                            <span className="ml-2">{item.productName}</span>
                                        </TableCell>

                                        <TableCell className="p-2 text-center">{item.stocks}</TableCell>

                                        <TableCell className="p-2 text-center">₱{Number(item.price).toFixed(2)}</TableCell>

                                        <TableCell className="p-2 text-center">{item.barcode}</TableCell>

                                        <TableCell className="p-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button size="sm" variant="outline" className="text-[12px]" onClick={() => openEditDialog(item)}>
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="outline" className="text-[12px] text-red-600" onClick={() => openDeleteDialog(item.encrypted_id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
