"use server"
import { CreateLead, CreateUser, GetLead } from "@/lib/queries";
import { isValidCPF, isValidPhone, unmask } from "@/lib/utils";
import type { CreateLeadResponse, FormData, Lead } from "@/types";

export async function CreateLeadWithUser(data: FormData): Promise<CreateLeadResponse<Lead>> {
    const supplyNumber = Number(data.supply_type);
    if(isNaN(supplyNumber)) {
        return {
            success: false,
            message: "Invalid supply number"
        };
    }

    let isValid = isValidCPF(data.cpf);
    if (!isValid) {
        return {
            success: false,
            message: "Invalid CPF"
        };
    }

    isValid = isValidPhone(data.cel);
    if (!isValid) {
        return {
            success: false,
            message: "Invalid phone number"
        };
    }

    const cpf = unmask(data.cpf);
    const cel = unmask(data.cel);

    try {
        const userData = {
            name: data.name,
            email: data.email,
            cpf: cpf,
            cel: cel,
        };

        const user = await CreateUser(userData);

        const leadData = {
            user_id: user.id,
            value: data.value,
            supply_type: supplyNumber,
            city: data.city,
            state: data.state
        };

        const lead = await CreateLead(leadData);

        return {
            success: true,
            message: "Lead created",
            data: lead,
        };
    } catch (err) {
        // Log error for debug
        console.log(err);
        return {
            success: false,
            message: "Internal server error"
        };
    }
}

export async function GetLeadByID(id: string): Promise<CreateLeadResponse<Lead>> {
    try {
        const lead = await GetLead(id);

        if (!lead) {
            return {
                success: true,
                message: "Lead found",
            };
        }

        return {
            success: true,
            message: "Lead found",
            data: lead,
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Internal server error"
        };
    }
}
