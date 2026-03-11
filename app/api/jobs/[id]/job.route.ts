import { NextResponse } from "next/server";
import db from "@/lib/db";
import { jobsTable } from "@/lib/db/jobs";
import { eq } from "drizzle-orm";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const VALID_JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
const VALID_EXPERIENCE_LEVELS = ['intern', 'junior', 'mid', 'senior', 'lead'] as const;
const VALID_JOB_STATUSES = ['active', 'closed'] as const;

// GET /api/jobs/:id
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!UUID_REGEX.test(id)) {
      return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
    }

    const job = await db.select().from(jobsTable).where(eq(jobsTable.id, id)).limit(1);

    if (job.length === 0) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ job: job[0] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch job." }, { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { id } = await params;
  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const updatedJob: Partial<typeof jobsTable.$inferInsert> = {};

  if (payload.title !== undefined) updatedJob.title = payload.title as string;
  if (payload.description !== undefined) updatedJob.description = payload.description as string;
  if (payload.requirements !== undefined) updatedJob.requirements = payload.requirements as string;
  if (payload.location !== undefined) updatedJob.location = payload.location as string;

  if (payload.type !== undefined) {
    if (!VALID_JOB_TYPES.includes(payload.type as typeof VALID_JOB_TYPES[number])) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${VALID_JOB_TYPES.join(', ')}.` },
        { status: 400 }
      );
    }
    updatedJob.type = payload.type as typeof VALID_JOB_TYPES[number];
  }

  if (payload.experienceLevel !== undefined) {
    if (!VALID_EXPERIENCE_LEVELS.includes(payload.experienceLevel as typeof VALID_EXPERIENCE_LEVELS[number])) {
      return NextResponse.json(
        { error: `Invalid experienceLevel. Must be one of: ${VALID_EXPERIENCE_LEVELS.join(', ')}.` },
        { status: 400 }
      );
    }
    updatedJob.experienceLevel = payload.experienceLevel as typeof VALID_EXPERIENCE_LEVELS[number];
  }

  if (payload.isFeatured !== undefined) {
    if (typeof payload.isFeatured !== "boolean") {
      return NextResponse.json({ error: "isFeatured must be a boolean." }, { status: 400 });
    }
    updatedJob.isFeatured = payload.isFeatured;
  }

  if (payload.salaryMin !== undefined) {
    if (payload.salaryMin !== null && !Number.isInteger(payload.salaryMin)) {
      return NextResponse.json({ error: "salaryMin must be an integer." }, { status: 400 });
    }
    updatedJob.salaryMin = payload.salaryMin as number | null;
  }

  if (payload.salaryMax !== undefined) {
    if (payload.salaryMax !== null && !Number.isInteger(payload.salaryMax)) {
      return NextResponse.json({ error: "salaryMax must be an integer." }, { status: 400 });
    }
    updatedJob.salaryMax = payload.salaryMax as number | null;
  }

  if (payload.deadline !== undefined) {
    if (payload.deadline === null) {
      updatedJob.deadline = null;
    } else {
      const parsedDate = new Date(payload.deadline as string);
      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "deadline must be a valid date string." }, { status: 400 });
      }
      updatedJob.deadline = parsedDate;
    }
  }

  if (payload.status !== undefined) {
    if (!VALID_JOB_STATUSES.includes(payload.status as typeof VALID_JOB_STATUSES[number])) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_JOB_STATUSES.join(', ')}.` },
        { status: 400 }
      );
    }
    updatedJob.status = payload.status as typeof VALID_JOB_STATUSES[number];
  }

  if (Object.keys(updatedJob).length === 0) {
    return NextResponse.json({ error: "No valid fields provided for update." }, { status: 400 });
  }

  try {
    const result = await db
      .update(jobsTable)
      .set({ ...updatedJob, updatedAt: new Date() })
      .where(eq(jobsTable.id, id))
      .returning({ jobId: jobsTable.id });

    if (result.length === 0) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ jobId: result[0].jobId }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update job." }, { status: 500 });
  }
};

export const DELETE = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (!UUID_REGEX.test(id)) {
    return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
  }

  try {
    const result = await db
      .delete(jobsTable)
      .where(eq(jobsTable.id, id))
      .returning({ jobId: jobsTable.id });

    if (result.length === 0) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ success: "Job deleted successfully." });
  } catch {
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
};