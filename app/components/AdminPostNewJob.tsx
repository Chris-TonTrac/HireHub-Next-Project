"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createJob, type CreateJobPayload } from "../actions/jobs"
import { getCompanies, type Company } from "../actions/companies"
import { getToken } from "../actions/auth"

const AdminPostNewJob = () => {
    const [companies, setCompanies] = useState<Company[]>([])
    const [message, setMessage] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        companyId: "",
        title: "",
        type: "full-time" as CreateJobPayload["type"],
        experienceLevel: "mid" as CreateJobPayload["experienceLevel"],
        location: "",
        salaryMin: "",
        salaryMax: "",
        skills: "",
        description: "",
        requirements: "",
    })

    useEffect(() => {
        getCompanies().then((data) => {
            setCompanies(data)
            if (data.length > 0) setForm((prev) => ({ ...prev, companyId: data[0].id }))
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = getToken()
        if (!token) { setMessage("You must be logged in as admin."); return }

        setSubmitting(true)
        setMessage("")

        const payload: CreateJobPayload = {
            companyId: form.companyId,
            title: form.title,
            type: form.type,
            experienceLevel: form.experienceLevel,
            location: form.location,
            description: form.description,
            requirements: form.requirements || undefined,
            skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
            salaryMin: form.salaryMin ? parseInt(form.salaryMin) : undefined,
            salaryMax: form.salaryMax ? parseInt(form.salaryMax) : undefined,
        }

        const result = await createJob(token, payload)
        if (result.jobId) {
            setMessage("Job posted successfully!")
            setForm({ companyId: companies[0]?.id ?? "", title: "", type: "full-time", experienceLevel: "mid", location: "", salaryMin: "", salaryMax: "", skills: "", description: "", requirements: "" })
        } else {
            setMessage(result.error ?? "Failed to post job.")
        }
        setSubmitting(false)
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
            <div className="bg-white rounded-lg shadow p-6 max-w-xl">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Job Title <span className="text-red-500">*</span></label>
                            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. Senior Frontend Engineer" required />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Company <span className="text-red-500">*</span></label>
                            <select name="companyId" value={form.companyId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                                {companies.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Job Type</label>
                            <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Experience Level</label>
                            <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="w-full border rounded px-3 py-2">
                                <option value="intern">Intern</option>
                                <option value="junior">Junior</option>
                                <option value="mid">Mid</option>
                                <option value="senior">Senior</option>
                                <option value="lead">Lead</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Remote" required />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Min Salary (USD)</label>
                            <input name="salaryMin" value={form.salaryMin} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 100000" type="number" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1">Max Salary (USD)</label>
                            <input name="salaryMax" value={form.salaryMax} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 150000" type="number" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Skills / Tags</label>
                        <input name="skills" value={form.skills} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. React, TypeScript, Node.js (comma separated)" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Job Description <span className="text-red-500">*</span></label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Describe the role, team, and what the candidate will be working on..." required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Requirements</label>
                        <textarea name="requirements" value={form.requirements} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="List the key requirements, one per line..." />
                    </div>
                    {message && (
                        <p className={`text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}
                    <div className="flex gap-2 mt-2">
                        <Button type="submit" className="w-32" disabled={submitting}>
                            {submitting ? "Publishing..." : "Publish Job"}
                        </Button>
                        <Button type="button" variant="outline" className="w-32" onClick={() => setMessage("")}>Cancel</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminPostNewJob
