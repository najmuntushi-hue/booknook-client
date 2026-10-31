"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Loader from "./Loader";

export default function ProfileContent() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !user) router.replace("/login?redirect=/profile");
  }, [isPending, user, router]);

  if (isPending || !user) return <Loader />;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await authClient.updateUser({
      name: e.target.name.value.trim(),
      image: e.target.image.value.trim(),
    });
    setSaving(false);
    if (error) {
      toast.error(error.message || "Failed to update profile");
      return;
    }
    toast.success("Profile updated successfully!");
    setEditing(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        {!editing ? (
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img src={user.image || "https://i.pravatar.cc/150?img=12"} alt={user.name} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary">{user.name}</h1>
            <p className="opacity-80">{user.email}</p>
            <button className="btn btn-primary mt-3" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="card-body gap-3">
            <h1 className="text-2xl font-bold text-center text-primary">Edit Profile</h1>
            <input name="name" defaultValue={user.name} className="input input-bordered w-full" placeholder="Name" required />
            <input name="image" type="url" defaultValue={user.image || ""} className="input input-bordered w-full" placeholder="Photo URL" required />
            <input value={user.email} readOnly className="input input-bordered w-full bg-base-200" />
            <div className="flex gap-2 justify-end">
              <button type="button" className="btn" onClick={() => setEditing(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}