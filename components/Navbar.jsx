"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const linkClass = (href) =>
    `px-3 py-2 rounded-lg text-sm font-medium ${
      pathname === href ? "bg-primary text-primary-content" : "hover:bg-base-200"
    }`;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const links = (
    <>
      <li><Link href="/" className={linkClass("/")}>Home</Link></li>
      <li><Link href="/books" className={linkClass("/books")}>All Books</Link></li>
      {user && (
        <>
          <li><Link href="/add-book" className={linkClass("/add-book")}>Add Book</Link></li>
          <li><Link href="/my-books" className={linkClass("/my-books")}>My Books</Link></li>
          <li><Link href="/my-borrows" className={linkClass("/my-borrows")}>My Borrows</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <span>📚</span> BookNook
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="user" src={user.image || "https://i.ibb.co/2kR3q8z/user.png"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li className="px-3 py-2 font-semibold">{user.name}</li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}