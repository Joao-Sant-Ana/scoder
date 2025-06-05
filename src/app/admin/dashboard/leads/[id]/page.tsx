"use server"
import { LeadTable } from '@/components/publicLeadPage/Table';
import { DashboardHeader } from '@/components/shared/DashboardHeader';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

const years = [1, 3, 5];

export default async function Lead({ params }: { params: Promise<{ id: string }> }) {
    const token = (await cookies()).get('token')?.value;
    const auth = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/auth`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!auth.ok) {
        redirect("/admin");
    }

    const leadId = (await params).id;

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads/${leadId}`, {
        next: { revalidate: 60 },
    });

    const response = await res.json();

    if (!response.data) {
        notFound();
    }

    const { value, city } = response.data;

    const averageEconomyPerYear = () => {
        const total = years.reduce((acc, year) => acc + value * (12 * year) * 0.25, 0);
        return total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (
        <>
            <DashboardHeader />
            <main className="flex min-h-[calc(100vh-6rem)] items-center justify-center w-screen">
                <div className="border-1 border-black rounded-md w-11/12 md:10/12 lg:w-8/12 p-10 shadow-black/50 shadow-sm">
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
                            <LeadTable value={value} years={years} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
