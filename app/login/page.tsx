"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { decodeToken, login, setToken } from "../actions/auth"

const LoginPage = () => {
    const router = useRouter()
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        const result = await login(form.email, form.password)
        if (result.token) {
            setToken(result.token)
            const user = decodeToken(result.token)
            router.push(user?.role === "admin" ? "/admin" : "/")
        } else {
            setError(result.error ?? "Failed to sign in.")
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
                    <p className="text-slate-500 mt-2 text-sm">Sign in to your account</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-300/70 shadow-sm p-8">
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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

                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-emerald-800 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
