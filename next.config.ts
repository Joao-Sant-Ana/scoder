import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,POST,HEAD,OPTIONS"},
                    { key: "Access-Control-Allow-Headers", value: "Accept, Content-Type, Authorization" },
                ]
            }
        ]
    }
};

export default nextConfig;
