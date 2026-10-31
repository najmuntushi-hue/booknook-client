"use client";
import { useEffect, useState } from "react";
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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-2/5 h-96 lg:h-auto">
          <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
        </figure>
        <div className="card-body lg:w-3/5">
          <h1 className="text-3xl font-bold text-primary">{book.title}</h1>
          <p className="opacity-80">by {book.author}</p>
          <div>
            <span className="badge badge-primary badge-outline">{book.category}</span>
          </div>
          <p className="mt-2">{book.description}</p>
          <p className="text-sm opacity-70">
            Added by {book.userName} ({book.userEmail})
          </p>
          <p className="text-sm font-medium">
            Available copies: {book.copies} / {book.totalCopies}
          </p>
          <div className="card-actions mt-4">
            <button
              className="btn btn-primary"
              disabled={!available}
              onClick={() => setOpen(true)}
            >
              {available ? "Borrow This Book" : "Not Available"}
            </button>
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