import db from "@/lib/db";
import { companiesTable } from "@/lib/db/companies";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    try {
        const [company] = await db.select().from(companiesTable).where(eq(companiesTable.id, id));

        if (!company) {
            return NextResponse.json({ error: "Company not found." }, { status: 404 });
        }

        return NextResponse.json({ company });
    } catch(err) {
        return NextResponse.json({ error: "Failed to fetch the company." }, { status: 500 });
    };
}