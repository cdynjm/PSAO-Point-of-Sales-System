import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem, type User } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster } from "@/components/ui/sonner"

interface AppSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    auth: {
        user: User;
    };
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    auth
}: PropsWithChildren<AppSidebarLayoutProps>) {

    return (
        <AppShell variant="sidebar">
            <AppSidebar />

            <AppContent variant="sidebar" className="overflow-x-hidden">
                {/* Pass the user FROM auth */}
                <AppSidebarHeader breadcrumbs={breadcrumbs} user={auth?.user} />
                {children}
                <Toaster position="top-right" richColors />
            </AppContent>
        </AppShell>
    );
}
