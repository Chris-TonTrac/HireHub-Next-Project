export type DashboardStats = {
  totalApplied: number
  inInterview: number
  offers: number
  savedCount: number
}

export async function getDashboardStats(token: string): Promise<DashboardStats> {
  const res = await fetch(`/api/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
