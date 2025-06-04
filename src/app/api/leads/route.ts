import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { CreateLead, CreateUser, GetAllLeadsWithUsers, GetAdmin, GetUser } from '@/lib/queries';
import { isValidCPF, isValidPhone, unmask } from '@/lib/utils';
import { z } from 'zod';

const formSchema = z.object({
    value: z.string(),
    city: z.string(),
    state: z.string(),
    supply_type: z.string(),
    name: z.string(),
    email: z.string(),
    cel: z.string(),
    cpf: z.string(),
});

const secret = process.env.JWT_SECRET!;

if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const getSecret = () => new TextEncoder().encode(secret);

export async function POST(req: Request) {
    const body = await req.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
    }

    const data = parsed.data;
    const supplyNumber = Number(data.supply_type);

    if (isNaN(supplyNumber)) {
        return NextResponse.json(
            { success: false, message: 'Invalid supply number' },
            { status: 400 },
        );
    }

    if (!isValidCPF(data.cpf)) {
        return NextResponse.json({ success: false, message: 'Invalid CPF' }, { status: 400 });
    }

    if (!isValidPhone(data.cel)) {
        return NextResponse.json(
            { success: false, message: 'Invalid phone number' },
            { status: 400 },
        );
    }

    const cpf = unmask(data.cpf);
    const cel = unmask(data.cel);

    try {
        let user = await GetUser({ email: data.email, cpf, cel });

        if (!user) {
            user = await CreateUser({ name: data.name, email: data.email, cpf, cel });
        }

        const lead = await CreateLead({
            user_id: user.id,
            value: Number(data.value),
            supply_type: supplyNumber,
            city: data.city,
            state: data.state,
        });

        return NextResponse.json({
            success: true,
            message: 'Lead created',
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

export async function GET(req: Request) {
    const tokenString = req.headers.get('Authorization');

    if (!tokenString) {
        return NextResponse.json({ success: false, message: 'Token required' }, { status: 401 });
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

        const leads = await GetAllLeadsWithUsers();
        return NextResponse.json({ success: true, message: 'Success', data: leads });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: 'Invalid or expired token' },
            { status: 401 },
        );
    }
}
