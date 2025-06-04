export const API_BASE_URL = "http://192.168.1.38:3000"; // adapt to your network/IP

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profession?: string;
};

export type RegisterResponse = {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profession?: string;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
};

export async function registerUser(data: {
  email: string;
  name: string;
  password: string;
  phone: string;
  profession: string;
}) {
  const form = new FormData();
  form.append('email', data.email);
  form.append('name', data.name);
  form.append('password', data.password);
  form.append('phone', data.phone);
  form.append('profession', data.profession);

  const res = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    body: form,
    // Do NOT set Content-Type manually! Let fetch handle it
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.error || 'Erreur lors de l’enregistrement');
  }

  return res.json();
}