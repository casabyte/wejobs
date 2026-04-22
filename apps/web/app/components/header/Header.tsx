import Link from "next/dist/client/link";
import Image from "next/image";
import { NavLink } from "./NavLink";
import { getCurrentUser } from "@/app/lib/auth";
import { UserMenu } from "./UserMenu";

export  async function Header() {

    const user : any = await getCurrentUser();
    console.log('Current user in Header:', user);
    return (
        <>
            <header className="bg-[#440AA8] sticky top-0 z-50 ">
                <nav className="px-4 py-5 flex items-center justify-between gap-6 mx-auto max-w-7xl">
                    <Link href="/" className="text-2xl font-bold">
                        <Image src="wejobs.svg" alt="WeJobs Logo" width={115} height={115} className="inline-block mr-2" />
                    </Link>
                    <ul className="flex space-x-3 text-md">
                        <NavLink href="/jobs" title="Find jobs" />
                        <NavLink href="/companies" title="Search for companies" />
                        {/* <NavLink href="/about" title="About" /> */}
                    </ul>

                    {user ? (<UserMenu user={user} />) :
                        (
                            <Link href="/login" className="ml-auto text-white hover:text-gray-300">
                                Login
                            </Link>
                        )}
                </nav>
            </header>
        </>
    )
}