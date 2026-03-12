import type { Application } from "../actions/applications"
import type { Job } from "../actions/jobs"
import type { Company } from "../actions/companies"

const statusColors: Record<string, string> = {
    interview: "badge-outline text-purple-700",
    reviewing: "badge-outline badge-warning text-yellow-700",
    applied: "badge-outline badge-info text-blue-700",
    offer: "badge-outline badge-success text-green-700",
    rejected: "badge-outline badge-error text-red-600",
}

type Props = {
    applications: Application[]
    jobMap: Record<string, Job>
    companyMap: Record<string, Company>
}

const DashboardApplications = ({ applications, jobMap, companyMap }: Props) => {
    return (
        <div className="w-full flex flex-col items-center mt-6">
            <div className="w-full max-w-5xl">
                <span className="font-semibold text-lg mb-4 block">My Applications</span>
                {applications.length === 0 ? (
                    <p className="text-gray-400 text-sm">No applications yet.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {applications.map((app) => {
                            const job = jobMap[app.jobId]
                            const company = job ? companyMap[job.companyId] : null
                            const initials = (company?.name ?? "??").slice(0, 2).toUpperCase()
                            const appliedDays = Math.floor(
                                (Date.now() - new Date(app.appliedAt).getTime()) / (1000 * 60 * 60 * 24)
                            )
                            const updatedDays = Math.floor(
                                (Date.now() - new Date(app.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
                            )
                            const badgeClass = statusColors[app.status] ?? "badge-outline text-gray-600"

                            return (
                                <div key={app.id} className="bg-base-100 rounded-xl shadow p-4 border border-gray-100 flex items-center">
                                    <div className="avatar mr-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{initials}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="font-semibold text-base">{job?.title ?? "Unknown Job"}</span>
                                        <span className="text-sm text-gray-500">
                                            {company?.name ?? "Unknown"} · {job?.location ?? ""}
                                        </span>
                                        <div className="flex gap-6 mt-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><circle cx="8" cy="8" r="7"/></svg>
                                                Applied {appliedDays}d ago
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M8 3v5l4 2"/></svg>
                                                Updated {updatedDays}d ago
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`badge badge-md font-medium ${badgeClass}`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardApplications
