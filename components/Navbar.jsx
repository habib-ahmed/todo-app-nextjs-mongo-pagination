"use client";
import Link from "next/link";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname() || "";

  return (
    <header className="bg-gray-200 dark:bg-gray-800 shadow">
      <div className="container mx-auto md:max-w-5xl px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Todo<span className="text-primary ml-2">App.</span>
        </Link>

        <nav className="flex gap-2 text-lg font-medium">
          {navLinks.map(({ name, path }, index) => (
            <Link
              key={index}
              href={path}
              className={`p-3 hover:text-primary ${
                pathname === path && "text-primary"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
