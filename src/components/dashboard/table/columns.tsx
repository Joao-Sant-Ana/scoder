'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import type { ColumnsDefinition } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { getCookie } from 'cookies-next';
import { MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<ColumnsDefinition>[] = [
    {
        accessorKey: 'cityAndState',
        header: 'Cidade - Estado',
    },
    {
        accessorKey: 'startValue',
        header: 'Valor inicial (Ano)',
    },
    {
        accessorKey: 'discountValue',
        header: 'Valor com desconto (Ano)',
    },
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'cel',
        header: 'Telefone',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const lead = row.original;
            const token = getCookie('token');

            const handleDelete = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_APP_URL}/api/leads/${lead.id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    if (!response.ok) {
                        return;
                    }

                    window.location.reload();
                } catch (error) {
                    console.error(error);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleDelete}>Deletar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
