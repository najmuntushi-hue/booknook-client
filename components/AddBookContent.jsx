"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Loader from "./Loader";

export default function AddBookContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !user) router.replace("/login?redirect=/add-book");
  }, [isPending, user, router]);

  if (isPending || !user) return <Loader />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.image.files[0];
    if (!file) return toast.error("Please choose a book image");

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: fd }
      );
      const imgData = await imgRes.json();
      if (!imgData.success) throw new Error("Image upload failed");

      await apiFetch("/books", {
        method: "POST",
        body: JSON.stringify({
          title: form.title.value.trim(),
          author: form.author.value.trim(),
          category: form.category.value,
          image: imgData.data.url,
          description: form.description.value.trim(),
          totalCopies: Number(form.totalCopies.value),
        }),
      });
      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(err.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center text-primary">Add a New Book</h1>

          <input name="title" placeholder="Book title" className="input input-bordered w-full" required />
          <input name="author" placeholder="Author name" className="input input-bordered w-full" required />
          <select name="category" className="select select-bordered w-full" defaultValue="Fiction" required>
            <option>Fiction</option>
            <option>Science</option>
            <option>History</option>
            <option>Kids</option>
            <option>Others</option>
          </select>
          <input name="totalCopies" type="number" min="1" defaultValue="1" placeholder="Total copies" className="input input-bordered w-full" required />
          <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" required />
          <textarea name="description" placeholder="Short description" className="textarea textarea-bordered w-full" rows={4} required />
          <input value={user.name} readOnly className="input input-bordered w-full bg-base-200" />
          <input value={user.email} readOnly className="input input-bordered w-full bg-base-200" />

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}