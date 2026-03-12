const TOKEN_KEY = "hirehub_token"

export type AuthTokenPayload = {
  id?: string
  role?: "user" | "admin"
  email?: string
}

export async function login(email: string, password: string) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return res.json() as Promise<{ success?: boolean; token?: string; error?: string }>
}

export async function signup(name: string, email: string, password: string, role?: string) {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  })
  return res.json() as Promise<{ userId?: string; error?: string }>
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function decodeToken(token: string): AuthTokenPayload | null {
  try {
    const base64Url = token.split(".")[1]
    if (!base64Url) return null

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")
    return JSON.parse(atob(padded)) as AuthTokenPayload
  } catch {
    return null
  }
}

export function getCurrentUser() {
  const token = getToken()
  if (!token) return null

  return decodeToken(token)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
