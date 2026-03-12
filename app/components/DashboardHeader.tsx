"use client"

import Link from "next/link"
import { GrOverview } from "react-icons/gr"
import { MdOutlineLibraryBooks, MdBookmarkBorder } from "react-icons/md"
import { IoMdArrowBack } from "react-icons/io"

type DashboardHeaderProps = {
    activeTab: string
    onTabChange: (tab: string) => void
    name: string
    applicationCount: number
    savedCount: number
}

const DashboardHeader = ({ activeTab, onTabChange, name, applicationCount, savedCount }: DashboardHeaderProps) => {
    return (
        <div className="bg-base-100 shadow-sm w-full flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col">
                <Link href="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-slate-900 transition mt-4 w-fit">
                    <IoMdArrowBack />
                    Back to Home
                </Link>
                <div className="flex gap-x-3 items-center mt-4">
                    <div className="avatar avatar-online">
                        <div className="w-12 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-lg">Welcome back, {name}!</p>
                        <p className="text-gray-400 text-xs">{applicationCount} active applications · {savedCount} saved jobs</p>
                    </div>
                </div>
                <div className="flex gap-x-2.5 mt-6 mb-1.5">
                    <div
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium cursor-pointer ${activeTab === "overview" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700"}`}
                        onClick={() => onTabChange("overview")}
                    >
                        <GrOverview />
                        <span>Overview</span>
                    </div>
                    <div
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium cursor-pointer ${activeTab === "applications" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700"}`}
                        onClick={() => onTabChange("applications")}
                    >
                        <MdOutlineLibraryBooks />
                        <span>Applications</span>
                        <span className="ml-1 bg-gray-200 text-xs text-gray-600 px-2 py-0.5 rounded-full">{applicationCount}</span>
                    </div>
                    <div
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium cursor-pointer ${activeTab === "saved" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700"}`}
                        onClick={() => onTabChange("saved")}
                    >
                        <MdBookmarkBorder />
                        <span>Saved Jobs</span>
                        <span className="ml-1 bg-gray-200 text-xs text-gray-600 px-2 py-0.5 rounded-full">{savedCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
