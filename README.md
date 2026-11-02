# BookNook

**Live Site:** https://booknook-client-ten.vercel.app

BookNook is a small online library. The idea is simple: **add a book, borrow a book, return a book.** Users can browse all books, add their own books, borrow a book for seven days, and return it from their borrow list.

## Features

- **Secure authentication:** Email and password register and login with password validation, Google login, and forgot/reset password, built with BetterAuth and the MongoDB adapter.
- **Protected routes with JWT:** Add Book, My Books, My Borrows and Book Details are private. Server APIs are protected with JWT verification.
- **Add, edit and delete books:** Upload book covers to imgbb, update books with a pre-filled form, and delete with a confirm modal.
- **Borrow system:** Borrow a book from the details page, see it in My Borrows, and return it. Available copies go down on borrow and up on return.
- **No double borrow:** A user cannot borrow the same book twice at the same time, and books with zero copies show "Not Available".
- **Browse by category:** Filter books by Fiction, Science, History, Kids and Others from the home page or All Books.
- **Modern UI:** Swiper.js hero slider, latest six new arrivals, Framer Motion card animation, dark and light theme, and a fully responsive layout.
- **Profile management:** View and edit your name and photo.
- **Helpful feedback:** Loading spinners, toast messages for every action, custom 404 page and a unique page title on every route.

## Tech Stack

- Next.js (App Router), React, Tailwind CSS, daisyUI
- BetterAuth, MongoDB adapter, JWT
- Swiper.js, Framer Motion, React Hot Toast
- Express.js and MongoDB (server repository)

## Server Repository

https://github.com/najmuntushi-hue/booknook-server

## Run Locally

  bash
git clone https://github.com/najmuntushi-hue/booknook-client.git
cd booknook-client
npm install
npm run dev


Create a `.env.local` file with these variables:


MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GMAIL_USER=
GMAIL_APP_PASSWORD=
