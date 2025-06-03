import { prisma } from "../prisma";

export async function getUsersQuery() {
    return await prisma.user.findMany()
}