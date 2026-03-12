"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getToken, removeToken } from "../actions/auth"

type TokenPayload = {
    email?: string
}

const decodeJwtPayload = (token: string): TokenPayload | null => {
    try {
        const base64Url = token.split(".")[1]
        if (!base64Url) return null

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")
        return JSON.parse(atob(padded)) as TokenPayload
    } catch {
        return null
    }
}

const NavigationBar = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const token = getToken()
        if (!token) return

        const payload = decodeJwtPayload(token)
        if (!payload?.email) return

        setUserEmail(payload.email)
        setUserName(payload.email.split("@")[0])
        setIsLoggedIn(true)
    }, [])

    const handleSignOut = () => {
        removeToken()
        setUserName("")
        setUserEmail("")
        setIsLoggedIn(false)
        router.push("/")
    }

    return (
        <header className="border-b border-slate-300/70 bg-[#f7f6f2]">
            <div className="navbar mx-auto max-w-6xl px-3 sm:px-5">
                <div className="navbar-start">
                    <Link href="/" className="rounded-xl px-2 py-1 text-xl font-heading font-bold tracking-tight text-slate-900 transition hover:opacity-80">
                        Hire<span className="text-emerald-800">Hub</span>
                    </Link>
                </div>

                <div className="navbar-center hidden md:flex">
                    <Link
                        href="/jobs"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900"
                    >
                        Browse Jobs
                    </Link>
                </div>

                <div className="navbar-end gap-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
                            >
                                Sign Out
                            </button>
                            <div className="hidden items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 lg:flex">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold uppercase text-white">
                                    {userName.slice(0, 1)}
                                </div>
                                <div className="leading-tight">
                                    <p className="max-w-36 truncate text-sm font-semibold text-slate-900">
                                        {userName}
                                    </p>
                                    <p className="max-w-48 truncate text-xs text-slate-600">
                                        {userEmail}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                </div>
            </div>
        </header>
    )
}

export default NavigationBar
