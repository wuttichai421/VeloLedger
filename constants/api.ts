// ใช้ได้เมื่อรันแอปบนเว็บ (localhost). ถ้ารันบนมือถือให้เปลี่ยนเป็น IP เครื่องคุณ เช่น http://192.168.1.x:3000
export const API_BASE =
  typeof window !== 'undefined'
    ? 'http://localhost:3001'
    : 'http://localhost:3001';

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T>(path: string, body: object): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}
