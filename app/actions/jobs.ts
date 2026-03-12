const getBaseUrl = () =>
  typeof window !== "undefined" ? "" : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export type Job = {
  id: string
  companyId: string
  title: string
  description: string
  requirements: string | null
  skills: string[] | null
  type: "full-time" | "part-time" | "contract" | "internship"
  experienceLevel: "intern" | "junior" | "mid" | "senior" | "lead"
  location: string
  salaryMin: number | null
  salaryMax: number | null
  status: "active" | "closed"
  isFeatured: boolean
  deadline: string | null
  postedAt: string
  updatedAt: string
}

export type CreateJobPayload = {
  companyId: string
  title: string
  description: string
  requirements?: string
  skills?: string[]
  type: Job["type"]
  experienceLevel: Job["experienceLevel"]
  location: string
  salaryMin?: number
  salaryMax?: number
  status?: Job["status"]
  isFeatured?: boolean
  deadline?: string
}

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${getBaseUrl()}/api/jobs`)
  const data = await res.json()
  return data.jobs ?? []
}

export async function getFeaturedJobs(): Promise<Job[]> {
  const res = await fetch(`${getBaseUrl()}/api/jobs?featured=true`)
  const data = await res.json()
  return data.featuredJobs ?? []
}

export async function getJobById(id: string): Promise<Job | null> {
  const res = await fetch(`${getBaseUrl()}/api/jobs/${id}`)
  if (!res.ok) return null
  const data = await res.json()
  return data.job ?? null
}

export async function createJob(token: string, payload: CreateJobPayload) {
  const res = await fetch(`/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function updateJob(token: string, id: string, payload: Partial<CreateJobPayload>) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function deleteJob(token: string, id: string) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
