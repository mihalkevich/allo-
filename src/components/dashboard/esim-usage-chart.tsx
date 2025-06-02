"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { date: "2023-01-01", plan1: 2.5, plan2: 1.0 },
  { date: "2023-01-08", plan1: 3.0, plan2: 1.5 },
  { date: "2023-01-15", plan1: 2.0, plan2: 2.0 },
  { date: "2023-01-22", plan1: 4.5, plan2: 2.8 },
  { date: "2023-01-29", plan1: 3.5, plan2: 3.2 },
  { date: "2023-02-05", plan1: 5.0, plan2: 4.0 },
]

const chartConfig = {
  plan1: {
    label: "USA Data Roamer (GB)",
    color: "hsl(var(--chart-1))",
  },
  plan2: {
    label: "Euro Explorer (GB)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function EsimUsageChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">eSIM Data Usage</CardTitle>
        <CardDescription>Weekly data consumption for your active eSIM plans.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
            <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value} GB`} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string) => [`${value.toFixed(1)} GB`, chartConfig[name as keyof typeof chartConfig]?.label || name]}
            />
            <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }}/>
            <Line type="monotone" dataKey="plan1" stroke={chartConfig.plan1.color} strokeWidth={2} name={chartConfig.plan1.label} dot={{ r: 4, fill: chartConfig.plan1.color }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="plan2" stroke={chartConfig.plan2.color} strokeWidth={2} name={chartConfig.plan2.label} dot={{ r: 4, fill: chartConfig.plan2.color }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
