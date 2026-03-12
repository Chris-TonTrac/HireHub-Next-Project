"use client"

import { useEffect, useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { getAdminApplications, type Application } from "../actions/applications"
import { getAdminUsers, type AdminUser } from "../actions/admin"
import { getJobs, type Job } from "../actions/jobs"
import { getCompanies, type Company } from "../actions/companies"
import { getToken } from "../actions/auth"
import Loading from "../loading"

const statusOptions = [
    { label: "Applied", value: "applied", color: "bg-blue-100 text-blue-700" },
    { label: "Reviewing", value: "reviewing", color: "bg-orange-100 text-orange-700" },
    { label: "Interview", value: "interview", color: "bg-purple-100 text-purple-700" },
    { label: "Offer", value: "offer", color: "bg-green-100 text-green-700" },
    { label: "Rejected", value: "rejected", color: "bg-red-100 text-red-700" },
]

const AdminApplicants = () => {
    const [applications, setApplications] = useState<Application[]>([])
    const [userMap, setUserMap] = useState<Record<string, AdminUser>>({})
    const [jobMap, setJobMap] = useState<Record<string, Job>>({})
    const [companyMap, setCompanyMap] = useState<Record<string, Company>>({})
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()
        if (!token) { setLoading(false); return }
        const fetchAll = async () => {
            const [appsData, usersData, jobsData, companiesData] = await Promise.all([
                getAdminApplications(token),
                getAdminUsers(token),
                getJobs(),
                getCompanies(),
            ])
            setApplications(appsData)
            setUserMap(Object.fromEntries(usersData.map((u) => [u.id, u])))
            setJobMap(Object.fromEntries(jobsData.map((j) => [j.id, j])))
            setCompanyMap(Object.fromEntries(companiesData.map((c) => [c.id, c])))
            setLoading(false)
        }
        fetchAll()
    }, [])

    const handleStatusChange = (idx: number, newStatus: Application["status"]) => {
        setApplications((prev) =>
            prev.map((app, i) => (i === idx ? { ...app, status: newStatus } : app))
        )
        setDropdownOpen(null)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">All Applicants</h1>
            <div className="bg-white rounded-lg shadow p-6">
                {applications.length === 0 ? (
                    <p className="text-gray-400 text-sm">No applicants yet.</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-neutral-500 text-left">
                                <th className="py-2">Applicant</th>
                                <th className="py-2">Job Applied For</th>
                                <th className="py-2">Applied</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, idx) => {
                                const user = userMap[app.userId]
                                const job = jobMap[app.jobId]
                                const company = job ? companyMap[job.companyId] : null
                                const appliedDays = Math.floor(
                                    (Date.now() - new Date(app.appliedAt).getTime()) / (1000 * 60 * 60 * 24)
                                )
                                const statusObj = statusOptions.find((s) => s.value === app.status) ?? statusOptions[0]

                                return (
                                    <tr key={app.id}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 font-bold text-blue-600 uppercase">
                                                    {(user?.name ?? "?")[0]}
                                                </span>
                                                <div>
                                                    {user?.name ?? app.userId.slice(0, 8)}<br />
                                                    <span className="text-xs text-neutral-400">{user?.email ?? ""}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-white text-xs" style={{ background: "#222" }}>
                                                    {(company?.name ?? "??").slice(0, 2).toUpperCase()}
                                                </span>
                                                <div>
                                                    {job?.title ?? app.jobId.slice(0, 8)}<br />
                                                    <span className="text-xs text-neutral-400">{company?.name ?? ""}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{appliedDays}d ago</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded text-xs ${statusObj.color}`}>{statusObj.label}</span>
                                        </td>
                                        <td className="relative">
                                            <div className="inline-block w-full">
                                                <button
                                                    className="flex items-center gap-2 px-3 py-1 border rounded bg-white hover:bg-neutral-100 text-sm w-36 justify-between"
                                                    style={{ minWidth: "9rem" }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setDropdownOpen(dropdownOpen === idx ? null : idx)
                                                    }}
                                                >
                                                    <span className="truncate">{statusObj.label}</span>
                                                    <FaChevronDown className="ml-1 text-xs" />
                                                </button>
                                                {dropdownOpen === idx && (
                                                    <div className="absolute z-10 mt-1 w-36 bg-white border rounded shadow-lg">
                                                        {statusOptions.map((option) => (
                                                            <button
                                                                key={option.value}
                                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-100 ${option.value === app.status ? "bg-neutral-100 font-semibold" : ""}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    handleStatusChange(idx, option.value as Application["status"])
                                                                }}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default AdminApplicants
