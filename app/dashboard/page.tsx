"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "../components/DashboardHeader"
import DashboardOverview from "../components/DashboardOverview"
import DashboardApplications from "../components/DashboardApplications"
import DashboardSavedJobs from "../components/DashboardSavedJobs"
import { getDashboardStats, type DashboardStats } from "../actions/dashboard"
import { getUserApplications, type Application } from "../actions/applications"
import { getSavedJobs, type SavedJob } from "../actions/savedJobs"
import { getJobs, type Job } from "../actions/jobs"
import { getCompanies, type Company } from "../actions/companies"
import { getToken } from "../actions/auth"
import Loading from "../loading"

const page = () => {
    const [activeTab, setActiveTab] = useState("overview")
    const [stats, setStats] = useState<DashboardStats>({ totalApplied: 0, inInterview: 0, offers: 0, savedCount: 0 })
    const [applications, setApplications] = useState<Application[]>([])
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
    const [jobs, setJobs] = useState<Job[]>([])
    const [companies, setCompanies] = useState<Company[]>([])
    const [userName, setUserName] = useState("User")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = getToken()
        if (!token) { setLoading(false); return }

        // Decode name from JWT payload
        try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            if (payload.email) setUserName(payload.email.split("@")[0])
        } catch {}

        const fetchAll = async () => {
            const [statsData, appsData, savedData, jobsData, companiesData] = await Promise.all([
                getDashboardStats(token),
                getUserApplications(token),
                getSavedJobs(token),
                getJobs(),
                getCompanies(),
            ])
            setStats(statsData)
            setApplications(appsData)
            setSavedJobs(savedData)
            setJobs(jobsData)
            setCompanies(companiesData)
            setLoading(false)
        }
        fetchAll()
    }, [])

    const jobMap = Object.fromEntries(jobs.map((j) => [j.id, j]))
    const companyMap = Object.fromEntries(companies.map((c) => [c.id, c]))

    if (loading) return <Loading />

    return (
        <div>
            <DashboardHeader
                activeTab={activeTab}
                onTabChange={setActiveTab}
                name={userName}
                applicationCount={stats.totalApplied}
                savedCount={stats.savedCount}
            />

            {activeTab === "overview" && (
                <DashboardOverview
                    stats={stats}
                    applications={applications}
                    jobMap={jobMap}
                    companyMap={companyMap}
                />
            )}
            {activeTab === "applications" && (
                <DashboardApplications
                    applications={applications}
                    jobMap={jobMap}
                    companyMap={companyMap}
                />
            )}
            {activeTab === "saved" && (
                <DashboardSavedJobs
                    savedJobs={savedJobs}
                    jobMap={jobMap}
                    companyMap={companyMap}
                />
            )}
        </div>
    )
}

export default page
