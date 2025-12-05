import { Icon } from '@iconify/react';

interface FooterProps {
    appName?: string; // optional if coming from env
    year?: number;
    className?: string;
}

export default function GuestFooter({ className, year = new Date().getFullYear() }: FooterProps) {
    return (
        <footer className={`${className}`}>
            {/* Top Grid */}

            {/* Bottom Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* App Name & Social */}
                <div className="text-center md:col-span-5 md:text-right">
                    <h4 className="mb-0 text-lg font-semibold">
                        <a href="#" className="hover:underline">
                            {'POS - PSAO'}
                        </a>
                    </h4>

                    <div>
                        <small className="text-[12px]">Point of Sale - Provincial Systems A.O.</small>
                    </div>

                    <span className="text-sm">Online portals</span>

                    <div className="my-3 flex justify-center gap-2 md:justify-end">
                        <a
                            href="https://www.facebook.com/ProvincialGovernmentofSouthernLeyte"
                            target="_blank"
                            className="rounded bg-blue-500 p-1 text-white"
                        >
                            <Icon icon="akar-icons:facebook-fill" width="18" height="18" />
                        </a>
                        <a href="#" target="_blank" className="rounded bg-red-500 p-1 text-white">
                            <Icon icon="flowbite:youtube-solid" width="18" height="18" />
                        </a>
                        <a href="https://southernleyte.gov.ph/" target="_blank" className="rounded bg-green-500 p-1 text-white">
                            <Icon icon="streamline:web-solid" width="18" height="18" />
                        </a>
                        <a href="https://gmail.com" target="_blank" className="rounded bg-gray-500 p-1 text-white">
                            <Icon icon="mdi:gmail" width="18" height="18" />
                        </a>
                    </div>

                    <p className="pt-1 text-sm">{year} © Province of Southern Leyte</p>
                </div>

                {/* Quicklinks */}
                <div className="text-center md:col-span-3 md:text-left">
                    <h5 className="mb-2 font-semibold">Quicklinks</h5>
                    <ul>
                        <li>
                            <a target="_blank" href="https://southernleyte.gov.ph/" className="block pb-1 text-xs hover:underline">
                                Province of Southern Leyte
                            </a>
                        </li>

                        <li>
                            <a target="_blank" href="https://southernleyte.gov.ph/pgso/" className="block pb-1 text-xs hover:underline">
                                Provincial Systems Administrator's Office
                            </a>
                        </li>

                        <li>
                            <a target="_blank" href="https://jemcdyn.vercel.app/" className="block pb-1 text-xs hover:underline">
                                JEM CDYN, Dev.
                            </a>
                        </li>

                        <li>
                            <hr className="my-2" />
                        </li>
                    </ul>
                </div>

                {/* Logos */}
                <div className="flex items-center justify-center gap-4 md:col-span-4 md:justify-start">
                    <a target="_blank" href="https://southernleyte.gov.ph">
                        <img className="w-[70px] rounded-full" src="/img/province-logo-official.png" alt="Province Logo" />
                    </a>

                    <a target="_blank" href="https://southernleytestateu.edu.ph">
                        <img className="w-[70px] rounded-full border border-gray-300 p-2" src="/img/jemcdyn.png" alt="JEM CDYN Logo" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
