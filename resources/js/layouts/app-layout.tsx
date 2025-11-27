import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    auth: {
        user: User;
    };
}

export default function AppLayout({ children, breadcrumbs, auth }: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} auth={auth}>
            <div className="mt-15">
                {children}
            </div>
        </AppLayoutTemplate>
    );
}
