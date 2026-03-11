import db from "@/lib/db";
import { applicationsTable } from "@/lib/db/applications";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// GET /api/applications -> Get all applications
export const GET = async (req: Request) => {
    try{
        const user = verifyAuth(req);

        if(typeof user === "string") {
            throw new Error('Invalid user');
        };

        const userApplications = await db.select().from(applicationsTable).where(eq(applicationsTable.userId, user.id));

        return NextResponse.json({ userApplications });
    } catch(err) {
        return NextResponse.json({ error: "Failed to fetch applications." });
    }
};