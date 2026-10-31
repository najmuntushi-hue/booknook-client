"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
    if (password.length < 6) return "Password must be at least 6 characters long";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const image = form.photo.value.trim();
    const password = form.password.value;

    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });
    setLoading(false);

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }
    toast.success("Registration successful! Please login.");
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center text-primary">Create Account</h1>
          <p className="text-center text-sm opacity-70">Join BookNook and start borrowing books</p>

          <input name="name" type="text" placeholder="Full name" className="input input-bordered w-full" required />
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="photo" type="url" placeholder="Photo URL" className="input input-bordered w-full" required />
          <div>
            <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
            {passwordError && <p className="text-error text-sm mt-1">{passwordError}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
          </button>

          <div className="divider text-sm">OR</div>

          <button
            type="button"
            className="btn btn-outline w-full"
            onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
          >
            Continue with Google
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}