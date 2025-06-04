import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type FormProps } from '../Form';

const states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
] as const;
const phases = ['Monofásico', 'Bifásico', 'Trifásico'] as const;

export function LeadForm({ form }: FormProps) {
    return (
        <section className={`flex flex-col w-1/2 gap-4`}>
            <h2 className={`text-lg font-bold`}>Dados do gasto de energia</h2>
            <div className={`flex gap-4 w-full`}>
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className={`w-3/4`}>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                                <Input placeholder="Santa Rita" {...field} />
                            </FormControl>
                            {form.formState.errors.city && (
                                <FormMessage>{form.formState.errors.city.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem className={`min-w-1/4`}>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={`w-full`}>
                                        <SelectValue placeholder="Selecione seu estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {states.map((state, idx) => (
                                            <SelectItem value={state} key={idx}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {form.formState.errors.state && (
                                <FormMessage>{form.formState.errors.state.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
            </div>
            <div className={`flex gap-4 w-full`}>
                <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                        <FormItem className={`w-3/4`}>
                            <FormLabel>Valor</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Custo mensal da sua conta"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.value && (
                                <FormMessage>{form.formState.errors.value.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="supply_type"
                    render={({ field }) => (
                        <FormItem className={`min-w-1/4`}>
                            <FormLabel>Tipo de fase</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className={`w-full`}>
                                        <SelectValue placeholder="Selecione seu estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {phases.map((phase, idx) => (
                                            <SelectItem value={String(idx + 1)} key={idx}>
                                                {phase}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {form.formState.errors.supply_type && (
                                <FormMessage>
                                    {form.formState.errors.supply_type.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
            </div>
        </section>
    );
}
