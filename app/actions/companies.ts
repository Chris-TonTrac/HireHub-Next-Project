const getBaseUrl = () =>
  typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export type Company = {
  id: string
  name: string
  industry: string | null
  description: string | null
  logoUrl: string | null
  location: string | null
  size: string | null
  websiteUrl: string | null
  createdAt: string
}

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${getBaseUrl()}/api/companies`)
  const data = await res.json()
  return data.companies ?? []
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const res = await fetch(`${getBaseUrl()}/api/companies/${id}`)
  if (!res.ok) return null
  const data = await res.json()
  return data.company ?? null
}

export async function createCompany(payload: {
  name: string
  industry?: string
  description?: string
  logoUrl?: string
  location?: string
  size?: string
  websiteUrl?: string
}) {
  const res = await fetch(`/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return res.json()
}
