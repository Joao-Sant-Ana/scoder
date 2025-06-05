import { GetAdmin } from "@/lib/queries";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET!;

if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const getSecret = () => new TextEncoder().encode(secret);

export async function GET(req: Request) {
    const tokenString = req.headers.get('Authorization');
    if (!tokenString) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin`);
    }

    const token = tokenString.replace('Bearer ', '');

    try {
        const { payload } = await jwtVerify(token, getSecret());
        const admin = await GetAdmin({ id: payload.sub as string });
        if (!admin) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/admin`);
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 },
        );
    }
}