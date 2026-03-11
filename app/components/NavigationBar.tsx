import Link from "next/link";

const NavigationBar = () => {
  return (
    <header className="border-b border-slate-300/70 bg-[#f7f6f2]">
      <div className="navbar mx-auto max-w-6xl px-3 sm:px-5">
        <div className="navbar-start">
          <Link href="/" className="rounded-xl px-2 py-1 text-xl font-heading font-bold tracking-tight text-slate-900 transition hover:opacity-80">
            Hire<span className="text-emerald-800">Hub</span>
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <Link
            href="/jobs"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-900"
          >
            Browse Jobs
          </Link>
        </div>

        <div className="navbar-end gap-2">
          <Link
            href="/jobs"
            className="inline-flex rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-900"
          >
            Post Job
          </Link>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar