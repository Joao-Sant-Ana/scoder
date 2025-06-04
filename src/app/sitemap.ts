import { type MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const defaultPages: MetadataRoute.Sitemap = [
        {
            url: url,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1
        },
        {
            url: `${url}/admin`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.5
        }
    ]

    const sitemap = [
        ...defaultPages
    ]

    return sitemap;
}