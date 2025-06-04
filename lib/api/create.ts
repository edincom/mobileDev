export const API_BASE_URL = "http://192.168.1.38:3000"; // adjust if needed

export type Card = {
  id: string;
  title: string;
  category: string;
  content: any; // will contain the generated questions
  shared: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

export type GenerateCardInput = {
  title: string;
  category: string;
  content: string;
  owner: string;
};

export async function generateCard(data: GenerateCardInput): Promise<Card> {
  const res = await fetch(`${API_BASE_URL}/api/create/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || "Erreur lors de la génération de la carte");
  }

  const response = await res.json();
  return response.card;
}
