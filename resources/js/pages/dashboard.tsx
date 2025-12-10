'use client';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Transactions, User } from '@/types';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];
interface DashboardProps {
    auth: { user: User };
    transactions: Transactions[];

    years: number[];
    months: Record<string, number[]>;
}

export default function Dashboard({ auth, transactions, years, months }: DashboardProps) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [selectedYear, setSelectedYear] = useState(String(currentYear));
    const [selectedMonth, setSelectedMonth] = useState(String(currentMonth));

    const filteredTransactions = useMemo(() => {
        return transactions.filter((t) => new Date(t.created_at).getFullYear() === Number(selectedYear));
    }, [transactions, selectedYear]);

    const yearlyData = useMemo(() => {
        const monthly = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(0, i).toLocaleString('default', { month: 'short' }),
            totalAmount: 0,
            totalItems: 0,
        }));

        filteredTransactions.forEach((t) => {
            const d = new Date(t.created_at);
            const m = d.getMonth();
            monthly[m].totalAmount += Number(t.totalPayment);
            monthly[m].totalItems += t.totalItems;
        });

        return monthly;
    }, [filteredTransactions]);

    const dailyData = useMemo(() => {
        const y = Number(selectedYear);
        const m = Number(selectedMonth);

        const daysInMonth = new Date(y, m + 1, 0).getDate();

        const daily = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            totalAmount: 0,
            totalItems: 0,
        }));

        filteredTransactions.forEach((t) => {
            const d = new Date(t.created_at);
            if (d.getFullYear() !== y || d.getMonth() !== m) return;

            const dayIndex = d.getDate() - 1;
            daily[dayIndex].totalAmount += Number(t.totalPayment);
            daily[dayIndex].totalItems += t.totalItems;
        });

        return daily;
    }, [filteredTransactions, selectedYear, selectedMonth]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} auth={auth}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* YEARLY SALES ANALYTICS */}
                <Card className="rounded-lg border bg-white shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-primary">Yearly Sales Analytics</CardTitle>
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
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={yearlyData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === 'Total Sales Amount') {
                                                return [`₱ ${Number(value).toFixed(2)}`, name];
                                            }
                                            return [value, name]; // totalItems stays as integer
                                        }}
                                    />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <Line type="monotone" dataKey="totalAmount" name="Total Sales Amount" stroke="#2563eb" strokeWidth={3} />
                                    <Line type="monotone" dataKey="totalItems" name="Total Items Sold" stroke="#16a34a" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Month</TableHead>
                                        <TableHead className='text-center'>Total Amount</TableHead>
                                        <TableHead className='text-center'>Total Items Sold</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {yearlyData.map((m, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{m.month}</TableCell>
                                            <TableCell className='text-center'>₱ {m.totalAmount.toFixed(2)}</TableCell>
                                            <TableCell className='text-center'>{m.totalItems}</TableCell>
                                        </TableRow>
                                    ))}

                                    {/* TOTAL ROW */}
                                    <TableRow className="border-t font-semibold">
                                        <TableCell>Total</TableCell>
                                        <TableCell className='text-center'>₱ {yearlyData.reduce((sum, m) => sum + m.totalAmount, 0).toFixed(2)}</TableCell>
                                        <TableCell className='text-center'>{yearlyData.reduce((sum, m) => sum + m.totalItems, 0)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* MONTHLY SALES ANALYTICS */}
                <Card className="rounded-lg border bg-white shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-primary">Monthly Sales Analytics</CardTitle>

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
                    </CardHeader>

                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyData}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value, name) => {
                                            if (name === 'Sales Amount') {
                                                return [`₱ ${Number(value).toFixed(2)}`, name];
                                            }
                                            return [value, name]; // totalItems stays as integer
                                        }}
                                    />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <Line type="monotone" dataKey="totalAmount" name="Sales Amount" stroke="#dc2626" strokeWidth={3} />
                                    <Line type="monotone" dataKey="totalItems" name="Items Sold" stroke="#0ea5e9" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Day</TableHead>
                                        <TableHead className='text-center'>Total Amount</TableHead>
                                        <TableHead className='text-center'>Total Items Sold</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {dailyData.map((d, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{d.day}</TableCell>
                                            <TableCell className='text-center'>₱ {d.totalAmount.toFixed(2)}</TableCell>
                                            <TableCell className='text-center'>{d.totalItems}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className="border-t font-semibold">
                                        <TableCell>Total</TableCell>
                                        <TableCell className='text-center'>₱ {dailyData.reduce((sum, d) => sum + d.totalAmount, 0).toFixed(2)}</TableCell>
                                        <TableCell className='text-center'>{dailyData.reduce((sum, d) => sum + d.totalItems, 0)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
