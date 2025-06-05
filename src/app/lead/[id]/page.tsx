import { LeadChart } from '@/components/publicLeadPage/Chart';
import { LeadTable } from '@/components/publicLeadPage/Table';
import { PublicHeader } from '@/components/shared/PublicHeader';
import type { Lead as LeadType } from '@/types';
import { notFound } from 'next/navigation';

const years = [1, 3, 5];

export default async function Lead({ params }: { params: Promise<{ id: string }> }) {
    const leadId = (await params).id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads/${leadId}`, {
        next: { revalidate: 60 },
    });

    const response = await res.json();

    if (!response.data) {
        notFound();
    }

    const data: LeadType = response.data;

    const { value, city } = data;

    const averageEconomyPerYear = () => {
        const total = years.reduce((acc, year) => acc + Number(value) * (12 * year) * 0.25, 0);
        return total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const chartData = years.map((year: number) => ({
        year: String(new Date().getFullYear() + year),
        value: Number(value) * (12 * year),
        discountValue: (Number(value) * (12 * year))* 0.75
    }))


    return (
        <>
            <PublicHeader />
            <main className="flex min-h-[calc(100vh-6rem)] items-center justify-center w-screen">
                <div className="border-1 border-black rounded-md w-11/12 md:10/12 lg:w-8/12 p-10 shadow-black/50 shadow-sm flex-col">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="w-full md:w-1/4">
                            <h1 className="text-lg font-bold">Resultados do seu lead</h1>
                            <h3>
                                Aplicando descontos de 25% na cidade {city}, é possível perceber que
                                os cidadãos dessa cidade têm um potencial para economizar{' '}
                                {averageEconomyPerYear()}.
                            </h3>
                        </div>
                        <div className="w-full md:w-3/4">
                            <LeadTable value={Number(value)} years={years} />
                        </div>
                    </div>
                    <LeadChart chartData={chartData} />
                </div>
            </main>
        </>
    );
}
