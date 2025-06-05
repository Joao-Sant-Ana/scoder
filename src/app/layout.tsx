import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Clear energy',
    description: 'Venha conferir o desconto na sua energia',
    keywords: ["energia", "limpa", "energia limpa", "desconto", "preço energia", "desconto energia"],
    robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        googleBot: "index, foolow"
    },
    applicationName: "Clear energy",
    appleWebApp: {
        title: "Clear energy",
        statusBarStyle: "default",
        capable: true
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Toaster />
                {children}
            </body>
        </html>
    );
}
