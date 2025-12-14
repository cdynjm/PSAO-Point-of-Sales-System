import FormattedDate from '@/components/formatted-date';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Paginated, Transactions, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: route('transactions'),
    },
];
interface TransactionProps {
    auth: { user: User };
    transactions: Paginated<Transactions>;

    years: number[];
    months: Record<string, number[]>;
    initialMonth: string;
    initialYear: string;
}

export default function Transaction({ auth, transactions, years, months, initialMonth, initialYear }: TransactionProps) {
    const [selectedYear, setSelectedYear] = useState(String(initialYear));
    const [selectedMonth, setSelectedMonth] = useState(String(initialMonth));

    const reload = (year: string, month: string) => { 
        router.get(
            route('transactions'),
            {
                year,
                month,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="Transactions" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Label className="text-sm font-bold text-gray-500">
                    Transactions for {new Date(0, Number(selectedMonth) - 1).toLocaleString('default', { month: 'long' })} {selectedYear}
                </Label>  

                <div className="flex flex-row gap-4">
                    {/* YEAR */}
                    <Select
                        value={selectedYear}
                        onValueChange={(v) => {
                            setSelectedYear(v);
                            reload(v, selectedMonth);
                        }}
                    >
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

                    {/* MONTH */}
                    <Select
                        value={selectedMonth}
                        onValueChange={(v) => {
                            setSelectedMonth(v);
                            reload(selectedYear, v);
                        }}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {(months[selectedYear] ?? []).map((m) => (
                                <SelectItem key={m} value={String(m)}>
                                    {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* TABLE */}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="text-nowrap">#</TableHead>
                            <TableHead className="text-nowrap">Receipt #</TableHead>
                            <TableHead className="text-center text-nowrap">Total Amount</TableHead>
                            <TableHead className="text-center text-nowrap">Total Items</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {transactions.data.length > 0 ? (
                            transactions.data.map((t, index) => (
                                <TableRow key={t.encrypted_id}>
                                    <TableCell>{index + 1 + (transactions.current_page - 1) * transactions.per_page}</TableCell>
                                    <TableCell className="text-nowrap">
                                        <Link href={route('transaction.view', { encrypted_id: t.encrypted_id })}>{t.receiptNumber}</Link>
                                    </TableCell>
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
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Pagination links={transactions.links} />
            </div>
        </AppLayout>
    );
}
