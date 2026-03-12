import NavigationBar from "./components/NavigationBar";
import Hero from "./components/Hero";
import JobsSectionHeader from "./components/JobsSectionHeader";
import JobCard from "./components/JobCard";
import { getFeaturedJobs } from "./actions/jobs";
import { getCompanies } from "./actions/companies";

const page = async () => {
  const [featuredJobs, companies] = await Promise.all([getFeaturedJobs(), getCompanies()])
  const companyMap = Object.fromEntries(companies.map((c) => [c.id, c]))

  return (
    <div className="pb-14">
      <NavigationBar />

      {/* Hero */}
      <Hero />

      {/* Featured Jobs */}
      <section className="px-4 pt-14 sm:px-6 lg:px-8">
        <JobsSectionHeader />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={companyMap[job.companyId]?.name ?? "Unknown Company"}
              type={job.type}
              level={job.experienceLevel}
              description={job.description}
              href={`/jobs/${job.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default page
