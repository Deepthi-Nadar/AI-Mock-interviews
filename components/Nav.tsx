"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/sign-in");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
        <h2 className="text-primary-100">PrepWise</h2>
      </Link>
      {pathname === "/" && (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
