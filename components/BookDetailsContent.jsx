"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";

export default function BookDetailsContent({ id }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [open, setOpen] = useState(false);
  const [borrowing, setBorrowing] = useState(false);

  useEffect(() => {
    if (!isPending && !user) router.replace(`/login?redirect=/books/${id}`);
  }, [isPending, user, router, id]);

  const loadBook = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setBook(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBook();
  }, [id]);

  if (isPending || !user || loading) return <Loader />;

  if (notFound || !book) {
    return <p className="text-center py-20 text-lg">Book not found.</p>;
  }

  const available = book.copies > 0;

  const handleBorrow = async (e) => {
    e.preventDefault();
    setBorrowing(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id }),
      });
      toast.success("Book borrowed successfully!");
      setOpen(false);
      loadBook();
      router.push("/my-borrows");
    } catch (err) {
      toast.error(err.message || "Failed to borrow book");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div className="rounded-xl overflow-hidden shadow-lg h-[480px]">
          <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="badge badge-primary badge-outline">{book.category}</span>
          </div>
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-lg opacity-70">by {book.author}</p>

          <div className="border border-base-300 rounded-xl p-4 bg-base-200">
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="leading-relaxed">{book.description}</p>
          </div>

          <div className="border border-base-300 rounded-xl p-5 bg-base-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs opacity-60">Added by</p>
              <p className="font-semibold">{book.userName}</p>
              <p className="text-xs opacity-60 break-all">{book.userEmail}</p>
            </div>
            <div>
              <p className="text-xs opacity-60">Copies left</p>
              <p className="font-semibold">{book.copies} / {book.totalCopies}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              className="btn btn-primary"
              disabled={!available}
              onClick={() => setOpen(true)}
            >
              {available ? "Borrow This Book" : "Not Available"}
            </button>
            <Link href="/books" className="link link-hover text-sm">
              Back to all books
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Confirm Borrow</h3>
            <form onSubmit={handleBorrow} className="flex flex-col gap-3">
              <input value={user.name} readOnly className="input input-bordered w-full bg-base-200" />
              <input value={user.email} readOnly className="input input-bordered w-full bg-base-200" />
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={borrowing}>
                  {borrowing ? <span className="loading loading-spinner loading-sm"></span> : "Confirm Borrow"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}