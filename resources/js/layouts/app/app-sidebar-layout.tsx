import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { type BreadcrumbItem, type User } from '@/types';
import { type PropsWithChildren } from 'react';
interface AppSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    auth: {
        user: User;
    };
}

export default function AppSidebarLayout({ children, breadcrumbs = [], auth }: PropsWithChildren<AppSidebarLayoutProps>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />

            <AppContent variant="sidebar" className="flex min-h-screen flex-col overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} user={auth?.user} />

                {/* Main content should grow */}
                <div className="flex-1">{children}</div>

                <Footer className='mt-50' />
                <Toaster position="top-right" richColors />
            </AppContent>
        </AppShell>
    );
}
