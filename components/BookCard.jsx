"use client";
import Link from "next/link";
import { motion } from "framer-motion";

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