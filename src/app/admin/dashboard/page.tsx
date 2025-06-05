import { cookies } from 'next/headers';
import { DashboardTable } from '@/components/dashboard/table';
import { columns } from '@/components/dashboard/table/columns';
import type { LeadsWithUsers } from '@/types';
import { maskPhone } from '@/lib/utils';
import { DashboardHeader } from '@/components/shared/DashboardHeader';

export default async function Dashboard() {
    const token = (await cookies()).get('token')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/leads`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return null;
    }

    const result = await response.json();

    const data = result.data.map((item: LeadsWithUsers) => ({
        id: item.id,
        cityAndState: `${item.city} - ${item.state}`,
        startValue: Number(item.value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
        discountValue: (Number(item.value) * 0.75).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
        name: item.user.name,
        email: item.user.email,
        cel: maskPhone(item.user.cel),
    }));

    return (
        <>
            <DashboardHeader />
            <main className={`min-h-[calc(100vh-6rem)] flex items-center justify-center`}>
                <div className={`w-full flex items-center justify-center`}>
                    <div className={`w-3/5 max-h-[60vh] border-1 overflow-auto border-black rounded-md shadow-sm shadow-black/50 p-6`}>
                        <DashboardTable columns={columns} data={data} />
                    </div>
                </div>
            </main>
        </>
    );
}
