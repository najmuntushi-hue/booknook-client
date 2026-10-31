"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";

export default function MyBooksContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isPending && !user) router.replace("/login?redirect=/my-books");
  }, [isPending, user, router]);

  useEffect(() => {
    if (!user) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((res) => res.json())
      .then((data) =>
        setBooks(Array.isArray(data) ? data.filter((b) => b.userEmail === user.email) : [])
      )
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (isPending || !user || loading) return <Loader />;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const f = e.target;
    const updated = {
      title: f.title.value.trim(),
      author: f.author.value.trim(),
      category: f.category.value,
      image: f.image.value.trim(),
      description: f.description.value.trim(),
    };
    setSaving(true);
    try {
      await apiFetch(`/books/${editBook._id}`, {
        method: "PATCH",
        body: JSON.stringify(updated),
      });
      setBooks((prev) => prev.map((b) => (b._id === editBook._id ? { ...b, ...updated } : b)));
      toast.success("Book updated successfully!");
      setEditBook(null);
    } catch (err) {
      toast.error(err.message || "Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiFetch(`/books/${deleteBook._id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== deleteBook._id));
      toast.success("Book deleted successfully!");
      setDeleteBook(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete book");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Books</h1>

      {books.length === 0 ? (
        <p className="text-center opacity-70">You have not added any books yet.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Copies</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <img src={b.image} alt={b.title} className="w-14 h-20 object-cover rounded" />
                  </td>
                  <td className="font-medium">{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.copies} / {b.totalCopies}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => setEditBook(b)}>Edit</button>
                    <button className="btn btn-error btn-sm" onClick={() => setDeleteBook(b)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editBook && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Edit Book</h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input name="title" defaultValue={editBook.title} className="input input-bordered w-full" required />
              <input name="author" defaultValue={editBook.author} className="input input-bordered w-full" required />
              <select name="category" defaultValue={editBook.category} className="select select-bordered w-full">
                <option>Fiction</option>
                <option>Science</option>
                <option>History</option>
                <option>Kids</option>
                <option>Others</option>
              </select>
              <input name="image" type="url" defaultValue={editBook.image} className="input input-bordered w-full" required />
              <textarea name="description" defaultValue={editBook.description} rows={4} className="textarea textarea-bordered w-full" required />
              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setEditBook(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteBook && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Delete Book?</h3>
            <p className="py-4">
              Are you sure you want to delete <span className="font-semibold">{deleteBook.title}</span>? This cannot be undone.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setDeleteBook(null)}>Cancel</button>
              <button className="btn btn-error" disabled={deleting} onClick={handleDelete}>
                {deleting ? <span className="loading loading-spinner loading-sm"></span> : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}