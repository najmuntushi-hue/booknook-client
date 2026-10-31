"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function MyBorrowsContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (!isPending && !user) router.replace("/login?redirect=/my-borrows");
  }, [isPending, user, router]);

  useEffect(() => {
    if (!user) return;
    apiFetch("/borrows")
      .then((data) => setBorrows(Array.isArray(data) ? data : []))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const handleReturn = async (id) => {
    setReturningId(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE" });
      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to return book");
    } finally {
      setReturningId(null);
    }
  };

  if (isPending || !user || loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Borrows</h1>
      {borrows.length === 0 ? (
        <p className="text-center opacity-70">You have not borrowed any books yet.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img src={b.bookImage} alt={b.bookTitle} className="w-14 h-20 object-cover rounded" />
                  </td>
                  <td className="font-medium">{b.bookTitle}</td>
                  <td>{fmt(b.borrowDate)}</td>
                  <td>{fmt(b.returnDate)}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={returningId === b._id}
                      onClick={() => handleReturn(b._id)}
                    >
                      {returningId === b._id ? <span className="loading loading-spinner loading-xs"></span> : "Return Book"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}