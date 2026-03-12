export type SavedJob = {
  id: string
  userId: string
  jobId: string
  savedAt: string
}

export async function getSavedJobs(token: string): Promise<SavedJob[]> {
  const res = await fetch(`/api/saved-jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  return data.userSavedJobs ?? []
}

export async function toggleSaveJob(token: string, jobId: string) {
  const res = await fetch(`/api/jobs/${jobId}/save`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json() as Promise<{ success?: boolean; action?: "saved" | "unsaved"; error?: string }>
}
