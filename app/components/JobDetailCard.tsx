"use client"

import { useState } from "react"
import { BsBookmark, BsCheck2 } from "react-icons/bs"
import { SlLocationPin } from "react-icons/sl"
import { PiMoney } from "react-icons/pi"
import { WiTime5 } from "react-icons/wi"
import { LuUsersRound } from "react-icons/lu"
import { applyToJob } from "@/app/actions/applications"
import { toggleSaveJob } from "@/app/actions/savedJobs"
import { getToken } from "@/app/actions/auth"

type JobDetailCardProps = {
    jobId: string
    title: string
    company: string
    industry: string
    type: string
    level: string
    location: string
    salary: string
    applicants: string
    posted: string
}

const JobDetailCard = ({ jobId, title, company, industry, type, level, location, salary, applicants, posted }: JobDetailCardProps) => {
    const [saved, setSaved] = useState(false)
    const [applying, setApplying] = useState(false)
    const [applyMessage, setApplyMessage] = useState("")
    const [applyMessageType, setApplyMessageType] = useState<"error" | "success" | "info">("info")

    const handleApply = async () => {
        const token = getToken()
        if (!token) { setApplyMessage("Please log in to apply."); setApplyMessageType("error"); return }
        setApplying(true)
        const result = await applyToJob(token, jobId)
        if (result.success) {
            setApplyMessage("Application submitted!"); setApplyMessageType("success")
        } else {
            setApplyMessage(result.error ?? "Failed to apply."); setApplyMessageType("error")
        }
        setApplying(false)
    }

    const handleSave = async () => {
        const token = getToken()
        if (!token) { setApplyMessage("Please log in to save jobs."); setApplyMessageType("error"); return }
        const result = await toggleSaveJob(token, jobId)
        if (result.success) {
            setSaved(result.action === "saved")
        }
    }

    return (
        <div className="card w-full bg-base-100 card-xl mb-5 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-16 rounded-full">
                            <span className="text-3xl">{company[0]}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-md font-normal">{title}</p>
                        <p className="text-xs text-gray-500 font-mono">{company} {industry}</p>
                    </div>
                </h2>
                <div className="text-xs">
                    <p className="badge badge-success badge-sm badge-soft px-1.5 mr-2.5">{type}</p>
                    <p className="badge badge-primary badge-sm badge-soft px-1.5 mr-2.5">{level}</p>
                    <p className="badge badge-info badge-sm badge-soft px-1.5 mr-2.5">Featured</p>
                    <p className="border-b-2 mt-5"></p>
                </div>
                <div className="flex justify-evenly card-actions">
                    <div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <SlLocationPin className="text-xs" />
                            <p className="text-xs">Location</p>
                        </div>
                        <p className="text-sm">{location}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <PiMoney className="text-sm" />
                            <p className="text-xs">Salary</p>
                        </div>
                        <p className="text-sm">{salary}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <LuUsersRound className="text-sm" />
                            <p className="text-xs">Applicants</p>
                        </div>
                        <p className="text-sm">{applicants}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <WiTime5 className="text-sm" />
                            <p className="text-xs">Posted</p>
                        </div>
                        <p className="text-sm">{posted}</p>
                    </div>
                </div>
                {applyMessage && (
                    <p className={`text-sm text-center mt-2 ${applyMessageType === "error" ? "text-red-500" : applyMessageType === "success" ? "text-green-600" : "text-blue-600"}`}>{applyMessage}</p>
                )}
                <div className="flex items-center gap-2 mt-4">
                    <button
                        className="btn flex-1 bg-blue-600 rounded-md text-white flex items-center justify-center gap-2"
                        onClick={handleApply}
                        disabled={applying}
                    >
                        {applying ? "Applying..." : "Apply Now"}
                    </button>
                    <button
                        className={`btn w-10 h-10 border rounded-md flex items-center justify-center p-0 transition-colors duration-150 ${saved ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-neutral-200 text-black hover:bg-blue-50"}`}
                        onClick={handleSave}
                        aria-label={saved ? "Saved" : "Save"}
                    >
                        {saved ? (
                            <span className="relative flex items-center justify-center">
                                <BsBookmark size={20} />
                                <BsCheck2 size={14} className="absolute text-white bg-blue-600 rounded-full -bottom-1 -right-1" />
                            </span>
                        ) : (
                            <BsBookmark size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobDetailCard
