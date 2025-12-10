import { SidebarInset } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Home, PackageSearch, ScanLineIcon, HistoryIcon } from 'lucide-react';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

interface NavItem {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

/** Normalize a URL (string) into a pathname like "/items" */
function normalizeToPathname(href: string): string {
    try {
        // If href is absolute or contains origin, this will return the pathname
        const url = new URL(href, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
        return url.pathname.replace(/\/+$/, ''); // remove trailing slash
    } catch {
        // fallback: remove query/hash and trailing slash
        return href.split(/[?#]/)[0].replace(/\/+$/, '');
    }
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    const { url } = usePage();

    const navItems: NavItem[] = [
        { label: 'Home', href: route('dashboard'), icon: Home },
        { label: 'Items', href: route('items'), icon: PackageSearch },
        { label: 'Transactions', href: route('transactions'), icon: HistoryIcon },
        { label: 'Scanner', href: route('home'), icon: ScanLineIcon },
    ];

    // currentPath will be the pathname portion of the current URL (no query/hash, no trailing slash)
    const currentPath = typeof window !== 'undefined'
        ? window.location.pathname.replace(/\/+$/, '')
        : normalizeToPathname(String(url || ''));

    if (variant === 'sidebar') {
        return (
            <SidebarInset {...props}>
                <div className="flex h-full flex-col">
                    <div className="flex-1 overflow-auto mb-15">{children}</div>

                    {/* Bottom Nav */}
                    <nav className="fixed bottom-0 left-0 z-50 flex h-13 w-full items-center justify-around border-t border-gray-200 bg-white shadow-lg md:hidden">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const itemPath = normalizeToPathname(item.href);

                            // active if exact path or if currentPath is a child route of itemPath
                            const isActive =
                                currentPath === itemPath || (itemPath !== '' && currentPath.startsWith(itemPath + '/'));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center text-sm ${
                                        isActive ? 'text-blue-500' : 'text-gray-600'
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-600'}`} />
                                    <span className="text-[10px]">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </SidebarInset>
        );
    }

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {children}
        </main>
    );
}
