import { useQuery } from "@tanstack/react-query";
export const API_BASE_URL = "http://192.168.1.38:3000";


export type Card = {
  id: string;
  title: string;
  owner: string;         // email
  category: string;
  shared: boolean;
  content: any;          // JSON object, define a tighter type later if needed
  createdAt: string;     // ISO date
  updatedAt: string;     // ISO date
};

export async function fetchCards(owner: string): Promise<Card[]> {
  if (!owner) {
    throw new Error("Email is required to fetch cards.");
  }

  const url = new URL(`${API_BASE_URL}/api/cards`);
  url.searchParams.append("owner", owner);

  const res = await fetch(url.toString(), {
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Erreur lors du chargement des cartes");
  }

  return res.json();
}

// React Query hook to use this fetcher
export function useCards(email: string) {
  return useQuery({
    queryKey: ["cards", email],
    queryFn: () => fetchCards(email),
    enabled: !!email, // prevents query from running if email is not provided
    staleTime: 1000 * 60 * 5,
  });
}
