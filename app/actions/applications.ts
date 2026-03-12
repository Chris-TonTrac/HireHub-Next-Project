export type Application = {
  id: string
  userId: string
  jobId: string
  status: "applied" | "reviewing" | "interview" | "offer" | "rejected"
  appliedAt: string
  updatedAt: string
}

export async function applyToJob(token: string, jobId: string) {
  const res = await fetch(`/api/jobs/${jobId}/apply`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json() as Promise<{ success?: boolean; applicationId?: string; error?: string }>
}

export async function getUserApplications(token: string): Promise<Application[]> {
  const res = await fetch(`/api/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.userApplications ?? []
}

export async function getAdminApplications(token: string): Promise<Application[]> {
  const res = await fetch(`/api/admin/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.allApplications ?? []
}

export async function updateAdminApplicationStatus(
  token: string,
  applicationId: string,
  status: Application["status"]
) {
  const res = await fetch(`/api/admin/applications`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ applicationId, status }),
  })

  return res.json() as Promise<{ applicationId?: string; error?: string }>
}
