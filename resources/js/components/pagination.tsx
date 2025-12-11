import { Link } from "@inertiajs/react";
import { PaginationLink } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ links }: { links: PaginationLink[] }) {
    if (!links || links.length === 0) return null;

    const pages = links.filter((l) => !isNaN(Number(l.label)));
    const firstPage = Number(pages[0]?.label);
    const lastPage = Number(pages[pages.length - 1]?.label);

    const maxVisible = 5;

    const buildVisiblePages = () => {
        if (pages.length <= maxVisible) return pages;

        const activePage = Number(pages.find((p) => p.active)?.label ?? 1);

        let start = activePage - 2;
        let end = activePage + 2;

        if (start < firstPage) {
            start = firstPage;
            end = start + (maxVisible - 1);
        }

        if (end > lastPage) {
            end = lastPage;
            start = end - (maxVisible - 1);
        }

        const visible = pages.filter(
            (p) => Number(p.label) >= start && Number(p.label) <= end
        );

        return visible;
    };

    const visiblePages = buildVisiblePages();

    return (
        <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-1 text-sm">

                {/* Prev Button */}
                <Link
                    href={links[0].url || "#"}
                    className="rounded px-2 py-1 bg-gray-200 disabled:opacity-40"
                    disabled={!links[0].url}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Link>

                {/* Left Ellipsis */}
                {Number(visiblePages[0]?.label) > firstPage && (
                    <>
                        <Link
                            href={pages[0].url || "#"}
                            className="rounded px-2 py-1 bg-gray-200"
                            dangerouslySetInnerHTML={{ __html: pages[0].label }}
                        />
                        <span className="px-1 text-gray-400">...</span>
                    </>
                )}

                {/* Page Numbers */}
                {visiblePages.map((p, idx) => (
                    <Link
                        key={idx}
                        href={p.url || "#"}
                        className={`rounded px-2 py-1 ${
                            p.active
                                ? "bg-primary text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        dangerouslySetInnerHTML={{ __html: p.label }}
                    />
                ))}

                {/* Right Ellipsis */}
                {Number(visiblePages[visiblePages.length - 1]?.label) < lastPage && (
                    <>
                        <span className="px-1 text-gray-400">...</span>
                        <Link
                            href={pages[pages.length - 1].url || "#"}
                            className="rounded px-2 py-1 bg-gray-200"
                            dangerouslySetInnerHTML={{
                                __html: pages[pages.length - 1].label,
                            }}
                        />
                    </>
                )}

                {/* Next Button */}
                <Link
                    href={links[links.length - 1].url || "#"}
                    className="rounded px-2 py-1 bg-gray-200 disabled:opacity-40"
                    disabled={!links[links.length - 1].url}
                >
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

