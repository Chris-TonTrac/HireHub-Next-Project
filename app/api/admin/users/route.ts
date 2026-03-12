import db from "@/lib/db";
import { usersTable } from "@/lib/db/users";
import { verifyAuth } from "@/app/middleware/auth.middleware";
import { NextResponse } from "next/server";

// GET /api/admin/users -> List all registered users
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

        const allUsers = await db
            .select({
                id: usersTable.id,
                name: usersTable.name,
                email: usersTable.email,
                role: usersTable.role,
                avatarUrl: usersTable.avatarUrl,
                createdAt: usersTable.createdAt,
                updatedAt: usersTable.updatedAt,
            })
            .from(usersTable);

        return NextResponse.json({ allUsers });
    } catch (error) {
        if (error instanceof Error && "status" in error) {
            const status = (error as { status: number }).status;
            return NextResponse.json({ error: error.message }, { status });
        }

        return NextResponse.json({ error: "Failed to get users." }, { status: 500 });
    }
};
