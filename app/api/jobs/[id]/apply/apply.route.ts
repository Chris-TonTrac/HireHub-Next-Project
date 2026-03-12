import db from "@/lib/db";
import { applicationsTable } from "@/lib/db/applications";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";

// POST /api/jobs/:id/apply -> API endpoint for applying for a job.
export const POST = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const user = verifyAuth(req);

        const { id: jobId } = await params;

        const [application] = await db.insert(applicationsTable).values({
            userId: user.id,
            jobId,
        }).returning({ id: applicationsTable.id });

        return NextResponse.json({ success: true, applicationId: application.id }, { status: 201 });
    } catch (err) {
        if (err instanceof Error && "status" in err) {
            const status = (err as { status: number }).status;
            return NextResponse.json({ error: err.message }, { status });
        }
        return NextResponse.json({ error: "Failed to create new application." }, { status: 500 });
    }
};