"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BookCard from "./BookCard";
import Loader from "./Loader";

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];

function BooksList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const filtered =
    category === "All" ? books : books.filter((b) => b.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">
        {category === "All" ? "All Books" : `${category} Books`}
      </h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((c) => (
          <Link
            key={c}
            href={c === "All" ? "/books" : `/books?category=${c}`}
            className={`btn btn-sm ${category === c ? "btn-primary" : "btn-outline btn-primary"}`}
          >
            {c}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center opacity-70">No books found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b, i) => (
            <BookCard key={b._id} book={b} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BooksContent() {
  return (
    <Suspense fallback={<Loader />}>
      <BooksList />
    </Suspense>
  );
}