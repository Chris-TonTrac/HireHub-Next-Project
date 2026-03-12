"use client"

import { useEffect, useState } from "react"
import { getAdminStats, getAdminUsers, type AdminStats, type AdminUser } from "../actions/admin"
import { getAdminApplications, type Application } from "../actions/applications"
import { getJobs, type Job } from "../actions/jobs"
import { getCompanies, type Company } from "../actions/companies"
import { getToken } from "../actions/auth"
import Loading from "../loading"

const statusColors: Record<string, string> = {
    interview: "bg-purple-100 text-purple-700",
    reviewing: "bg-orange-100 text-orange-700",
    applied: "bg-blue-100 text-blue-700",
    offer: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
}

const AdminOverview = () => {
    const [stats, setStats] = useState<AdminStats>({ activeJobs: 0, totalApplicants: 0, inInterview: 0, offersExtended: 0 })
    const [applications, setApplications] = useState<Application[]>([])
    const [users, setUsers] = useState<AdminUser[]>([])
    const [jobMap, setJobMap] = useState<Record<string, Job>>({})
    const [companyMap, setCompanyMap] = useState<Record<string, Company>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()
        if (!token) { setLoading(false); return }
        const fetchAll = async () => {
            const [statsData, appsData, usersData, jobsData, companiesData] = await Promise.all([
                getAdminStats(token),
                getAdminApplications(token),
                getAdminUsers(token),
                getJobs(),
                getCompanies(),
            ])
            setStats(statsData)
            setApplications(appsData)
            setUsers(usersData)
            setJobMap(Object.fromEntries(jobsData.map((j) => [j.id, j])))
            setCompanyMap(Object.fromEntries(companiesData.map((c) => [c.id, c])))
            setLoading(false)
        }
        fetchAll()
    }, [])

    if (loading) {
        return <Loading />
    }

    const recentApps = applications.slice(0, 5)

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <span className="text-blue-600 text-3xl font-bold">{stats.activeJobs}</span>
                    <span className="text-xs text-neutral-500">Active Jobs</span>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <span className="text-purple-600 text-3xl font-bold">{stats.totalApplicants}</span>
                    <span className="text-xs text-neutral-500">Total Applicants</span>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <span className="text-orange-500 text-3xl font-bold">{stats.inInterview}</span>
                    <span className="text-xs text-neutral-500">In Interview</span>
                </div>
                <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                    <span className="text-green-600 text-3xl font-bold">{stats.offersExtended}</span>
                    <span className="text-xs text-neutral-500">Offers Extended</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
                {recentApps.length === 0 ? (
                    <p className="text-gray-400 text-sm">No applications yet.</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-neutral-500 text-left">
                                <th className="py-2">Applicant</th>
                                <th className="py-2">Job</th>
                                <th className="py-2">Status</th>
                                <th className="py-2 text-center">Applied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApps.map((app) => {
                                const job = jobMap[app.jobId]
                                const appliedDays = Math.floor(
                                    (Date.now() - new Date(app.appliedAt).getTime()) / (1000 * 60 * 60 * 24)
                                )
                                const colorClass = statusColors[app.status] ?? "bg-gray-100 text-gray-700"
                                return (
                                    <tr key={app.id}>
                                        <td className="py-2">{app.userId.slice(0, 8)}…</td>
                                        <td>{job?.title ?? app.jobId.slice(0, 8)}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded text-xs ${colorClass}`}>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="text-center">{appliedDays}d ago</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Registered Users</h2>
                {users.length === 0 ? (
                    <p className="text-gray-400 text-sm">No users yet.</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-neutral-500 text-left">
                                <th className="py-2">User</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Role</th>
                                <th className="py-2">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {
                                const joinedDays = Math.floor(
                                    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
                                )
                                return (
                                    <tr key={user.id}>
                                        <td className="py-2">{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{joinedDays}d ago</td>
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

export default AdminOverview
