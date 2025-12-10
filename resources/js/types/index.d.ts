import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ProductDetails {
    encrypted_id: string;
    barcode: string;
    name: string;
    price: number;
    quantity: number;
}
export interface Items {
    encrypted_id: string;
    productName: string;
    stocks: number;
    price: number;
    barcode: string;
    salesInventory?: SalesInventory[];
}

export interface Transactions {
    encrypted_id: string;
    receiptNumber: string;
    totalPayment: number;
    totalItems: number;
    created_at: string;
    salesInventory?: SalesInventory[];
}
export interface SalesInventory {
    encrypted_id: string;
    items_id: number;
    transactions_id: number;
    quantity: number;
    price: number;
    barcode: string;
    sold: string;
    items?: Items;
}
