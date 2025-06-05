"use client"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LeadChartProps } from "@/types"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function LeadChart({ chartData }: { chartData: LeadChartProps[] }) {
    return (
        <div className={`flex items-center w-full justify-center`}>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-2/4">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="year"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 4)}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--chart-4)" radius={4} />
                    <Bar dataKey="discountValue" fill="var(--chart-5)" radius={4} />
                </BarChart>
            </ChartContainer>   
        </div>

    )
}