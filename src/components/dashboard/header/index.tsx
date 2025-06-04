'use client';
import { Button } from '@/components/ui/button';
import { useDeleteCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

export function DashboardHeader() {
    const delCookie = useDeleteCookie();

    const removeCookie = () => {
        delCookie('token');
        redirect('/');
    };

    return (
        <header
            className={`h-24 px-5 py-5 bg-primary-foreground flex items-center shadow-sm shadow-black/60 justify-between`}
        >
            <h1>Dashboard admin</h1>
            <Button variant="ghost" onClick={() => removeCookie()}>
                Sair
            </Button>
        </header>
    );
}
