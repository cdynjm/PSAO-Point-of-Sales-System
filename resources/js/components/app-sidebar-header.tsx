import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Settings, LogOut, ChevronsUpDown } from "lucide-react";

import { Link, router } from '@inertiajs/react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { UserInfo } from '@/components/user-info';
import { type User } from '@/types';
interface AppSidebarHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    user: User;
}

export function AppSidebarHeader({ breadcrumbs = [], user }: AppSidebarHeaderProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <header className="fixed top-0 left-0 md:left-64 right-0 z-50 flex h-16 items-center justify-between
    border-sidebar-border/50 bg-white px-6 transition-[left,width] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">

    {/* Left Side */}
    <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>

    {/* Right Side Menu */}
    <DropdownMenu>
        <DropdownMenuTrigger className="outline-none flex items-center gap-2">
            {/* Name visible only on screens larger than md */}
            <span className="hidden md:inline text-[12px] text-gray-600 font-bold">{user.name}</span>

            {/* Avatar */}
            <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>

            {/* Chevron aligned properly */}
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
            {/* User Info */}
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail />
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Settings */}
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={route('profile.edit')}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    method="post"
                    href={route('logout')}
                    as="button"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</header>


    );
}

