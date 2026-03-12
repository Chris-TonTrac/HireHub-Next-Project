import Link from "next/link";
import { GoOrganization } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";

type JobCardProps = {
  title: string;
  company: string;
  type: string;
  level: string;
  description: string;
  href?: string;
  ctaLabel?: string;
};

const JobCard = ({
  title,
  company,
  type,
  level,
  description,
  href = "/jobs",
  ctaLabel = "View details",
}: JobCardProps) => {
  return (
    <article className="group rounded-2xl border border-slate-300/70 bg-white p-6 transition duration-200 hover:border-slate-400">
      <div className="flex items-start gap-3">
        <span className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
          <GoOrganization className="text-2xl" />
        </span>
        <div>
          <h3 className="font-heading text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-0.5 text-sm text-slate-500">{company}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2 text-xs font-semibold">
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-900">{type}</span>
        <span className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-stone-800">{level}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-800 hover:text-white"
      >
        {ctaLabel}
        <FaArrowRight className="text-xs" />
      </Link>
    </article>
  )
}

export default JobCard
