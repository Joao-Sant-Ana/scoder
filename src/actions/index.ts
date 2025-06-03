"use server"
import { CreateLead, CreateUser, GetAdmin, GetLead, GetUser } from "@/lib/queries";
import { isValidCPF, isValidPhone, unmask } from "@/lib/utils";
import { compare } from "bcrypt";
import type { AdminData, CreateLeadResponse, FormData, Lead, Admin } from "@/types";
import { SignJWT, jwtVerify} from "jose";

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


        let user = await GetUser({email: data.email, cpf, cel});
        console.log(user)
        if (!user) {
            user = await CreateUser(userData);
        }

        const leadData = {
            user_id: user.id,
            value: Number(data.value),
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

export async function LoginAdmin(data: AdminData): Promise<CreateLeadResponse<{token: string}>> {
    try {
        const admin = await GetAdmin(data.email);
        if (!admin) {
            return {
                success: false,
                message: "User not found"
            };
        }

        const isEqual = await compare(data.password, admin.password);
        if (!isEqual) {
            return {
                success: false,
                message: "Invalid data"
            }
        }

        const secretString = process.env.JWT_SECRET;
        if (!secretString) {
            return {
                success: false,
                message: "Internal server error"
            }
        }

        const payload = {
            sub: admin.id,
            email: admin.email
        }

        const secret = new TextEncoder().encode(secretString);
        const token = await new SignJWT(payload)
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret)

        return {
            success: true,
            message: "Logged succefuly",
            data: {
                token
            }
        }

    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "Internal server error"
        };
    }
}
