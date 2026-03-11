import db from "@/lib/db";
import { savedJobs } from "@/lib/db/saved-jobs";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const GET = async (req: Request) => {
    try {
        const user = verifyAuth(req);

        const userSavedJobs = await db.select().from(savedJobs).where(eq(savedJobs.userId, user.id));
        return NextResponse.json({ userSavedJobs });
    } catch(err) {
        return NextResponse.json({ error: "Failed to fetch user saved jobs"}, { status: 400})
    }
}