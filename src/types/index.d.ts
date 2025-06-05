import { type Leads, type Admins, type Users } from '@prisma/client';
import { type UseFormReturn } from 'react-hook-form';

export type LeadFormProps<T> = {
    form: UseFormReturn<T>;
};

export type UserData = {
    email: string;
    name: string;
    cel: string;
    cpf: string;
};

export type LeadData = {
    value: number;
    city: string;
    state: string;
    supply_type: number;
    user_id: string;
};

export type FormData = {
    value: string;
    city: string;
    state: string;
    supply_type: string;
    name: string;
    email: string;
    cel: string;
    cpf: string;
};

export type CreateLeadResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
};

export type Lead = Leads;

export type User = Users;

export type Admin = Admins;

export type LeadsWithUsers = Lead & {
    user: Omit<User, 'id'>;
};

export type ColumnsDefinition = {
    id: string;
    cityAndState: string;
    startValue: string;
    discountValue: string;
    name: string;
    email: string;
    cel: string;
};

type LeadChartProps = {
    year: string;
    value: number;
    discountValue: number;
}