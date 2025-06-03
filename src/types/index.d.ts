import { type UseFormReturn } from "react-hook-form"

export type LeadFormProps<T> = {
    form: UseFormReturn<T>
}

export type UserData = {
    email: string;
    name: string;
    cel: string;
    cpf: string;
}

export type LeadData = {
    value: number;
    city: string;
    state: string;
    supply_type: number;
    user_id: string;
}

export type FormData = {
    value: number;
    city: string;
    state: string;
    supply_type: string;
    name: string;
    email: string;
    cel: string;
    cpf: string;
}

export type CreateLeadResponse<T = any> = {
    success: boolean;
    message: string;
    [key: string]: T
}