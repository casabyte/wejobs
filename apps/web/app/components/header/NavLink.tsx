import Link from "next/link";


interface NavLinkProps {
    href: string;
    title: string;
}

export function NavLink({ href, title }: NavLinkProps) {
    return (
        <Link href={href} className="text-white hover:text-gray-300">
            {title}
        </Link>
    )
}