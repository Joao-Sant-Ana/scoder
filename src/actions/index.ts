"use server"
import { CreateLead, CreateUser } from "@/lib/queries";
import { isValidCPF, isValidPhone, maskCPF, maskPhone, unmask } from "@/lib/utils";
import type { CreateLeadResponse, FormData } from "@/types";

export async function CreateLeadWithUser(data: FormData): Promise<CreateLeadResponse> {
    const supplyNumber = Number(data.supply_type);

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

    await CreateLead(leadData);

    return {
        success: true,
        message: "Lead created"
    };
}
