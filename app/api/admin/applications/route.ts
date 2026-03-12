import db from "@/lib/db";
import { applicationsTable } from "@/lib/db/applications";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const VALID_APPLICATION_STATUSES = ["applied", "reviewing", "interview", "offer", "rejected"] as const;

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// GET /api/admin/applications -> Fetch all applications across all job postings
export const GET = async (req: Request) => {
    try {
        const user = verifyAuth(req);

        if (typeof user === "string") {
            return NextResponse.json({ error: "Invalid user." }, { status: 401 });
        }

        if (user.role !== "admin") {
            return NextResponse.json(
                { error: "You are not authorized to access this resource." },
                { status: 403 }
            );
        }

        const allApplications = await db.select().from(applicationsTable);
        return NextResponse.json({ allApplications });
    } catch (error) {
        if (error instanceof Error && "status" in error) {
            const status = (error as { status: number }).status;
            return NextResponse.json({ error: error.message }, { status });
        }

        return NextResponse.json({ error: "Failed to get applications." }, { status: 500 });
    }
};

// PATCH /api/admin/applications -> Update a specific application status
export const PATCH = async (req: Request) => {
    try {
        const user = verifyAuth(req);

        if (typeof user === "string") {
            return NextResponse.json({ error: "Invalid user." }, { status: 401 });
        }

        if (user.role !== "admin") {
            return NextResponse.json(
                { error: "You are not authorized to access this resource." },
                { status: 403 }
            );
        }

        let body: unknown;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
        }

        const { applicationId, status } = body as Record<string, unknown>;

        if (typeof applicationId !== "string" || !UUID_REGEX.test(applicationId)) {
            return NextResponse.json({ error: "Invalid applicationId." }, { status: 400 });
        }

        if (
            typeof status !== "string" ||
            !VALID_APPLICATION_STATUSES.includes(status as (typeof VALID_APPLICATION_STATUSES)[number])
        ) {
            return NextResponse.json(
                { error: `Invalid status. Must be one of: ${VALID_APPLICATION_STATUSES.join(", ")}.` },
                { status: 400 }
            );
        }

        const result = await db
            .update(applicationsTable)
            .set({ status: status as (typeof VALID_APPLICATION_STATUSES)[number], updatedAt: new Date() })
            .where(eq(applicationsTable.id, applicationId))
            .returning({ applicationId: applicationsTable.id });

        if (result.length === 0) {
            return NextResponse.json({ error: "Application not found." }, { status: 404 });
        }

        return NextResponse.json({ applicationId: result[0].applicationId }, { status: 200 });
    } catch (error) {
        if (error instanceof Error && "status" in error) {
            const status = (error as { status: number }).status;
            return NextResponse.json({ error: error.message }, { status });
        }

        return NextResponse.json({ error: "Failed to update application status." }, { status: 500 });
    }
};