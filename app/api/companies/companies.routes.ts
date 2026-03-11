import db from "@/lib/db";
import { NextResponse } from "next/server";
import { companiesTable } from "@/lib/db/companies";

export const GET = async () => {
    try {
        const companies = await db.select().from(companiesTable);

        return NextResponse.json({ companies });
    } catch(err) {
        return NextResponse.json({ error: "Failed getting companies." }, { status: 500 });
    }
}

export const POST = async (request: Request) => {
    let body: unknown;
    try {
        body = await request.json();
    } catch(err) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, industry, description, logoUrl, location, size, websiteUrl } = body as Record<string, unknown>;

    if (typeof name !== "string") {
        return NextResponse.json({ error: "name must be a string." }, { status: 400 });
    }

    try {
        const [newCompany] = await db.insert(companiesTable).values({
            name,
            industry: industry as string | undefined,
            description: description as string | undefined,
            logoUrl: logoUrl as string | undefined,
            location: location as string | undefined,
            size: size as string | undefined,
            websiteUrl: websiteUrl as string | undefined,
        }).returning({ companyId: companiesTable.id });

        return NextResponse.json({ success: true, companyId:  newCompany.companyId}, { status: 201 });
    } catch(err) {
        return NextResponse.json({ error: "Failed creating company." }, { status: 500 });
    }
};

