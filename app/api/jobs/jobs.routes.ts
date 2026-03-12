import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { jobsTable } from "@/lib/db/jobs";
import { companiesTable } from "@/lib/db/companies";
import { desc, eq } from "drizzle-orm";

// GET /api/jobs and GET /api/jobs?featured=true
export const GET = async (request: NextRequest) => {
    try {
        const isFeaturedOnly = request.nextUrl.searchParams.get("featured") === "true";

        if (isFeaturedOnly) {
            const featuredJobs = await db
                .select()
                .from(jobsTable)
                .where(eq(jobsTable.isFeatured, true))
                .orderBy(desc(jobsTable.postedAt))
                .limit(4);

            return NextResponse.json({ featuredJobs });
        }

        const jobs = await db.select().from(jobsTable);
        return NextResponse.json({ jobs });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch jobs." }, { status: 500 });
    }
};

const VALID_JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
const VALID_EXPERIENCE_LEVELS = ['intern', 'junior', 'mid', 'senior', 'lead'] as const;
const VALID_JOB_STATUSES = ['active', 'closed'] as const;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// POST /api/jobs
export const POST = async (request: Request) => {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const {
        companyId,
        title,
        description,
        requirements,
        skills,
        type,
        experienceLevel,
        location,
        salaryMin,
        salaryMax,
        status,
        isFeatured,
        deadline,
    } = body as Record<string, unknown>;

    if (!companyId || !title || !description || !type || !experienceLevel || !location) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (!UUID_REGEX.test(companyId as string)) {
        return NextResponse.json({ error: "Invalid companyId format." }, { status: 400 });
    }

    try {
        const company = await db
            .select({ id: companiesTable.id })
            .from(companiesTable)
            .where(eq(companiesTable.id, companyId as string))
            .limit(1);

        if (company.length === 0) {
            return NextResponse.json({ error: "Company not found." }, { status: 404 });
        }
    } catch {
        return NextResponse.json({ error: "Failed to verify company." }, { status: 500 });
    }

    if (!VALID_JOB_TYPES.includes(type as typeof VALID_JOB_TYPES[number])) {
        return NextResponse.json(
            { error: `Invalid type. Must be one of: ${VALID_JOB_TYPES.join(', ')}.` },
            { status: 400 }
        );
    }

    if (!VALID_EXPERIENCE_LEVELS.includes(experienceLevel as typeof VALID_EXPERIENCE_LEVELS[number])) {
        return NextResponse.json(
            { error: `Invalid experienceLevel. Must be one of: ${VALID_EXPERIENCE_LEVELS.join(', ')}.` },
            { status: 400 }
        );
    }

    if (skills !== undefined && skills !== null && !Array.isArray(skills)) {
        return NextResponse.json({ error: "skills must be an array of strings." }, { status: 400 });
    }

    if (salaryMin !== undefined && salaryMin !== null && !Number.isInteger(salaryMin)) {
        return NextResponse.json({ error: "salaryMin must be an integer." }, { status: 400 });
    }

    if (salaryMax !== undefined && salaryMax !== null && !Number.isInteger(salaryMax)) {
        return NextResponse.json({ error: "salaryMax must be an integer." }, { status: 400 });
    }

    if (status !== undefined && !VALID_JOB_STATUSES.includes(status as typeof VALID_JOB_STATUSES[number])) {
        return NextResponse.json(
            { error: `Invalid status. Must be one of: ${VALID_JOB_STATUSES.join(', ')}.` },
            { status: 400 }
        );
    }

    try {
        const newJob = await db.insert(jobsTable).values({
            companyId: companyId as string,
            title: title as string,
            description: description as string,
            requirements: requirements as string | undefined,
            skills: skills as string[] | undefined,
            type: type as typeof VALID_JOB_TYPES[number],
            experienceLevel: experienceLevel as typeof VALID_EXPERIENCE_LEVELS[number],
            location: location as string,
            salaryMin: salaryMin as number | undefined,
            salaryMax: salaryMax as number | undefined,
            status: (status as typeof VALID_JOB_STATUSES[number] | undefined) ?? 'active',
            isFeatured: typeof isFeatured === "boolean" ? isFeatured : false,
            deadline: deadline ? new Date(deadline as string) : null,
        }).returning({ jobId: jobsTable.id });

        return NextResponse.json({ jobId: newJob[0]?.jobId }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to create job." }, { status: 500 });
    }
};