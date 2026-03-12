"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signup, login, setToken } from "../actions/auth"

const SignupPage = () => {
    const router = useRouter()
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setLoading(true)
        const result = await signup(form.name, form.email, form.password)
        if (result.userId) {
            const loginResult = await login(form.email, form.password)
            if (loginResult.token) {
                setToken(loginResult.token)
                router.push("/")
            } else {
                router.push("/login")
            }
        } else {
            setError(result.error ?? "Failed to create account.")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f6f2] px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="text-2xl font-heading font-bold tracking-tight text-slate-900">
                        Hire<span className="text-emerald-800">Hub</span>
                    </Link>
                    <p className="text-slate-500 mt-2 text-sm">Create your account</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-300/70 shadow-sm p-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Full name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/30 focus:border-emerald-800 transition"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/30 focus:border-emerald-800 transition"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/30 focus:border-emerald-800 transition"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/30 focus:border-emerald-800 transition"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition disabled:opacity-60"
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-emerald-800 font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage
