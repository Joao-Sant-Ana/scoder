import { GetLeadByID } from "@/actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";

const years = [1, 3, 5];

export default async function Lead({ params }: {params: Promise<{ lead_id: string}>}) {
    const leadId = (await params).lead_id;
    const lead = await GetLeadByID(leadId);

    if (!lead.lead) {
        notFound();
    }

    const calculateValue = (yearIdx: number) => {
        return lead.lead.value * (12 * years[yearIdx]);
    }

    const averagePerYear = () => {
        const total = years.reduce((acc, year) => acc + lead.lead.value * (12 * year), 0);
        return (total / years.length).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    return (
        <main className={`flex items-center justify-center w-screen min-h-screen`}>
            <div className={`border-1 border-black rounded-md w-11/12 md:10/12 lg:w-8/12 p-10 shadow-black/50 shadow-sm`}>
                <div className={`flex flex-col md:flex-row gap-10`}>
                    <div className={`w-full md:w-1/4`}>
                        <h1 className={`text-lg font-bold`}>Resultados do seu lead</h1>
                        <h3>Aplicando descontos de 25% na cidade {lead.lead?.city} é possivel perceber que os cidadão dessa cidade tem um potencial para economizar {averagePerYear()}</h3>
                    </div>
                    <div className={`w-full md:w-3/4`}>
                        <Table>
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
                                            <TableCell className={`w-[100px]`}>{new Date().getFullYear() + year}</TableCell>
                                            <TableCell className={`w-[100px]`}>{value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                                            <TableCell className={`w-[100px]`}>{(value * 0.75).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                                            <TableCell className={`w-[100px]`}>{(value - (calculateValue(idx) * 0.75)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                                        </TableRow>
                                    )}
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </main>
    )
}