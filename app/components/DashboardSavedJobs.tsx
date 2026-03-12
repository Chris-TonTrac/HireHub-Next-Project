import Link from "next/link"
import { GoOrganization } from "react-icons/go"
import type { SavedJob } from "../actions/savedJobs"
import type { Job } from "../actions/jobs"
import type { Company } from "../actions/companies"

type Props = {
    savedJobs: SavedJob[]
    jobMap: Record<string, Job>
    companyMap: Record<string, Company>
}

const DashboardSavedJobs = ({ savedJobs, jobMap, companyMap }: Props) => {
    return (
        <div className="w-full flex flex-col items-center mt-6">
            <div className="w-full max-w-5xl">
                <span className="font-semibold text-lg mb-4 block">Saved Jobs ({savedJobs.length})</span>
                {savedJobs.length === 0 ? (
                    <p className="text-gray-400 text-sm">No saved jobs yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedJobs.map((saved) => {
                            const job = jobMap[saved.jobId]
                            const company = job ? companyMap[job.companyId] : null
                            const salaryText =
                                job?.salaryMin && job?.salaryMax
                                    ? `$${Math.round(job.salaryMin / 1000)}k – $${Math.round(job.salaryMax / 1000)}k`
                                    : "Undisclosed"

                            return (
                                <div key={saved.id} className="card card-border border border-blue-600 bg-white w-full shadow-md hover:scale-105 transition-transform">
                                    <div className="card-body">
                                        <h2 className="card-title flex gap-3 items-center">
                                            <GoOrganization className="text-5xl" />
                                            <div>
                                                <p>{job?.title ?? "Unknown Job"}</p>
                                                <p className="px-1 text-xs font-normal">{company?.name ?? "Unknown"}</p>
                                            </div>
                                        </h2>
                                        <div className="mt-2 flex gap-2">
                                            <span className="badge badge-success badge-soft px-1.5">{job?.type ?? ""}</span>
                                            <span className="badge badge-primary badge-soft px-1.5">{job?.experienceLevel ?? ""}</span>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">
                                            {job?.location ?? ""} · {salaryText}
                                        </p>
                                        <div className="card-actions justify-end mt-4">
                                            <Link href={`/jobs/${saved.jobId}`} className="btn btn-primary">View Job</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardSavedJobs
