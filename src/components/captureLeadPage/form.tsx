'use client';
import { z } from 'zod/v3';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { LeadForm } from './forms/Lead';
import { UserForm } from './forms/User';
import { Button } from '@/components/ui/button';
import type { LeadFormProps, FormData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    // Lead fields
    value: z.string(),
    city: z.string(),
    state: z.string(),
    supply_type: z.string(),
    // User fields
    name: z.string(),
    email: z.string(),
    cel: z.string(),
    cpf: z.string(),
});

export type FormProps = LeadFormProps<z.infer<typeof formSchema>>;

export function CaptureForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!result.success) {
                alert('Erro ao criar lead');
                return;
            }

            router.push(`/lead/${result.data.id}`);
        } catch (err) {
            console.error(err);
            alert('Erro inesperado. Tente novamente.');
        } finally {
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`w-full px-20`}>
                <div className={`border-2 border-black rounded-lg px-12 py-4 flex flex-col gap-8`}>
                    <div className={`w-full flex gap-16 justify-between`}>
                        <LeadForm form={form} />
                        <UserForm form={form} />
                    </div>
                    <div className={`flex justify-end`}>
                        <Button className={`cursor-pointer`}>Salvar</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
