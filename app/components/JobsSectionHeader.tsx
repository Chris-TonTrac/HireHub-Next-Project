import Link from "next/link";

const JobsSectionHeader = () => {
    return (
        <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Featured</p>
                    <h2 className="mt-2 font-heading text-3xl font-bold text-slate-900 sm:text-4xl">Top openings this week</h2>
                </div>
                <Link href="/jobs" className="text-sm font-bold text-slate-700 hover:text-slate-900">
                    View all jobs
                </Link>
            </div>
        </div>
    )
}

export default JobsSectionHeader