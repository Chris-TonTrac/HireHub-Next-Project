const BASE = "http://localhost:3000"

// ─── USERS ────────────────────────────────────────────────────────────────────
const users = [
  { name: "Alex Johnson",   email: "alex@hirehub.dev",     password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "María García",   email: "maria@hirehub.dev",    password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Sam Okonkwo",    email: "sam@hirehub.dev",      password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Priya Patel",    email: "priya@hirehub.dev",    password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Chris Lee",      email: "chris@hirehub.dev",    password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Nia Williams",   email: "nia@hirehub.dev",      password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Raj Mehta",      email: "raj@hirehub.dev",      password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/men/7.jpg" },
  { name: "Sofia Rossi",    email: "sofia@hirehub.dev",    password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Kwame Asante",   email: "kwame@hirehub.dev",    password: "Password123!", role: "user",  avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg" },
  { name: "Admin User",     email: "admin@hirehub.dev",    password: "Admin123!",    role: "admin", avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg" },
]

// ─── COMPANIES ────────────────────────────────────────────────────────────────
const companies = [
  { name: "Stripe",       industry: "Fintech",           description: "Stripe builds economic infrastructure for the internet, enabling businesses of all sizes to accept payments and manage their finances online.", logoUrl: "https://logo.clearbit.com/stripe.com",    location: "San Francisco, CA",  size: "1000–5000 employees",  websiteUrl: "https://stripe.com" },
  { name: "Vercel",       industry: "Developer Tools",   description: "Vercel is a platform for frontend developers, providing the speed and reliability that inspires innovation at the moment of creation.", logoUrl: "https://logo.clearbit.com/vercel.com",   location: "Remote",             size: "200–500 employees",    websiteUrl: "https://vercel.com" },
  { name: "Linear",       industry: "SaaS / Productivity", description: "Linear is the project management tool built for high-performance teams. It streamlines software projects, sprints, tasks, and bug tracking.", logoUrl: "https://logo.clearbit.com/linear.app",   location: "Remote",             size: "50–200 employees",     websiteUrl: "https://linear.app" },
  { name: "Figma",        industry: "Design Tools",      description: "Figma is a collaborative web application for interface design, with additional offline features enabled by desktop applications.", logoUrl: "https://logo.clearbit.com/figma.com",    location: "San Francisco, CA",  size: "500–1000 employees",   websiteUrl: "https://figma.com" },
  { name: "Notion",       industry: "SaaS / Productivity", description: "Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company.", logoUrl: "https://logo.clearbit.com/notion.so",    location: "San Francisco, CA",  size: "200–500 employees",    websiteUrl: "https://notion.so" },
  { name: "PlanetScale",  industry: "Cloud Infrastructure", description: "PlanetScale is the world's most advanced serverless MySQL platform, built on Vitess — the database technology that powers YouTube.", logoUrl: "https://logo.clearbit.com/planetscale.com", location: "Remote",            size: "50–200 employees",     websiteUrl: "https://planetscale.com" },
  { name: "Resend",       industry: "Developer Tools",   description: "Resend is the email API for developers. Send transactional emails with a modern, simple API designed for reliability and deliverability.", logoUrl: "https://logo.clearbit.com/resend.com",   location: "Remote",             size: "10–50 employees",      websiteUrl: "https://resend.com" },
  { name: "Lemon Squeezy", industry: "Fintech",          description: "Lemon Squeezy is the all-in-one platform for running your SaaS — from licensing and subscriptions to tax management and payments.", logoUrl: "https://logo.clearbit.com/lemonsqueezy.com", location: "Remote",           size: "10–50 employees",      websiteUrl: "https://lemonsqueezy.com" },
  { name: "Supabase",     industry: "Cloud Infrastructure", description: "Supabase is an open source Firebase alternative. Start your project with a Postgres database, authentication, instant APIs, and realtime subscriptions.", logoUrl: "https://logo.clearbit.com/supabase.com", location: "Remote",          size: "50–200 employees",     websiteUrl: "https://supabase.com" },
  { name: "Railway",      industry: "Cloud Infrastructure", description: "Railway is an infrastructure platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud.", logoUrl: "https://logo.clearbit.com/railway.app",  location: "Remote",           size: "10–50 employees",      websiteUrl: "https://railway.app" },
  { name: "Retool",       industry: "Developer Tools",   description: "Retool is the fast way to build internal tools. Build custom internal tools in minutes with Retool's drag-and-drop building blocks.", logoUrl: "https://logo.clearbit.com/retool.com",   location: "San Francisco, CA",  size: "200–500 employees",    websiteUrl: "https://retool.com" },
  { name: "Clerk",        industry: "Developer Tools",   description: "Clerk is the most comprehensive user management platform, providing drop-in authentication, user profiles, and organization management.", logoUrl: "https://logo.clearbit.com/clerk.com",    location: "Remote",             size: "50–200 employees",     websiteUrl: "https://clerk.com" },
  { name: "Sanity",       industry: "SaaS / Content",    description: "Sanity is the platform for structured content that powers remarkable digital experiences. Customize it with your own schemas and plugins.", logoUrl: "https://logo.clearbit.com/sanity.io",    location: "Oslo, Norway",       size: "50–200 employees",     websiteUrl: "https://sanity.io" },
  { name: "Luma",         industry: "Events / SaaS",     description: "Luma is the modern event management platform. Create beautiful event pages, collect RSVPs, and manage your community all in one place.", logoUrl: "https://logo.clearbit.com/lu.ma",        location: "Remote",             size: "10–50 employees",      websiteUrl: "https://lu.ma" },
  { name: "Pika Labs",    industry: "AI / Creative Tech", description: "Pika Labs is building the future of video creation with AI — empowering anyone to create and edit professional videos in seconds.", logoUrl: "https://logo.clearbit.com/pika.art",     location: "Palo Alto, CA",      size: "10–50 employees",      websiteUrl: "https://pika.art" },
]

// ─── JOBS (built after companies are created) ─────────────────────────────────
const jobTemplates = (companyIds) => [
  // Stripe
  { companyId: companyIds["Stripe"],      title: "Senior Frontend Engineer",        type: "full-time",   experienceLevel: "senior", location: "San Francisco, CA", salaryMin: 160000, salaryMax: 220000, isFeatured: true,  skills: ["React","TypeScript","Next.js","GraphQL"],  description: "Join Stripe's frontend team to build the next generation of payment interfaces used by millions of businesses worldwide. You'll own complex UI surfaces, drive performance optimization, and mentor junior engineers.", requirements: "5+ years frontend experience\nDeep expertise in React and TypeScript\nExperience with design systems\nStrong understanding of web performance", deadline: "2026-06-01" },
  { companyId: companyIds["Stripe"],      title: "Backend Platform Engineer",       type: "full-time",   experienceLevel: "mid",    location: "Remote",            salaryMin: 140000, salaryMax: 190000, isFeatured: false, skills: ["Go","Postgres","gRPC","Kafka"],            description: "Build and scale the core API infrastructure that powers Stripe's global payments network. You'll design fault-tolerant services handling millions of transactions per day.", requirements: "3+ years of backend engineering\nExperience with distributed systems\nProficiency in Go or similar language\nFamiliarity with event-driven architecture", deadline: "2026-06-15" },

  // Vercel
  { companyId: companyIds["Vercel"],      title: "Developer Advocate",              type: "full-time",   experienceLevel: "mid",    location: "Remote",            salaryMin: 130000, salaryMax: 170000, isFeatured: true,  skills: ["Next.js","React","Technical Writing","Public Speaking"], description: "Represent Vercel in the developer community by creating content, speaking at conferences, and building demos that showcase the power of our platform.", requirements: "Strong communication skills\nExperience building with Next.js\nComfort with video and written content creation\nActive presence in developer communities", deadline: "2026-05-30" },
  { companyId: companyIds["Vercel"],      title: "Design Engineer",                 type: "full-time",   experienceLevel: "senior", location: "Remote",            salaryMin: 150000, salaryMax: 200000, isFeatured: false, skills: ["React","CSS","Framer Motion","Figma"],     description: "Bridge the gap between design and engineering at Vercel. You'll craft pixel-perfect UI components, build interactive demos, and help define the visual language of our product.", requirements: "Portfolio demonstrating exceptional UI craft\n4+ years of frontend development\nDeep knowledge of CSS and animation\nExperience working closely with design teams", deadline: "2026-07-01" },

  // Linear
  { companyId: companyIds["Linear"],      title: "Product Designer",                type: "full-time",   experienceLevel: "senior", location: "Remote",            salaryMin: 140000, salaryMax: 190000, isFeatured: true,  skills: ["Figma","User Research","Prototyping","Design Systems"], description: "Shape the future of project management software at Linear. You'll own end-to-end design for core product features used by thousands of high-performance engineering teams.", requirements: "5+ years of product design experience\nStrong portfolio with shipped B2B products\nExperience conducting user research\nDeep proficiency in Figma", deadline: "2026-06-20" },
  { companyId: companyIds["Linear"],      title: "Head of Engineering",             type: "full-time",   experienceLevel: "lead",   location: "Remote",            salaryMin: 220000, salaryMax: 300000, isFeatured: false, skills: ["TypeScript","Postgres","System Design","Leadership"],  description: "Lead Linear's engineering organization as we scale to serve hundreds of thousands of teams. You'll set technical direction, grow the team, and ensure we ship high quality software reliably.", requirements: "10+ years of engineering experience\n3+ years in engineering leadership\nTrack record of scaling high-performance teams\nDeep empathy for developer experience", deadline: "2026-08-01" },

  // Figma
  { companyId: companyIds["Figma"],       title: "Full Stack Engineer",             type: "full-time",   experienceLevel: "senior", location: "San Francisco, CA", salaryMin: 170000, salaryMax: 230000, isFeatured: true,  skills: ["TypeScript","React","Node.js","WebSockets"],      description: "Build the collaborative multiplayer infrastructure and UI that powers Figma's design tools. Work on hard problems in real-time sync, rendering, and plugin extensibility.", requirements: "5+ years full-stack experience\nExperience with real-time or collaborative systems\nStrong TypeScript and React skills\nFamiliarity with WebSockets or CRDTs", deadline: "2026-06-10" },
  { companyId: companyIds["Figma"],       title: "Data Scientist",                  type: "full-time",   experienceLevel: "mid",    location: "San Francisco, CA", salaryMin: 145000, salaryMax: 195000, isFeatured: false, skills: ["Python","SQL","dbt","Looker","Statistics"],       description: "Drive product decisions at Figma through data. You'll build dashboards, run experiments, and develop models that help our product teams understand how designers use Figma.", requirements: "3+ years in data science or analytics\nStrong SQL and Python skills\nExperience with A/B testing and experimentation\nAbility to communicate insights to non-technical stakeholders", deadline: "2026-07-15" },

  // Notion
  { companyId: companyIds["Notion"],      title: "Frontend Engineer (Intern)",      type: "internship",  experienceLevel: "intern",  location: "San Francisco, CA", salaryMin: 70000,  salaryMax: 90000,  isFeatured: false, skills: ["React","TypeScript","CSS"],                        description: "Join Notion's frontend team for a 12-week internship where you'll ship real features to millions of users. Work directly with senior engineers and contribute to our design system.", requirements: "Currently pursuing a CS degree\nFamiliarity with React\nStrong fundamentals in HTML, CSS, and JavaScript\nPassion for great user experiences", deadline: "2026-05-01" },
  { companyId: companyIds["Notion"],      title: "Growth Engineer",                 type: "full-time",   experienceLevel: "mid",    location: "San Francisco, CA", salaryMin: 135000, salaryMax: 175000, isFeatured: false, skills: ["React","Node.js","Amplitude","SQL","A/B Testing"],  description: "Drive Notion's user acquisition and activation as our Growth Engineer. You'll run experiments, optimize onboarding flows, and collaborate with marketing to grow our user base.", requirements: "3+ years of software engineering\nExperience with growth or experimentation frameworks\nComfort with data analysis and SQL\nFull-stack engineering ability", deadline: "2026-06-30" },

  // PlanetScale
  { companyId: companyIds["PlanetScale"], title: "Backend Engineer — Database",     type: "full-time",   experienceLevel: "senior", location: "Remote",            salaryMin: 155000, salaryMax: 200000, isFeatured: true,  skills: ["Go","MySQL","Vitess","Kubernetes","Distributed Systems"], description: "Work on the core database engine powering PlanetScale's serverless MySQL platform. You'll tackle hard problems in distributed database management, branching, and schema migrations.", requirements: "5+ years of backend engineering\nDeep knowledge of MySQL or Postgres internals\nExperience with distributed systems\nFamiliarity with Go is a strong plus", deadline: "2026-07-01" },

  // Supabase
  { companyId: companyIds["Supabase"],    title: "DevOps Engineer",                 type: "full-time",   experienceLevel: "mid",    location: "Remote",            salaryMin: 120000, salaryMax: 160000, isFeatured: false, skills: ["Kubernetes","Terraform","AWS","Postgres","CI/CD"],    description: "Keep Supabase's globally distributed infrastructure running at peak performance. You'll automate deployments, improve observability, and optimize cloud costs across our multi-region setup.", requirements: "3+ years of DevOps or platform engineering\nStrong Kubernetes and Terraform skills\nExperience managing Postgres at scale\nComfort with incident response", deadline: "2026-06-15" },
  { companyId: companyIds["Supabase"],    title: "Open Source Contributor — Realtime", type: "contract", experienceLevel: "mid",    location: "Remote",            salaryMin: 90000,  salaryMax: 120000, isFeatured: false, skills: ["Elixir","Phoenix","WebSockets","Postgres"],           description: "Contribute to Supabase Realtime — our open source multiplayer and broadcast layer built on Elixir and Phoenix. Help the community build faster and more collaborative applications.", requirements: "Experience with Elixir or functional programming\nUnderstanding of WebSocket protocols\nOpen source contribution experience\nStrong written communication for async work", deadline: "2026-05-20" },

  // Retool
  { companyId: companyIds["Retool"],      title: "Solutions Engineer",              type: "full-time",   experienceLevel: "mid",    location: "San Francisco, CA", salaryMin: 125000, salaryMax: 165000, isFeatured: false, skills: ["JavaScript","REST APIs","SQL","Customer Success"],    description: "Help Retool's enterprise customers build powerful internal tools. You'll be the technical expert in sales cycles, lead onboarding, and act as a bridge between customers and our product team.", requirements: "3+ years in solutions or sales engineering\nStrong JavaScript and SQL skills\nAbility to build demos under time pressure\nExcellent customer-facing communication", deadline: "2026-06-01" },

  // Clerk
  { companyId: companyIds["Clerk"],       title: "Security Engineer",               type: "full-time",   experienceLevel: "senior", location: "Remote",            salaryMin: 160000, salaryMax: 210000, isFeatured: true,  skills: ["Auth","OAuth","JWT","Penetration Testing","Node.js"],  description: "Own security across Clerk's authentication infrastructure used by thousands of developers. You'll conduct pen tests, review code for vulnerabilities, and help define our security posture.", requirements: "5+ years in security engineering\nDeep understanding of authentication protocols (OAuth2, OIDC, SAML)\nExperience with penetration testing and threat modeling\nStrong coding skills in Node.js or similar", deadline: "2026-08-15" },

  // Sanity
  { companyId: companyIds["Sanity"],      title: "Content Platform Engineer",       type: "full-time",   experienceLevel: "mid",    location: "Remote",            salaryMin: 110000, salaryMax: 150000, isFeatured: false, skills: ["JavaScript","React","GROQ","Node.js","REST APIs"],    description: "Build the developer experience for Sanity's content platform. You'll work on the Studio editor, SDKs, and APIs that power content management for thousands of companies worldwide.", requirements: "3+ years of full-stack development\nExperience with React and building extensible plugin systems\nStrong API design skills\nAbility to write clear technical documentation", deadline: "2026-07-10" },

  // Luma
  { companyId: companyIds["Luma"],        title: "Mobile Engineer — iOS",           type: "full-time",   experienceLevel: "mid",    location: "Remote",            salaryMin: 120000, salaryMax: 160000, isFeatured: false, skills: ["Swift","SwiftUI","UIKit","Core Data","REST APIs"],    description: "Build Luma's iOS app used by event organizers and attendees around the world. You'll ship new features end-to-end, optimize performance, and collaborate with our small tight-knit team.", requirements: "3+ years of iOS development\nStrong Swift and SwiftUI skills\nExperience shipping apps to the App Store\nComfort working in a fast-paced startup environment", deadline: "2026-06-25" },

  // Pika Labs
  { companyId: companyIds["Pika Labs"],   title: "ML Engineer — Video Generation",  type: "full-time",   experienceLevel: "senior", location: "Palo Alto, CA",     salaryMin: 180000, salaryMax: 250000, isFeatured: true,  skills: ["Python","PyTorch","Diffusion Models","CUDA","MLOps"],  description: "Push the boundaries of AI video generation at Pika Labs. You'll research and implement state-of-the-art generative models, optimize inference pipelines, and help define our core AI roadmap.", requirements: "5+ years in machine learning engineering\nPublications or strong experience in generative models\nDeep PyTorch expertise\nExperience with CUDA optimization and large-scale model training", deadline: "2026-09-01" },

  // Resend
  { companyId: companyIds["Resend"],      title: "Software Engineer — Growth",      type: "full-time",   experienceLevel: "junior", location: "Remote",            salaryMin: 90000,  salaryMax: 120000, isFeatured: false, skills: ["TypeScript","Node.js","React","PostgreSQL"],          description: "Join Resend's small and ambitious team to work on the email infrastructure that powers thousands of products. As an early engineer you'll have a huge scope of impact across the entire stack.", requirements: "1–2 years of software engineering experience\nComfort with TypeScript and Node.js\nEagerness to learn and move fast\nInterest in developer tooling and email infrastructure", deadline: "2026-05-15" },

  // Railway
  { companyId: companyIds["Railway"],     title: "Platform Engineer",               type: "full-time",   experienceLevel: "senior", location: "Remote",            salaryMin: 150000, salaryMax: 195000, isFeatured: false, skills: ["Rust","Kubernetes","Docker","gRPC","Linux"],          description: "Build the core deployment and orchestration engine that powers Railway's platform. You'll work on container scheduling, networking, storage, and the developer-facing deployment APIs.", requirements: "5+ years of systems or platform engineering\nExperience with Kubernetes internals or container orchestration\nStrong understanding of Linux and networking\nRust or Go experience preferred", deadline: "2026-07-20" },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return res.json()
}

function green(msg) { process.stdout.write(`\x1b[32m✓ ${msg}\x1b[0m\n`) }
function red(msg)   { process.stdout.write(`\x1b[31m✗ ${msg}\x1b[0m\n`) }
function blue(msg)  { process.stdout.write(`\x1b[34m→ ${msg}\x1b[0m\n`) }

// ─── SEED ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  Starting seed...\n")

  // 1. Users
  blue("Seeding 10 users...")
  for (const user of users) {
    const res = await post("/api/users", user)
    if (res.userId) green(`User created: ${user.name} (${user.email})`)
    else red(`User failed: ${user.name} — ${res.error ?? JSON.stringify(res)}`)
  }

  // 2. Companies
  blue("\nSeeding 15 companies...")
  const companyIds = {}
  for (const company of companies) {
    const res = await post("/api/companies", company)
    if (res.companyId) {
      companyIds[company.name] = res.companyId
      green(`Company created: ${company.name}`)
    } else {
      red(`Company failed: ${company.name} — ${res.error ?? JSON.stringify(res)}`)
    }
  }

  // 3. Jobs
  blue("\nSeeding 20 jobs...")
  const templates = jobTemplates(companyIds)
  for (const job of templates) {
    if (!job.companyId) { red(`Skipping job — companyId missing for template`); continue }
    const res = await post("/api/jobs", job)
    if (res.jobId) green(`Job created: ${job.title}`)
    else red(`Job failed: ${job.title} — ${res.error ?? JSON.stringify(res)}`)
  }

  console.log("\n✅  Seed complete!\n")
}

seed().catch((err) => { console.error(err); process.exit(1) })
