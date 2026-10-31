import Link from "next/link";

export const metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-primary">404</p>
      <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>
      <p className="mt-2 opacity-70 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
}