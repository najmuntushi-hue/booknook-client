"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }
    toast.success("Login successful!");
    router.push(redirect);
    router.refresh();
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirect });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center text-primary">Welcome Back</h1>
          <p className="text-center text-sm opacity-70">Login to your BookNook account</p>

          <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
          <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />

          <div className="text-right">
            <button
              type="button"
              className="link link-hover text-sm"
              onClick={() => toast("Password reset is not available yet")}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </button>

          <div className="divider text-sm">OR</div>

          <button type="button" className="btn btn-outline w-full" onClick={handleGoogle}>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-2">
            New to BookNook?{" "}
            <Link href="/register" className="link link-primary font-medium">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>}>
      <LoginForm />
    </Suspense>
  );
}