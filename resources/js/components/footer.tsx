import { Icon } from '@iconify/react';

interface FooterProps {
    appName?: string; // optional if coming from env
    year?: number;
    className?: string;
}

export default function Footer({ className, year = new Date().getFullYear() }: FooterProps) {
    return (
        <footer className={`mb-0 ${className}`}>
            {/* Top Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left Logo */}
                <div className="flex justify-center md:justify-end">
                    <img src="/img/help-desk.png" alt="Help Desk" className="mt-2 w-[250px]" draggable="false" />
                </div>

                {/* Right Contact */}
                <div className="mt-0 text-center md:mt-12 md:text-left">
                    <h6 className="mt-0 mb-1 flex items-center justify-center text-[15px] text-gray-800 md:mt-4 md:justify-start">
                        Need technical assistance? Chat
                        <Icon icon="marketeq:chat-4" width="27" height="27" className="ml-1" />
                    </h6>

                    <h3 className="mb-1 text-[20px] font-bold text-primary">JEMUEL CADAYONA</h3>

                    <div className="mb-2">
                        <small className="text-[14px]">Software Developer</small>
                    </div>

                    <a
                        href="https://www.facebook.com/jemuel.cadayona.94"
                        target="_blank"
                        className="mt-2 inline-block rounded bg-primary px-3 py-1 text-[11px] text-white uppercase hover:bg-green-700"
                    >
                        Click to Chat
                    </a>

                    <div className="mt-2 mb-4">
                        <a
                            href="https://jemcdyn.vercel.app/"
                            target="_blank"
                            className="flex items-center justify-center text-[13px] text-gray-600 underline md:justify-start"
                        >
                            <Icon icon="logos:webkit" width="25" height="25" className="mr-2" />
                            https://jemcdyn.vercel.app/
                        </a>
                    </div>
                </div>
            </div>

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
