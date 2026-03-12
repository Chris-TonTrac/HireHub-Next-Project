"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { getJobs, deleteJob, type Job } from "../actions/jobs"
import { getCompanies, type Company } from "../actions/companies"
import { getAdminApplications } from "../actions/applications"
import { getToken } from "../actions/auth"
import Loading from "../loading"

const AdminManageJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([])
    const [companyMap, setCompanyMap] = useState<Record<string, Company>>({})
    const [appCountMap, setAppCountMap] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()
        const fetchAll = async () => {
            const [jobsData, companiesData, appsData] = await Promise.all([
                getJobs(),
                getCompanies(),
                token ? getAdminApplications(token) : Promise.resolve([]),
            ])
            const counts: Record<string, number> = {}
            appsData.forEach((app) => {
                counts[app.jobId] = (counts[app.jobId] ?? 0) + 1
            })
            setJobs(jobsData)
            setCompanyMap(Object.fromEntries(companiesData.map((c) => [c.id, c])))
            setAppCountMap(counts)
            setLoading(false)
        }
        fetchAll()
    }, [])

    const handleDelete = async (jobId: string) => {
        const token = getToken()
        if (!token) return
        const result = await deleteJob(token, jobId)
        if (result.success !== undefined || result.error === undefined) {
            setJobs((prev) => prev.filter((j) => j.id !== jobId))
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Manage Jobs</h1>
            <div className="bg-white rounded-lg shadow p-6">
                {jobs.length === 0 ? (
                    <p className="text-gray-400 text-sm">No jobs posted yet.</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-neutral-500 text-left">
                                <th className="py-2">Job Title</th>
                                <th className="py-2">Company</th>
                                <th className="py-2">Type</th>
                                <th className="py-2">Applicants</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td className="py-2">{job.title}</td>
                                    <td>{companyMap[job.companyId]?.name ?? "Unknown"}</td>
                                    <td>{job.type}</td>
                                    <td className="font-bold">{appCountMap[job.id] ?? 0}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded text-xs ${job.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="inline-flex gap-2">
                                            <Button size="xs" variant="outline"><FiEdit2 /></Button>
                                            <Button size="xs" variant="destructive" onClick={() => handleDelete(job.id)}><FiTrash2 /></Button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default AdminManageJobs
