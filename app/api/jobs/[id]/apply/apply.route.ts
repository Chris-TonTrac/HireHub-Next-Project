import db from "@/lib/db";
import { applicationsTable } from "@/lib/db/applications";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";

// POST /api/jobs/:id/apply -> API endpoint for applying for a job.
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const user = verifyAuth(req);

        if (typeof user === 'string') {
            throw new Error('Invalid user');
        }

        const jobId = params.id;

        // inserting application
        const [application] = await db.insert(applicationsTable).values({
            userId: user.id,
            jobId,
        }).returning({ id: applicationsTable.id });

        return NextResponse.json({ success: true, applicationId: application.id}, { status: 201});
    } catch(err) {
        return NextResponse.json({ error: "Failed to create new application."}, { status: 401 });
    }
};