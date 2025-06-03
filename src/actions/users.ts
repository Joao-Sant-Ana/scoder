"use server"
import { getUsersQuery } from "@/lib/queries/user";

export async function getUsers() {
    return await getUsersQuery();
}
