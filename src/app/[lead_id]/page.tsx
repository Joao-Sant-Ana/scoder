import { GetLeadByID } from "@/actions";
import { LeadTable } from "@/components/publicLeadPage/Table";
import { PublicHeader } from "@/components/shared/PublicHeader";
import { notFound } from "next/navigation";

const years = [1, 3, 5];

export default async function Lead({ params }: {params: Promise<{ lead_id: string}>}) {
    const leadId = (await params).lead_id;
    const response = await GetLeadByID(leadId);

    if (!response.data) {
        notFound();
    }

    const { value, city } = response.data

    const averageEconomyPerYear = () => {
        const total = years.reduce((acc, year) => acc + (value.toNumber() * (12 * year)) * 0.25, 0);
        return (total / years.length).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    return (
        <>
            <PublicHeader />
            <main className={`flex min-h-[calc(100vh-6rem)] items-center justify-center w-screen`}>
                <div className={`border-1 border-black rounded-md w-11/12 md:10/12 lg:w-8/12 p-10 shadow-black/50 shadow-sm`}>
                    <div className={`flex flex-col md:flex-row gap-10`}>
                        <div className={`w-full md:w-1/4`}>
                            <h1 className={`text-lg font-bold`}>Resultados do seu lead</h1>
                            <h3>Aplicando descontos de 25% na cidade {city} é possivel perceber que os cidadão dessa cidade tem um potencial para economizar {averageEconomyPerYear()}</h3>
                        </div>
                        <div className={`w-full md:w-3/4`}>
                            <LeadTable value={value.toNumber()} years={years} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}