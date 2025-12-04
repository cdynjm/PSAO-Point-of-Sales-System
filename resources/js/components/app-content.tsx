import { SidebarInset } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Home, Search, User } from 'lucide-react';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    const { url } = usePage();

    if (variant === 'sidebar') {
        return (
            <SidebarInset {...props}>
                <div className="flex h-full flex-col">
                    <div className="flex-1 overflow-auto">{children}</div>

                    {/* Fixed bottom navbar inside sidebar variant */}
                    <nav className="fixed bottom-0 left-0 z-50 flex h-13 w-full items-center justify-around border-t border-gray-200 bg-white shadow-lg md:hidden">
                        <Link
                            href={route('dashboard')}
                            className={`flex flex-col items-center text-sm ${url === '/dashboard' ? 'text-blue-500' : 'text-gray-600'}`}
                        >
                            <Home className={`h-5 w-5 ${url === '/dashboard' ? 'text-blue-500' : 'text-gray-600'}`} />
                            <span className="text-[10px]">Home</span>
                        </Link>

                        <Link
                            href="/search"
                            className={`flex flex-col items-center text-sm ${url === '/search' ? 'text-blue-500' : 'text-gray-600'}`}
                        >
                            <Search className={`h-5 w-5 ${url === '/search' ? 'text-blue-500' : 'text-gray-600'}`} />
                            <span className="text-[10px]">Search</span>
                        </Link>

                        <Link
                            href="/profile"
                            className={`flex flex-col items-center text-sm ${url === '/profile' ? 'text-blue-500' : 'text-gray-600'}`}
                        >
                            <User className={`h-5 w-5 ${url === '/profile' ? 'text-blue-500' : 'text-gray-600'}`} />
                            <span className="text-[10px]">Profile</span>
                        </Link>
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
