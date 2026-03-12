import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const BrowseJobs = () => {
    return (
        <div className="rounded-3xl border border-slate-300/70 bg-white p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                    href="/"
                    className="inline-flex rounded-lg border border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-800 hover:text-white"
                >
                    Back Home
                </Link>
                <p className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900">
                    240+ jobs updated daily
                </p>
            </div>

            <div className="mt-6">
                <h1 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">Browse Jobs</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                    Find curated opportunities across engineering, product, and design teams.
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 lg:flex-row">
                <label className="input h-12 w-full rounded-lg border-slate-300 bg-white lg:flex-1">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" placeholder="Search by role, stack, or company" />
                </label>

                <div className="dropdown w-full lg:w-auto">
                    <div tabIndex={0} role="button" className="btn h-12 w-full rounded-lg border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 lg:min-w-40">
                        Job Type
                        <IoIosArrowDown />
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu z-1 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 shadow-md">
                        <li><a>Full-Time</a></li>
                        <li><a>Part-Time</a></li>
                        <li><a>Contract</a></li>
                        <li><a>Remote</a></li>
                    </ul>
                </div>

                <div className="dropdown w-full lg:w-auto">
                    <div tabIndex={0} role="button" className="btn h-12 w-full rounded-lg border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 lg:min-w-40">
                        Experience
                        <IoIosArrowDown />
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu z-1 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-2 shadow-md">
                        <li><a>Intern</a></li>
                        <li><a>Junior</a></li>
                        <li><a>Mid</a></li>
                        <li><a>Senior</a></li>
                        <li><a>Lead</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BrowseJobs