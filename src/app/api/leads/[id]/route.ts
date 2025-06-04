import { NextResponse } from 'next/server';
import { GetLead, GetAdmin, DeleteLeadByID } from '@/lib/queries';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET!;

if (!secret) {
    throw new Error('JWT_SECRET is not defined');
}

const getSecret = () => new TextEncoder().encode(secret);

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
    }

    try {
        const lead = await GetLead(id);

        if (!lead) {
            return NextResponse.json(
                { success: false, message: 'Lead not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Lead found',
            data: lead,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 },
        );
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const tokenString = req.headers.get('Authorization');

    if (!id || !tokenString) {
        return NextResponse.json(
            { success: false, message: 'ID and token required' },
            { status: 400 },
        );
    }

    const token = tokenString.replace('Bearer ', '');

    try {
        const { payload } = await jwtVerify(token, getSecret());
        const admin = await GetAdmin({ id: payload.sub as string });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Admin doesn't exist" },
                { status: 401 },
            );
        }

        await DeleteLeadByID(id);

        return NextResponse.json({ success: true, message: 'Lead deleted' });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: 'Invalid or expired token' },
            { status: 401 },
        );
    }
}
