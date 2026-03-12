type SimilarJob = {
    initials: string
    color: string
    title: string
    company: string
    salary: string
}

type SimilarJobsProps = {
    jobs: SimilarJob[]
}

const SimilarJobs = ({ jobs }: SimilarJobsProps) => {
    return (
        <div className="card bg-base-100 border border-gray-200 rounded-xl shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-base font-bold mb-2">Similar Jobs</h2>
                <div className="flex flex-col gap-4">
                    {jobs.map((job) => (
                        <div key={job.title + job.company} className="flex items-center gap-3">
                            <div className="avatar placeholder">
                                <div className={`${job.color} text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm`}>{job.initials}</div>
                            </div>
                            <div>
                                <div className="font-semibold leading-tight text-sm">{job.title}</div>
                                <div className="text-xs text-gray-500">{job.company} · {job.salary}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SimilarJobs
