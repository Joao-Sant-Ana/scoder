'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSetCookie } from 'cookies-next';
import { toast } from 'sonner';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, { message: 'Senha obrigatória' }),
});

type FormData = z.infer<typeof formSchema>;

export default function AdminLogin() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const setCookie = useSetCookie();
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                toast(result.message);
                return;
            }

            setCookie('token', result.data.token);

            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            toast('Erro ao tentar fazer login. Tente novamente.');
        }
    };

    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="w-3/6 flex flex-col gap-5 shadow-sm shadow-black/50 rounded-md border-1 border-primary p-10">
                <div>
                    <h2 className="font-bold text-lg">Seja bem-vindo de volta administrador</h2>
                    <p className="font-normal text-sm">Use seu email e sua senha para entrar</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insira seu email" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Insira sua senha"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-beetwen items-center">
                            <Link href={"/admin/register"}>Crie sua conta aqui</Link>
                            <Button className="cursor-pointer" type="submit">
                                Entrar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    );
}
