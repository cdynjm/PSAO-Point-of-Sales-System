import AppLogoIcon from '@/components/app-logo-icon';
import GuestFooter from '@/components/guest-footer';
import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-100 antialiased">
            {/* Main container */}
            <div className="mt-4 flex flex-1 items-center justify-center px-4 py-12">
                <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white lg:flex-row">
                    {/* LEFT ILLUSTRATION */}
                    <div className="hidden w-1/2 flex-col items-center justify-start bg-gray-50 p-8 lg:flex">
                        <img src="/img/help-desk.png" alt="Login Illustration" className="mb-6 max-h-[300px] object-contain" draggable="false" />

                        <h6 className="mb-1 flex items-center text-[15px] text-gray-800">
                            Need technical assistance? Chat
                            <Icon icon="marketeq:chat-4" width={27} height={27} className="ml-1" />
                        </h6>

                        <h3 className="mb-1 text-[18px] font-bold text-primary">JEMUEL CADAYONA</h3>

                        <small className="mb-2 text-[13px]">Software Developer</small>

                        <hr className="my-2 w-full" />

                        <a
                            href="https://www.facebook.com/jemuel.cadayona.94"
                            target="_blank"
                            className="mt-2 inline-block rounded bg-primary px-3 py-1 text-[11px] text-white uppercase"
                        >
                            Click to Chat
                        </a>

                        <div className="mt-2 mb-4">
                            <a href="https://jemcdyn.vercel.app/" target="_blank" className="flex items-center text-[13px] text-gray-600 underline">
                                <Icon icon="logos:webkit" width={25} height={25} className="mr-2" />
                                https://jemcdyn.vercel.app/
                            </a>
                        </div>
                    </div>

                    {/* RIGHT FORM AREA */}
                    <div className="flex w-full flex-col justify-center p-10 md:p-15 lg:w-1/2">
                        <div className="mb-4 text-center">
                            <Link href={route('home')} className="mb-3 flex justify-center">
                                <AppLogoIcon className="size-12 fill-current text-black dark:text-white" />
                            </Link>

                            <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
                            <p className="text-sm text-gray-500">{description}</p>
                        </div>

                        <div>{children}</div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                            <Icon icon="ph:seal-check-duotone" width={35} height={35} className="text-green-500" />
                            <span>
                                Simplify sales with a smart <span className="font-bold text-green-600">POS - Inventory Tracker</span> for faster
                                transaction that never misses a detail.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-0 px-0 md:mb-10 md:px-50">
                <GuestFooter />
            </div>

            {/* MOBILE HELP DESK SECTION */}
            <div className="flex flex-col items-center justify-center p-6 pt-0 lg:hidden">
                <img src="/img/help-desk.png" alt="Help Desk" draggable="false" className="mb-4 max-h-[200px] object-contain" />

                <h6 className="mb-1 flex items-center justify-center text-[15px] text-gray-800">
                    Need technical assistance? Chat
                    <Icon icon="marketeq:chat-4" width={27} height={27} className="ml-1" />
                </h6>

                <h3 className="mb-1 text-center text-[20px] font-bold text-primary">JEMUEL CADAYONA</h3>

                <small className="mb-2 text-center text-[14px]">Software Developer</small>

                <hr className="my-2 w-full" />

                <a
                    href="https://www.facebook.com/jemuel.cadayona.94"
                    className="mt-2 inline-block rounded bg-primary px-3 py-1 text-[11px] text-white uppercase"
                >
                    Click to Chat
                </a>

                <div className="mt-2 mb-4 text-center">
                    <a href="https://jemcdyn.vercel.app/" target="_blank" className="flex items-center justify-center text-gray-600 underline">
                        <Icon icon="logos:webkit" width={25} height={25} className="mr-2" />
                        https://jemcdyn.vercel.app/
                    </a>
                </div>
            </div>
        </div>
    );
}
