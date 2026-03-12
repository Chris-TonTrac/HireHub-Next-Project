import db from "@/lib/db";
import { usersTable } from "@/lib/db/users";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// DELETE /api/admin/users/[id] -> Delete a user account
export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
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

        const { id } = await params;

        if (!UUID_REGEX.test(id)) {
            return NextResponse.json({ error: "Invalid user id." }, { status: 400 });
        }

        const deletedUser = await db
            .delete(usersTable)
            .where(eq(usersTable.id, id))
            .returning({ id: usersTable.id });

        if (deletedUser.length === 0) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        return NextResponse.json({ success: true, deleted_user_id: deletedUser[0].id });
    } catch (error) {
        if (error instanceof Error && "status" in error) {
            const status = (error as { status: number }).status;
            return NextResponse.json({ error: error.message }, { status });
        }

        return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
    }
};
