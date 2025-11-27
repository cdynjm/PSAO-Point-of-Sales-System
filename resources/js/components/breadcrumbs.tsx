import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { HomeIcon } from 'lucide-react';
import { Fragment } from 'react';
import AppLogoIcon from './app-logo-icon';

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>
                                                <div className="hidden items-center gap-1 md:flex">
                                                    <HomeIcon className="mr-1 inline h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className="md:hidden">
                                                    <div className="flex items-center gap-1">
                                                        <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                                            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                                                        </div>
                                                        <div className="ml-1 grid flex-1 text-left text-xs">
                                                            <span className="mb-0.5 truncate leading-tight font-light">Laravel</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href}>{item.title}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
