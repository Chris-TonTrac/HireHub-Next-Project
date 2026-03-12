import { FaGift, FaCheckCircle, FaChartLine, FaBookmark } from "react-icons/fa"
import type { DashboardStats } from "../actions/dashboard"
import type { Application } from "../actions/applications"
import type { Job } from "../actions/jobs"
import type { Company } from "../actions/companies"

const statusColors: Record<string, string> = {
    interview: "text-purple-700",
    reviewing: "text-yellow-700",
    applied: "text-blue-700",
    offer: "text-green-700",
    rejected: "text-red-600",
}

type Props = {
    stats: DashboardStats
    applications: Application[]
    jobMap: Record<string, Job>
    companyMap: Record<string, Company>
}

const DashboardOverview = ({ stats, applications, jobMap, companyMap }: Props) => {
    const recent = applications.slice(0, 3)

    return (
        <div className="w-full flex flex-col items-center mt-6">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
                    <FaGift className="text-3xl text-blue-500 mb-2" />
                    <span className="text-2xl font-bold text-blue-700">{stats.totalApplied}</span>
                    <span className="text-gray-500 text-sm mt-1">Total Applied</span>
                </div>
                <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
                    <FaCheckCircle className="text-3xl text-purple-500 mb-2" />
                    <span className="text-2xl font-bold text-purple-700">{stats.inInterview}</span>
                    <span className="text-gray-500 text-sm mt-1">In Interview</span>
                </div>
                <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
                    <FaChartLine className="text-3xl text-green-500 mb-2" />
                    <span className="text-2xl font-bold text-green-700">{stats.offers}</span>
                    <span className="text-gray-500 text-sm mt-1">Offers</span>
                </div>
                <div className="bg-base-100 rounded-xl shadow p-6 flex flex-col items-center border border-gray-100">
                    <FaBookmark className="text-3xl text-orange-500 mb-2" />
                    <span className="text-2xl font-bold text-orange-700">{stats.savedCount}</span>
                    <span className="text-gray-500 text-sm mt-1">Saved Jobs</span>
                </div>
            </div>

            <div className="w-full max-w-5xl bg-base-100 rounded-xl shadow p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg">Recent Applications</span>
                </div>
                {recent.length === 0 ? (
                    <p className="text-gray-400 text-sm py-4 text-center">No applications yet.</p>
                ) : (
                    <div className="divide-y">
                        {recent.map((app) => {
                            const job = jobMap[app.jobId]
                            const company = job ? companyMap[job.companyId] : null
                            const initials = (company?.name ?? "??").slice(0, 2).toUpperCase()
                            const appliedDays = Math.floor(
                                (Date.now() - new Date(app.appliedAt).getTime()) / (1000 * 60 * 60 * 24)
                            )
                            const colorClass = statusColors[app.status] ?? "text-gray-600"

                            return (
                                <div key={app.id} className="flex items-center py-4">
                                    <div className="avatar mr-4">
                                        <div className="w-10 rounded-full bg-gray-900 flex items-center justify-center">
                                            <span className="text-white font-bold">{initials}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="font-medium">{job?.title ?? "Unknown Job"}</span>
                                        <span className="text-xs text-gray-500">
                                            {company?.name ?? "Unknown"} · Applied {appliedDays}d ago
                                        </span>
                                    </div>
                                    <span className={`badge badge-md badge-outline font-medium ${colorClass}`}>
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

export default DashboardOverview
