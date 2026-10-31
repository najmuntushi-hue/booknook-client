"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { title: "Find Your Next Great Read", text: "Explore a growing collection of books shared by our readers.", image: "/book-wallpaper.jpg" },
  { title: "Borrow in Just One Click", text: "Pick a book, borrow it for seven days and enjoy reading.", image: "/slide2.jpg" },
  { title: "Share Your Own Books", text: "Add your books to BookNook and let others discover them.", image: "/slide3.jpg" },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3500 }} pagination={{ clickable: true }} loop>
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div
            className="relative h-[480px] flex flex-col items-center justify-center text-center px-6 text-white bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{s.title}</h1>
              <p className="max-w-xl mx-auto mb-6 text-lg">{s.text}</p>
              <Link href="/books" className="btn btn-primary">Browse Books</Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}