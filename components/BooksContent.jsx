"use client";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Loader from "./Loader";

export default function BooksContent() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">All Books</h1>
      {books.length === 0 ? (
        <p className="text-center opacity-70">No books found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => <BookCard key={b._id} book={b} />)}
        </div>
      )}
    </div>
  );
}