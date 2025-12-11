import FormattedDate from '@/components/formatted-date';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Items, User } from '@/types';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { ShoppingBasket } from 'lucide-react';

interface DashboardProps {
    auth: { user: User };
    item: Items;
    years: number[];
    months: Record<string, number[]>;
    encrypted_id: string;
}

export default function Dashboard({ auth, item, years, months, encrypted_id }: DashboardProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'View Item Inventory',
            href: route('items.view', { encrypted_id }),
        },
    ];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [selectedYear, setSelectedYear] = useState(String(currentYear));
    const [selectedMonth, setSelectedMonth] = useState(String(currentMonth));
    
    const monthlyTransactions = useMemo(() => {
        const y = Number(selectedYear);
        const m = Number(selectedMonth);

        if (!item.salesinventories) return [];

        return item.salesinventories.filter((s) => {
            const d = new Date(s.sold);
            return d.getFullYear() === y && d.getMonth() === m;
        });
    }, [item, selectedYear, selectedMonth]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="View Item Inventory" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto rounded-xl p-4">
                <Label className="text-md font-bold text-gray-500 flex items-center gap-2"><ShoppingBasket className='text-blue-500' /> <span>{item.productName}</span></Label>
                <Label className={`text-[13px] ${item.stocks === 0 ? 'text-red-600' : 'text-green-600'}`}>{ item.stocks === 0 ? 'Out of Stocks!' : `Stocks: ${item.stocks}`}</Label>
                <div className="flex flex-row gap-4 mb-2">
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={String(year)}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Month" />
                        </SelectTrigger>

                        <SelectContent>
                            {(months[selectedYear] ?? []).map((m) => (
                                <SelectItem key={m} value={String(m - 1)}>
                                    {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead>#</TableHead>
                            <TableHead className="text-nowrap">Receipt #</TableHead>
                            <TableHead className="text-center text-nowrap">Amount Paid</TableHead>
                            <TableHead className="text-center text-nowrap">Quantity</TableHead>
                            <TableHead>Date Processed</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {monthlyTransactions.length > 0 ? (
                            monthlyTransactions.map((i, index) => (
                                <TableRow key={i.encrypted_id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="text-nowrap">{i.transaction?.receiptNumber}</TableCell>
                                    <TableCell className="text-center text-nowrap">₱ {Number(i.price * i.quantity).toFixed(2)}</TableCell>
                                    <TableCell className="text-center text-nowrap">{i.quantity}</TableCell>
                                    <TableCell className="text-nowrap">
                                        <FormattedDate date={i.sold} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="py-6 text-center text-gray-500">
                                    No transactions found for this month.
                                </TableCell>
                            </TableRow>
                        )}

                        {monthlyTransactions.length > 0 && (
                            <TableRow className="border-t font-semibold">
                                <TableCell>Total</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell className="text-center">
                                    ₱ {monthlyTransactions.reduce((sum, t) => sum + Number(t.price * t.quantity), 0).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">{monthlyTransactions.reduce((sum, t) => sum + t.quantity, 0)}</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                        )}
                       
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
