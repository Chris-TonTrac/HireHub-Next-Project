"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import NavigationBar from "@/app/components/NavigationBar"
import JobDetailCard from "@/app/components/JobDetailCard"
import JobDetails from "@/app/components/JobDetails"
import CompanyCard from "@/app/components/CompanyCard"
import SimilarJobs from "@/app/components/SimilarJobs"
import { IoMdArrowBack } from "react-icons/io"
import { getJobById, getJobs, type Job } from "@/app/actions/jobs"
import { getCompanyById, getCompanies, type Company } from "@/app/actions/companies"
import Loading from "@/app/loading"

const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params)
    const [job, setJob] = useState<Job | null>(null)
    const [company, setCompany] = useState<Company | null>(null)
    const [similarJobs, setSimilarJobs] = useState<{ initials: string; color: string; title: string; company: string; salary: string }[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const jobData = await getJobById(id)
            if (!jobData) { setLoading(false); return }

            const [companyData, allJobs, allCompanies] = await Promise.all([
                getCompanyById(jobData.companyId),
                getJobs(),
                getCompanies(),
            ])

            const companyMap = Object.fromEntries(allCompanies.map((c) => [c.id, c]))
            const similar = allJobs
                .filter((j) => j.id !== id && j.experienceLevel === jobData.experienceLevel)
                .slice(0, 3)
                .map((j) => {
                    const co = companyMap[j.companyId]
                    const salaryText =
                        j.salaryMin && j.salaryMax
                            ? `$${Math.round(j.salaryMin / 1000)}k – $${Math.round(j.salaryMax / 1000)}k`
                            : "Undisclosed"
                    return {
                        initials: (co?.name ?? "??").slice(0, 2).toUpperCase(),
                        color: "bg-gray-800",
                        title: j.title,
                        company: co?.name ?? "Unknown",
                        salary: salaryText,
                    }
                })

            setJob(jobData)
            setCompany(companyData)
            setSimilarJobs(similar)
            setLoading(false)
        }
        fetchData()
    }, [id])

    if (loading) return <Loading />

    if (!job) {
        return (
            <div>
                <NavigationBar />
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-gray-500">Job not found.</p>
                </div>
            </div>
        )
    }

    const salaryText =
        job.salaryMin && job.salaryMax
            ? `$${Math.round(job.salaryMin / 1000)}k – $${Math.round(job.salaryMax / 1000)}k`
            : "Undisclosed"

    const deadlineText = job.deadline
        ? new Date(job.deadline).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
        : "Open"

    const postedText = new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })

    return (
        <div>
            <NavigationBar />

            <div className="flex my-6 ml-64">
                <Link href="/jobs" className="btn btn-ghost text-left rounded-md hover:bg-gray-800 hover:text-white text-base flex items-center gap-2 px-0">
                    <IoMdArrowBack className="text-lg" />
                    Back to Jobs
                </Link>
            </div>

            <div className="flex flex-row justify-center w-full gap-8">
                <div className="flex-1 max-w-3xl">
                    <JobDetailCard
                        jobId={job.id}
                        title={job.title}
                        company={company?.name ?? "Unknown"}
                        industry={company?.industry ?? ""}
                        type={job.type}
                        level={job.experienceLevel}
                        location={job.location}
                        salary={salaryText}
                        applicants="N/A"
                        posted={postedText}
                    />
                    <JobDetails
                        description={job.description}
                        requirements={job.requirements}
                        skills={job.skills}
                    />
                </div>

                <div className="flex flex-col gap-6 w-full max-w-sm">
                    <CompanyCard
                        name={company?.name ?? "Unknown"}
                        industry={company?.industry ?? ""}
                        initials={(company?.name ?? "??").slice(0, 2).toUpperCase()}
                        description={company?.description ?? "No description available."}
                        size={company?.size ?? "N/A"}
                        location={company?.location ?? "N/A"}
                        deadline={deadlineText}
                    />
                    <SimilarJobs jobs={similarJobs} />
                </div>
            </div>
        </div>
    )
}

export default page
