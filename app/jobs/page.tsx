import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import JobCard from "../components/JobCard";
import BrowseJobs from "../components/BrowseJobs";
import { getJobs } from "../actions/jobs";
import { getCompanies } from "../actions/companies";

const JOBS_PER_PAGE = 6

const page = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
    const { page: pageParam } = await searchParams
    const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1)

    const [jobs, companies] = await Promise.all([getJobs(), getCompanies()])
    const companyMap = Object.fromEntries(companies.map((c) => [c.id, c]))

    const totalPages = Math.max(1, Math.ceil(jobs.length / JOBS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const start = (safePage - 1) * JOBS_PER_PAGE
    const pagedJobs = jobs.slice(start, start + JOBS_PER_PAGE)

    // Build visible page numbers
    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = []
        const range = new Set([1, totalPages, safePage, safePage - 1, safePage + 1].filter((n) => n >= 1 && n <= totalPages))
        const sorted = Array.from(range).sort((a, b) => a - b)
        sorted.forEach((n, i) => {
            if (i > 0 && n - sorted[i - 1] > 1) pages.push("ellipsis")
            pages.push(n)
        })
        return pages
    }

    return (
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <BrowseJobs />

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {pagedJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            title={job.title}
                            company={companyMap[job.companyId]?.name ?? "Unknown Company"}
                            type={job.type}
                            level={job.experienceLevel}
                            description={job.description}
                            href={`/jobs/${job.id}`}
                            ctaLabel="View Job"
                        />
                    ))}
                </div>
            </div>

            {totalPages > 1 && (
                <Pagination className="mt-10 mb-3.5">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={safePage > 1 ? `/jobs?page=${safePage - 1}` : "#"}
                                aria-disabled={safePage === 1}
                                className={safePage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((entry, i) =>
                            entry === "ellipsis" ? (
                                <PaginationItem key={`ellipsis-${i}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={entry}>
                                    <PaginationLink
                                        href={`/jobs?page=${entry}`}
                                        isActive={entry === safePage}
                                    >
                                        {entry}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href={safePage < totalPages ? `/jobs?page=${safePage + 1}` : "#"}
                                aria-disabled={safePage === totalPages}
                                className={safePage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

export default page
