// lib/api/user.ts
import { useQuery } from "@tanstack/react-query";

export const API_BASE_URL = "http://192.168.1.38:3000";

export type User = {
  id: string;
  email: string;
  name?: string;
  password?: string;
  phone?: string;
  profession?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
};

export async function fetchUser(email: string): Promise<User> {
  if (!email) throw new Error("Email is required to fetch user");

  const url = new URL(`${API_BASE_URL}/api/profile`);
  url.searchParams.append("email", email);

  const res = await fetch(url.toString(), {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Erreur lors du chargement de l'utilisateur");
  }

  return res.json();
}

export function useUser(email: string) {
  return useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUser(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });
}

export async function updateUserInfo(data: {
  email: string;
  name?: string;
  phone?: string;
  profession?: string;
}): Promise<void> {
  const url = `${API_BASE_URL}/api/profile`;

  // Create FormData to match your server expected input
  const formData = new FormData();
  formData.append("email", data.email);
  if (data.name) formData.append("name", data.name);
  if (data.phone) formData.append("phone", data.phone);
  if (data.profession) formData.append("profession", data.profession);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Failed to update user info");
  }
}