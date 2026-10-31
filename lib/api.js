import { authClient } from "@/lib/auth-client";

export async function getToken() {
  const { data } = await authClient.token();
  return data?.token;
}

export async function apiFetch(path, options = {}) {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}