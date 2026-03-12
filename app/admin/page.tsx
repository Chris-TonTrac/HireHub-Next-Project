"use client"

import { useState } from "react"
import AdminSidebar from "../components/AdminSidebar"
import AdminOverview from "../components/AdminOverview"
import AdminManageJobs from "../components/AdminManageJobs"
import AdminApplicants from "../components/AdminApplicants"
import AdminPostNewJob from "../components/AdminPostNewJob"

const Page = () => {
    const [activeTab, setActiveTab] = useState("Overview")

    const renderTab = () => {
        switch (activeTab) {
            case "Overview": return <AdminOverview />
            case "Manage Jobs": return <AdminManageJobs />
            case "Applicants": return <AdminApplicants />
            case "Post New Job": return <AdminPostNewJob />
            default: return null
        }
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="flex-1 bg-neutral-50 p-8 overflow-y-auto">
                {renderTab()}
            </main>
        </div>
    )
}

export default Page
