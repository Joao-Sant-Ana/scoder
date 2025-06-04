import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type FormProps } from '..';
import { maskCPF, maskPhone } from '@/lib/utils';

export function UserForm({ form }: FormProps) {
    return (
        <section className={`flex flex-col w-1/2 gap-4`}>
            <h2 className={`text-lg font-bold`}>Dados do usuário</h2>
            <div className={`flex flex-col gap-4 w-full`}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite seu nome" {...field} />
                            </FormControl>
                            {form.formState.errors.city && (
                                <FormMessage>{form.formState.errors.city.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite seu email" {...field} />
                            </FormControl>
                            {form.formState.errors.city && (
                                <FormMessage>{form.formState.errors.city.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
            </div>
            <div className={`flex gap-4 w-full`}>
                <FormField
                    control={form.control}
                    name="cel"
                    render={({ field }) => (
                        <FormItem className={`w-1/2`}>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite seu telefone"
                                    {...field}
                                    value={maskPhone(field.value)}
                                />
                            </FormControl>
                            {form.formState.errors.city && (
                                <FormMessage>{form.formState.errors.city.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                        <FormItem className={`w-1/2`}>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite seu cpf"
                                    {...field}
                                    value={maskCPF(field.value)}
                                />
                            </FormControl>
                            {form.formState.errors.city && (
                                <FormMessage>{form.formState.errors.city.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
            </div>
        </section>
    );
}
