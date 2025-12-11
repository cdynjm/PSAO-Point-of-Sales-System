import FormattedDate from '@/components/formatted-date';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transactions, User } from '@/types';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: route('transactions'),
    },
];
interface TransactionProps {
    auth: { user: User };
    transactions: Transactions[];

    years: number[];
    months: Record<string, number[]>;
}

export default function Transaction({ auth, transactions, years, months }: TransactionProps) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [selectedYear, setSelectedYear] = useState(String(currentYear));
    const [selectedMonth, setSelectedMonth] = useState(String(currentMonth));

    const monthlyTransactions = useMemo(() => {
        const y = Number(selectedYear);
        const m = Number(selectedMonth);

        return transactions.filter((t) => {
            const d = new Date(t.created_at);
            return d.getFullYear() === y && d.getMonth() === m;
        });
    }, [transactions, selectedYear, selectedMonth]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Label className="text-sm font-bold text-gray-500">
                    Transactions for{' '}
                    {selectedMonth !== undefined ? new Date(0, Number(selectedMonth)).toLocaleString('default', { month: 'long' }) : '—'}{' '}
                    {selectedYear}
                </Label>

                <div className="flex flex-row gap-4">
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
                            <TableHead className="text-center text-nowrap">Total Amount</TableHead>
                            <TableHead className="text-center text-nowrap">Total Items</TableHead>
                            <TableHead>Date Processed</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {monthlyTransactions.length > 0 ? (
                            monthlyTransactions.map((t, index) => (
                                <TableRow key={t.encrypted_id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="text-nowrap">{t.receiptNumber}</TableCell>
                                    <TableCell className="text-center text-nowrap">₱ {t.totalPayment}</TableCell>
                                    <TableCell className="text-center text-nowrap">{t.totalItems}</TableCell>
                                    <TableCell className="text-nowrap">
                                        <FormattedDate date={t.created_at} />
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

                        {/* TOTAL ROW */}
                        {monthlyTransactions.length > 0 && (
                            <TableRow className="border-t font-semibold">
                                <TableCell>Total</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell className="text-center">
                                    ₱ {monthlyTransactions.reduce((sum, t) => sum + Number(t.totalPayment), 0).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center">{monthlyTransactions.reduce((sum, t) => sum + t.totalItems, 0)}</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
