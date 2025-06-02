"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart" // Assuming ChartConfig type is available

const chartData = [
  { month: "January", active: 12, expiringSoon: 2, expired: 1 },
  { month: "February", active: 15, expiringSoon: 3, expired: 0 },
  { month: "March", active: 10, expiringSoon: 1, expired: 2 },
  { month: "April", active: 18, expiringSoon: 4, expired: 1 },
  { month: "May", active: 14, expiringSoon: 2, expired: 0 },
  { month: "June", active: 20, expiringSoon: 5, expired: 1 },
]

const chartConfig = {
  active: {
    label: "Active Rentals",
    color: "hsl(var(--chart-1))",
  },
  expiringSoon: {
    label: "Expiring Soon",
    color: "hsl(var(--chart-2))",
  },
  expired: {
    label: "Expired",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function SmsRentalStatusChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">SMS Rental Status</CardTitle>
        <CardDescription>Overview of your SMS number rental lifecycle.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
            <Bar dataKey="active" fill={chartConfig.active.color} name={chartConfig.active.label} radius={[4, 4, 0, 0]} />
            <Bar dataKey="expiringSoon" fill={chartConfig.expiringSoon.color} name={chartConfig.expiringSoon.label} radius={[4, 4, 0, 0]} />
            <Bar dataKey="expired" fill={chartConfig.expired.color} name={chartConfig.expired.label} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
