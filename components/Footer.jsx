import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <span>📚</span> BookNook
          </Link>
          <p className="mt-3 text-sm opacity-80">
            A small online library where you can add a book, borrow a book and return a book.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm opacity-80">Dhaka, Bangladesh</p>
          <p className="text-sm opacity-80">support@booknook.com</p>
          <p className="text-sm opacity-80">+880 1700-000000</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="btn btn-circle btn-sm btn-outline">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="btn btn-circle btn-sm btn-outline">f</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-circle btn-sm btn-outline">G</a>
          </div>
        </div>
      </div>
      <div className="border-t border-base-300 text-center py-4 text-sm opacity-80">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}