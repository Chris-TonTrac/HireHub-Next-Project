import db from "@/lib/db";
import { applicationsTable } from "@/lib/db/applications";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";

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