"use client"

import { Button } from "@/components/ui/button"

const sidebarLinks = [
    { label: "Overview" },
    { label: "Manage Jobs" },
    { label: "Applicants" },
    { label: "Post New Job" },
]

type AdminSidebarProps = {
    activeTab: string
    onTabChange: (tab: string) => void
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
    return (
        <aside className="w-64 bg-white border-r border-border-default flex flex-col justify-between py-6 px-4">
            <div>
                <div className="mb-8">
                    <span className="font-bold text-lg text-blue-900">Admin Panel</span>
                    <div className="text-xs text-neutral-500">HireHub</div>
                </div>
                <nav className="flex flex-col gap-2">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => onTabChange(link.label)}
                            className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${activeTab === link.label ? "bg-blue-100 text-blue-900 font-semibold" : "text-neutral-700 hover:bg-blue-50"}`}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>
            </div>
            <Button variant="destructive" className="w-full mt-8" size="default">
                Log out
            </Button>
        </aside>
    )
}

export default AdminSidebar
