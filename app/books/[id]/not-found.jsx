import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-primary">404</p>
      <h1 className="text-3xl font-bold mt-4">Book Not Found</h1>
      <p className="mt-2 opacity-70 max-w-md">
        Sorry, the book you are looking for does not exist.
      </p>
      <Link href="/books" className="btn btn-primary mt-6">
        Back to Books
      </Link>
    </div>
  );
}
