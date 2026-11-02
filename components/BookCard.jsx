"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#6b7280" font-size="20" text-anchor="middle" dominant-baseline="middle">Image unavailable</text></svg>'
  );

export default function BookCard({ book, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -10, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="card bg-base-100 shadow-md hover:shadow-2xl h-full relative hover:z-10"
    >
      <figure className="h-64 w-full overflow-hidden">
        <motion.img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER;
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{book.title}</h2>
        <p className="text-sm opacity-80">by {book.author}</p>
        <div>
          <span className="badge badge-primary badge-outline">{book.category}</span>
        </div>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/books/${book._id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}