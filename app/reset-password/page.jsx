"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validate = (p) => {
    if (!/[A-Z]/.test(p)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(p)) return "Password must have a lowercase letter";
    if (p.length < 6) return "Password must be at least 6 characters long";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const err = validate(password);
    setPasswordError(err);
    if (err) return;
    if (!token) return toast.error("Invalid or expired reset link");

    setLoading(true);
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Failed to reset password");
      return;
    }
    toast.success("Password reset successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold text-center text-primary">Reset Password</h1>
          <div>
            <input name="password" type="password" placeholder="New password" className="input input-bordered w-full" required />
            {passwordError && <p className="text-error text-sm mt-1">{passwordError}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>}>
      <ResetForm />
    </Suspense>
  );
}