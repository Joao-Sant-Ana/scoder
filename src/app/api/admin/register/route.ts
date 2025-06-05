import { NextResponse } from 'next/server';
import { CreateAdmin } from '@/lib/queries';
import { hash } from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { success: false, message: 'Email and password required' },
            { status: 400 },
        );
    }

    try {
        const hashedPassword = await hash(password, 10);

        const admin = await CreateAdmin(email, hashedPassword);

        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 },
            );
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return NextResponse.json(
                { success: false, message: 'Internal server error' },
                { status: 500 },
            );
        }

        const token = await new SignJWT({
            sub: admin.id,
            email: admin.email,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(new TextEncoder().encode(secret));

        return NextResponse.json({
            success: true,
            message: 'Logged in successfully',
            data: { token },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 },
        );
    }
}
