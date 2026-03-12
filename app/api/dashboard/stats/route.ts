import db from "@/lib/db";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";
import { applicationsTable } from "@/lib/db/applications";
import { savedJobs } from "@/lib/db/saved-jobs";
import { eq } from "drizzle-orm";

// GET /api/dashboard/stats -> Get user dashboard stats
export const GET = async (req: Request) => {
    try {
        const user = verifyAuth(req);

        const userApplications = await db
            .select({ id: applicationsTable.id, status: applicationsTable.status })
            .from(applicationsTable)
            .where(eq(applicationsTable.userId, user.id));

        const userSavedJobs = await db
            .select({ id: savedJobs.id })
            .from(savedJobs)
            .where(eq(savedJobs.userId, user.id));

        const totalApplied = userApplications.length;
        const inInterview = userApplications.filter((application) => application.status === "interview").length;
        const offers = userApplications.filter((application) => application.status === "offer").length;
        const savedCount = userSavedJobs.length;

        return NextResponse.json({
            totalApplied,
            inInterview,
            offers,
            savedCount
        });
    } catch (err) {
        if (err instanceof Error && err.name === "AuthError") {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }

        return NextResponse.json({ error: "Failed to fetch dashboard stats." }, { status: 500 });
    }
};
