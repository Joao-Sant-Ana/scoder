import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function LeadTable({ value, years }: { value: number; years: number[] }) {
    const calculateValue = (yearIdx: number) => {
        return value * (12 * years[yearIdx]);
    };

    return (
        <Table>
            <TableCaption>Gasto médio por ano com e sem desconto</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className={`w-[100px]`}>Ano</TableHead>
                    <TableHead className={`w-[100px]`}>Valor inicial</TableHead>
                    <TableHead className={`w-[100px]`}>Valor com desconto</TableHead>
                    <TableHead className={`w-[100px]`}>Economia</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {years.map((year, idx) => {
                    const value = calculateValue(idx);
                    return (
                        <TableRow key={idx}>
                            <TableCell className={`w-[100px]`}>
                                {new Date().getFullYear() + year}
                            </TableCell>
                            <TableCell className={`w-[100px]`}>
                                {value.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </TableCell>
                            <TableCell className={`w-[100px]`}>
                                {(value * 0.75).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </TableCell>
                            <TableCell className={`w-[100px]`}>
                                {(value - calculateValue(idx) * 0.75).toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
