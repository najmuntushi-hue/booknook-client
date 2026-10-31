"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Loader from "./Loader";

export default function ProfileContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) router.replace("/login?redirect=/profile");
  }, [isPending, user, router]);

  if (isPending || !user) return <Loader />;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-28 rounded-full">
              <img src={user.image || "https://i.pravatar.cc/150?img=12"} alt={user.name} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary">{user.name}</h1>
          <p className="opacity-80">{user.email}</p>
        </div>
      </div>
    </div>
  );
}