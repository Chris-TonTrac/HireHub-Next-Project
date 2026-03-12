import Link from "next/link";
import { GoOrganization } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="px-4 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-300/70 bg-white p-8 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
          Minimal Job Search
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          The right role, minus the noise.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
          Explore quality job openings in product, design, and engineering with
          a focused interface built for clarity.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            Explore Jobs
            <FaArrowRight className="text-xs" />
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            For Employers
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Open Roles
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-slate-900">
              1,240+
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-stone-100 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Active Companies
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-slate-900">
              320+
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-stone-100 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Remote Friendly
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-slate-900">
              68%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
