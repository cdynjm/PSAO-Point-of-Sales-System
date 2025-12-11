import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

function cleanPath(path: string): string {
    try {
        const u = new URL(path, "http://dummy.test");
        return u.pathname.replace(/\/+$/, '') || '/';
    } catch {
        return path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
    }
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    // Clean current URL from Inertia
    const currentPath = cleanPath(page.url);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const itemPath = cleanPath(item.href);
                    const isActive =
                        currentPath === itemPath ||
                        currentPath.startsWith(itemPath + '/');

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
