import jwt, { JwtPayload } from "jsonwebtoken";

type AuthUser = {
    id: string;
    role: "user" | "admin";
    email?: string;
};

class AuthError extends Error {
    status: number;

    constructor(message: string, status = 401) {
        super(message);
        this.name = "AuthError";
        this.status = status;
    }
}

const isAuthUserPayload = (decoded: string | JwtPayload): decoded is JwtPayload & AuthUser => {
    if (typeof decoded === "string") return false;

    const id = decoded.id;
    const role = decoded.role;
    const email = decoded.email;

    const hasValidId = typeof id === "string" && id.length > 0;
    const hasValidRole = role === "user" || role === "admin";
    const hasValidEmail = email === undefined || typeof email === "string";

    return hasValidId && hasValidRole && hasValidEmail;
};

// Middleware function for authorizing the user.
export const verifyAuth = (req: Request): AuthUser => {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
        throw new AuthError("Unauthorized");
    }

    const [scheme, token] = authHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new AuthError("Unauthorized");
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new AuthError("JWT_SECRET is not configured.", 500);
    }

    let decoded: string | JwtPayload;
    try {
        decoded = jwt.verify(token, jwtSecret);
    } catch {
        throw new AuthError("Unauthorized");
    }

    if (!isAuthUserPayload(decoded)) {
        throw new AuthError("Invalid token payload.");
    }

    return {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email,
    };
};