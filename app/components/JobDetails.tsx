import { WiTime5 } from "react-icons/wi"

type JobDetailsProps = {
    description: string
    requirements: string | null
    skills: string[] | null
}

const JobDetails = ({ description, requirements, skills }: JobDetailsProps) => {
    const requirementLines = requirements
        ? requirements.split("\n").filter((line) => line.trim())
        : []

    return (
        <div className="card w-full bg-base-100 card-xl shadow-sm mt-8 mb-20">
            <div className="card-body">
                <h2 className="card-title text-sm">About the Role</h2>
                <p className="text-xs text-gray-500">{description}</p>
                <p className="border-b-2 my-3"></p>

                {requirementLines.length > 0 && (
                    <>
                        <div>
                            <h2 className="card-title text-sm pb-2.5">Responsibilities</h2>
                            {requirementLines.map((line, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <WiTime5 className="text-sm text-blue-600" />
                                    <p className="text-sm text-gray-500">{line}</p>
                                </div>
                            ))}
                        </div>
                        <p className="border-b-2 mt-5"></p>
                    </>
                )}

                {skills && skills.length > 0 && (
                    <div>
                        <h3 className="card-title text-sm pb-2.5">Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-x-3.5 pt-2.5">
                            {skills.map((skill) => (
                                <div key={skill} className="bg-gray-300 w-fit rounded-md px-1.5 text-sm">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobDetails
