import type { AdminData, LeadData, UserData } from '@/types';
import { prisma } from '../prisma';

export async function GetUser({ email, cpf, cel }: { email: string; cpf: string; cel: string }) {
    const data = await prisma.users.findFirst({
        where: {
            OR: [{ email }, { cpf }, { cel }],
        },
    });

    return data;
}

export async function CreateUser(user: UserData) {
    const data = await prisma.users.create({
        data: { ...user },
    });

    return data;
}

export async function CreateLead(lead: LeadData) {
    const data = await prisma.leads.create({
        data: { ...lead },
    });

    return data;
}

export async function GetLead(id: string) {
    const data = await prisma.leads.findFirst({
        select: {
            city: true,
            id: true,
            user_id: true,
            state: true,
            supply_type: true,
            value: true,
        },
        where: { id },
    });

    return data;
}

export async function GetAllLeads() {
    const data = await prisma.leads.findMany();

    return data;
}

export async function GetAllLeadsWithUsers() {
    const data = await prisma.leads.findMany({
        include: {
            user: {
                select: { email: true, cel: true, cpf: true, name: true },
            },
        },
    });

    return data;
}

export async function DeleteLeadByID(id: string) {
    return await prisma.leads.delete({
        where: { id },
        select: { id: true },
    });
}

export async function CreateAdmin(admin: AdminData) {
    const data = await prisma.admins.create({
        data: { ...admin },
        select: { email: true, id: true },
    });

    return data;
}

export async function GetAdmin({ email, id }: { email?: string; id?: string }) {
    const data = await prisma.admins.findFirst({
        where: {
            OR: [
                {
                    email,
                },
                {
                    id,
                },
            ],
        },
    });

    return data;
}
