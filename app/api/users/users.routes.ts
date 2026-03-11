import { NextResponse } from "next/server";
import db from "@/lib/db";
import { usersTable } from "@/lib/db/users";
import { createHmac, randomBytes } from "crypto";

// GET /api/users
export const GET = async () => {
    try {
        const users = await db.select().from(usersTable);
        return NextResponse.json(users);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
    }
};

// POST /api/users
export const POST = async (request: Request) => {
    let body: unknown;

    try {
        body = await request.json();
    } catch(err) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, password, role, avatarUrl } = body as Record<string, unknown>;

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return NextResponse.json(
            { error: "name, email and password must be strings." },
            { status: 400 }
        );
    }

    const parsedRole = role === "admin" || role === "user" ? role : "user";
    const parsedAvatarUrl = typeof avatarUrl === "string" ? avatarUrl : null;

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    try {
        const [user] = await db.insert(usersTable).values({
            name,
            email,
            passwordHash: hashedPassword,
            salt,
            role: parsedRole,
            avatarUrl: parsedAvatarUrl
        }).returning({ userId: usersTable.id });
        return NextResponse.json({ userId: user.userId }, { status: 201 });
    } catch(err) {
        return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
    }
};