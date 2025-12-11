import FormattedDate from '@/components/formatted-date';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transactions, User } from '@/types';
import { Head } from '@inertiajs/react';
import { TicketCheck } from 'lucide-react';

interface DashboardProps {
    auth: { user: User };
    transaction: Transactions;
    encrypted_id: string;
}

export default function ViewTransactionInventory({ auth, transaction, encrypted_id }: DashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'View Transaction Inventory',
            href: route('transaction.view', { encrypted_id }),
        },
    ];

    const sales = transaction.salesinventories ?? [];

    console.log(sales)

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="View Item Inventory" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto rounded-xl p-4">
                <Label className="text-md flex items-center gap-2 font-bold text-gray-500">
                    <TicketCheck className="text-blue-500" /> <span>{transaction.receiptNumber}</span>
                </Label>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead>#</TableHead>
                            <TableHead className="text-nowrap">Product Name</TableHead>
                            <TableHead className="text-center text-nowrap">Price</TableHead>
                            <TableHead className="text-center text-nowrap">Total Amount</TableHead>
                            <TableHead className="text-center text-nowrap">Quantity</TableHead>
                            <TableHead>Date Processed</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {(sales).length > 0 ? (
                            (sales).map((sale, index) => (
                                <TableRow key={sale.encrypted_id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="text-nowrap">{sale.item?.productName}</TableCell>
                                    <TableCell className="text-center text-nowrap">₱ {sale.price}</TableCell>
                                    <TableCell className="text-center text-nowrap">₱ {Number(sale.price * sale.quantity).toFixed(2)}</TableCell>
                                    <TableCell className="text-center text-nowrap">{sale.quantity}</TableCell>
                                    <TableCell className="text-nowrap">
                                        <FormattedDate date={sale.sold} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="py-6 text-center text-gray-500">
                                    No transactions found for this month.
                                </TableCell>
                            </TableRow>
                        )}
                        {sales.length > 0 && (
                            <TableRow className="border-t font-semibold">
                                <TableCell>Total</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell className="text-center">
                                    ₱ {sales.reduce((sum, sale) => sum + Number(sale.price * sale.quantity), 0).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">{sales.reduce((sum, sale) => sum + sale.quantity, 0)}</TableCell>
                                <TableCell className='text-center'>-</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
