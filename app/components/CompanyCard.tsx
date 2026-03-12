import { BsBuildings } from "react-icons/bs"
import { SlLocationPin } from "react-icons/sl"
import { LiaCalendarAltSolid } from "react-icons/lia"

type CompanyCardProps = {
    name: string
    industry: string
    initials: string
    description: string
    size: string
    location: string
    deadline: string
}

const CompanyCard = ({ name, industry, initials, description, size, location, deadline }: CompanyCardProps) => {
    return (
        <div className="card bg-base-100 border border-gray-200 rounded-xl shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-base font-bold mb-2">About {name}</h2>
                <div className="flex items-center gap-3 mb-2">
                    <div className="avatar placeholder">
                        <div className="bg-purple-600 text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold">{initials}</div>
                    </div>
                    <div>
                        <div className="font-semibold leading-tight text-base">{name}</div>
                        <div className="text-xs text-gray-500">{industry}</div>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                        <BsBuildings className="text-lg text-gray-500" />
                        <span className="text-blue-700">{size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <SlLocationPin className="text-lg text-gray-500" />
                        <span className="text-blue-700">{location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <LiaCalendarAltSolid className="text-lg text-gray-500" />
                        <span className="text-blue-700">Deadline: {deadline}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard
