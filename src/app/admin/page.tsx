"use client"
import { z } from "zod/v3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginAdmin } from "@/actions";
import { useSetCookie } from "cookies-next";
import { redirect } from "next/navigation";

const formSchema = z.object({
    email: z.string(),
    password: z.string()
})

type FormData = z.infer<typeof formSchema>

export default function AdminLogin() {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const setCookie = useSetCookie();

    const onSubmit = async (data: FormData) => {
        const response = await LoginAdmin(data);
        if (!response.success) {
            // Handle unsuccess here
            return;
        }

        setCookie("token", response.data?.token, {
            path: "/",
            secure: true
        });
        redirect("/admin/dashboard");
    }

    return (
        <main className={`w-screen h-screen flex items-center justify-center`}>
            <div className={`w-3/6 flex flex-col gap-5 shadow-sm shadow-black/50 rounded-md border-1 border-primary p-10`}>
                <div>
                    <h2 className={`font-bold text-lg`}>Seja bem vindo de volta administrador</h2>
                    <p className={`font-normal text-sm`}>Use seu email e sua senha para entrar</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={`flex flex-col gap-8`}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Insira sua senha" type="password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className={`flex justify-end items-center`}>
                            <Button className={`cursor-pointer`}>Entrar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    )
}