// 'server-only' prevents the DB connection from ever leaking to the browser - so db.ts can never be imported to a client component
import 'server-only';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);
export default db;