import type { LeadData, UserData } from "@/types";
import { prisma } from "../prisma";

export async function CreateUser(user: UserData) {
    const data = await prisma.users.upsert({
        where: {
            email: user.email
        },
        update: { ...user },
        create: { ...user }
    });

    return data;
}

export async function CreateLead(lead: LeadData) {
    const data = await prisma.leads.create({
        data: { ...lead }
    })

    return data;
}