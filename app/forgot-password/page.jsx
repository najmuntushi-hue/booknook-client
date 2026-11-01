
"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    setLoading(true);
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Failed to send reset email");
      return;
    }
    toast.success("Reset link sent! Please check your email.");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center text-primary">Forgot Password</h1>
          <p className="text-center text-sm opacity-70">Enter your email and we will send a reset link</p>
          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Send Reset Link"}
          </button>
          <p className="text-center text-sm">
            <Link href="/login" className="link link-primary">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}