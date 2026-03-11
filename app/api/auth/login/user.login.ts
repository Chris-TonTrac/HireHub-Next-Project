import db from '@/lib/db';
import { usersTable } from '@/lib/db/users';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';

// POST api/auth/login -> User login API
export const POST = async (request: Request) => {
    let body: unknown;

    try {
        body = await request.json();
    } catch(err) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    };

    const { email, password } = body as Record<string, unknown>;

    if (typeof email !== 'string' || typeof password !== 'string') {
        return NextResponse.json({ error: 'email and password must be strings.' }, { status: 400 });
    };

    let user: typeof usersTable.$inferSelect | undefined;
    try {
        [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    } catch {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }

    if (!user) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    };

    const newHashedPassword = createHmac('sha256', user.salt).update(password).digest('hex');

    if(user.passwordHash !== newHashedPassword) {
        return NextResponse.json({ error: "Incorrect password entered." }, { status: 401 });
    };

    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
        return NextResponse.json({ error: 'JWT_SECRET is not configured.' }, { status: 500 });
    }

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, jwtSecret);

    return NextResponse.json({ success: true, token: token});
};