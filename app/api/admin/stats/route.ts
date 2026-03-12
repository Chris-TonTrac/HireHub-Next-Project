import db from "@/lib/db";
import { jobsTable } from "@/lib/db/jobs";
import { applicationsTable } from "@/lib/db/applications";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// GET /api/admin/stats -> Get admin overview stats
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

        const activeJobs = await db
            .select({ id: jobsTable.id })
            .from(jobsTable)
            .where(eq(jobsTable.status, "active"));

        const allApplications = await db
            .select({ id: applicationsTable.id, status: applicationsTable.status })
            .from(applicationsTable);

        const totalApplicants = allApplications.length;
        const inInterview = allApplications.filter((application) => application.status === "interview").length;
        const offersExtended = allApplications.filter((application) => application.status === "offer").length;

        return NextResponse.json({
            activeJobs: activeJobs.length,
            totalApplicants,
            inInterview,
            offersExtended
        });
    } catch (error) {
        if (error instanceof Error && "status" in error) {
            const status = (error as { status: number }).status;
            return NextResponse.json({ error: error.message }, { status });
        }

        return NextResponse.json({ error: "Failed to get admin stats." }, { status: 500 });
    }
};
