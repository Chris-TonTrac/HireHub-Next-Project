import { IoIosArrowDown } from "react-icons/io";
import { GoOrganization } from "react-icons/go";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link";

const jobs = [
    {
        title: "Architecture Engineer",
        company: "Cool Company",
        type: "Full-Time",
        level: "Senior",
        description: "Work with cross-functional teams to shape resilient platform architecture across critical products.",
    },
    {
        title: "Frontend Engineer",
        company: "Nova Studio",
        type: "Remote",
        level: "Mid",
        description: "Build elegant interfaces and improve design system quality across web applications.",
    },
    {
        title: "Product Designer",
        company: "Signal Labs",
        type: "Contract",
        level: "Lead",
        description: "Craft clear user journeys and collaborate with engineers from concept to launch.",
    },
    {
        title: "DevOps Engineer",
        company: "Orbit Cloud",
        type: "Full-Time",
        level: "Mid",
        description: "Automate CI/CD, strengthen observability, and optimize cloud infrastructure costs.",
    },
    {
        title: "Data Engineer",
        company: "QuantGrid",
        type: "Hybrid",
        level: "Senior",
        description: "Design scalable pipelines that power product analytics and business intelligence workflows.",
    },
    {
        title: "Mobile Engineer",
        company: "BrightPath",
        type: "Part-Time",
        level: "Junior",
        description: "Ship performant mobile experiences while collaborating with backend and product teams.",
    },
];

const page = () => {
    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
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

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {jobs.map((job) => (
                        <article
                            key={`${job.title}-${job.company}`}
                            className="group rounded-2xl border border-slate-300/70 bg-white p-6 transition duration-200 hover:border-slate-400"
                        >
                            <div className="flex items-start gap-3">
                                <span className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                                    <GoOrganization className="text-2xl" />
                                </span>
                                <div>
                                    <h2 className="font-heading text-xl font-bold text-slate-900">{job.title}</h2>
                                    <p className="text-sm text-slate-500">{job.company}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2 text-xs font-semibold">
                                <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-900">{job.type}</span>
                                <span className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-stone-800">{job.level}</span>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600">{job.description}</p>
                            <div className="mt-5 flex justify-end">
                                <button className="inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900">
                                    View Job
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <Pagination className="mt-10 mb-3.5">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default page