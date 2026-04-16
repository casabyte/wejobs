import Link from "next/dist/client/link";
import Image from "next/image";
import { NavLink } from "./NavLink";

export function Header() {
    return (
        <>
            <header className="bg-[#440AA8]">
                <nav className="px-4 py-5 flex items-center gap-6 mx-auto max-w-7xl">
                    <Link href="/" className="text-2xl font-bold">
                        <Image src="wejobs.svg" alt="WeJobs Logo" width={115} height={115} className="inline-block mr-2" />
                    </Link>
                    <ul className="flex space-x-6">
                        <NavLink href="/jobs" title="Find jobs" />
                        <NavLink href="/companies" title="Search for companies" />
                        {/* <NavLink href="/about" title="About" /> */}
                    </ul>
                    <Link href="/login" className="ml-auto text-white hover:text-gray-300">
                        Login
                    </Link>
                </nav>
            </header>
        </>
    )   
}