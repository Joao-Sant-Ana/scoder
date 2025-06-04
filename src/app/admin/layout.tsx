import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
    applicationName: "Admin",
    appleWebApp: {
        title: "Admin",
        statusBarStyle: "default",
        capable: true
    }
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
