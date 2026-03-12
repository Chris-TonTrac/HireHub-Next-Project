export type AdminStats = {
  activeJobs: number
  totalApplicants: number
  inInterview: number
  offersExtended: number
}

export type AdminUser = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

export async function getAdminStats(token: string): Promise<AdminStats> {
  const res = await fetch(`/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function getAdminUsers(token: string): Promise<AdminUser[]> {
  const res = await fetch(`/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.allUsers ?? []
}

export async function deleteAdminUser(token: string, userId: string) {
  const res = await fetch(`/api/admin/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json() as Promise<{ success?: boolean; error?: string }>
}
