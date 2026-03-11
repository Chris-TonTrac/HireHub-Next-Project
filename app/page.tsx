import NavigationBar from "./components/NavigationBar";
import { GoOrganization } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const featuredJobs = [
  {
    title: "Senior Frontend Engineer",
    company: "Lumen Labs",
    type: "Full-Time",
    level: "Senior",
    description: "Own a high-impact product surface and build smooth, accessible interfaces used by thousands.",
  },
  {
    title: "Backend Platform Engineer",
    company: "Atlas Cloud",
    type: "Remote",
    level: "Mid",
    description: "Design APIs, shape core services, and improve reliability across our hiring marketplace stack.",
  },
  {
    title: "AI Product Designer",
    company: "Northstar Tech",
    type: "Contract",
    level: "Lead",
    description: "Craft thoughtful experiences for AI workflows and collaborate deeply with product and engineering.",
  },
];

const page = () => {
  return (
    <div className="pb-14">
      <NavigationBar />

      <section className="px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-300/70 bg-white p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">Minimal Job Search</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            The right role, minus the noise.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
            Explore quality job openings in product, design, and engineering with a focused interface built for clarity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/jobs" className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900">
              Explore Jobs
              <FaArrowRight className="text-xs" />
            </Link>
            <Link href="/jobs" className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              For Employers
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Open Roles</p>
              <p className="mt-1 font-heading text-2xl font-bold text-slate-900">1,240+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-stone-100 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Active Companies</p>
              <p className="mt-1 font-heading text-2xl font-bold text-slate-900">320+</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-stone-100 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Remote Friendly</p>
              <p className="mt-1 font-heading text-2xl font-bold text-slate-900">68%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-14 sm:px-6 lg:px-8">
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

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredJobs.map((job) => (
              <article
                key={job.title}
                className="group rounded-2xl border border-slate-300/70 bg-white p-6 transition duration-200 hover:border-slate-400"
              >
                <div className="flex items-start gap-3">
                  <span className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700">
                    <GoOrganization className="text-2xl" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">{job.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">{job.company}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 text-xs font-semibold">
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-900">{job.type}</span>
                  <span className="rounded-full border border-stone-300 bg-stone-100 px-3 py-1 text-stone-800">{job.level}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{job.description}</p>
                <Link
                  href="/jobs"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-800 hover:text-white"
                >
                  View details
                  <FaArrowRight className="text-xs" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page