"use client"
import { useParams } from "next/navigation"
import { MoveLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PublicHeader() {
    const params = useParams<{ lead_id?: string }>()

    const isLeadPage = Boolean(params?.lead_id);

    return (
        <header className={`h-24 px-5 py-5 bg-primary-foreground flex items-center shadow-sm shadow-black/60 justify-between`}>
            {isLeadPage ? (
                <Button asChild>
                    <Link href="/">
                        <MoveLeft /> <p className={`md:block hidden`}>Voltar</p>
                    </Link>
                </Button>
            ) : (
                <h1>Clean Energy</h1>
            )}
            <Button asChild>
                <Link href="/admin">Área administrativa</Link>
            </Button>
        </header>
    )
}