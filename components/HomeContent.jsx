"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BookCard from "./BookCard";
import Loader from "./Loader";

const slides = [
  { title: "Find Your Next Great Read", text: "Explore a growing collection of books shared by our readers.", bg: "from-indigo-600 to-purple-600" },
  { title: "Borrow in Just One Click", text: "Pick a book, borrow it for seven days and enjoy reading.", bg: "from-emerald-600 to-teal-600" },
  { title: "Share Your Own Books", text: "Add your books to BookNook and let others discover them.", bg: "from-rose-600 to-orange-500" },
];

const categories = [
  { name: "Fiction", icon: "📖" },
  { name: "Science", icon: "🔬" },
  { name: "History", icon: "🏛️" },
  { name: "Kids", icon: "🧸" },
];

const steps = [
  { title: "Create an Account", text: "Register for free and log in to BookNook." },
  { title: "Choose a Book", text: "Browse all books and open the one you like." },
  { title: "Borrow & Return", text: "Borrow it for a week, then return it from My Borrows." },
];

export default function HomeContent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`)
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3500 }} pagination={{ clickable: true }} loop>
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div className={`bg-gradient-to-r ${s.bg} text-white h-[420px] flex flex-col items-center justify-center text-center px-6`}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{s.title}</h1>
              <p className="max-w-xl mb-6 text-lg">{s.text}</p>
              <Link href="/books" className="btn btn-neutral">Browse Books</Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        {loading ? (
          <Loader />
        ) : books.length === 0 ? (
          <p className="text-center opacity-70">No books added yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => <BookCard key={b._id} book={b} />)}
          </div>
        )}
        <div className="text-center mt-8">
          <Link href="/books" className="btn btn-primary">See All Books</Link>
        </div>
      </section>

      <section className="bg-base-200 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <div key={c.name} className="card bg-base-100 shadow-md h-40 items-center justify-center">
                <span className="text-4xl">{c.icon}</span>
                <p className="font-semibold mt-2">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-center mb-8">How Borrowing Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card bg-base-100 shadow-md h-48">
              <div className="card-body items-center text-center">
                <div className="badge badge-primary badge-lg">{i + 1}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="text-sm opacity-80">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}