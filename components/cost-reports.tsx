"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingDown, TrendingUp, Lightbulb, CheckCircle2 } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

interface ServiceCost {
  service: string
  currentMonth: number
  lastMonth: number
  trend: number
  category: string
}

interface Recommendation {
  id: string
  title: string
  impact: "HIGH" | "MEDIUM" | "LOW"
  savings: number
  description: string
  status: "New" | "In Progress" | "Completed"
}

// Mock data
const costTrendData = [
  { date: "Jan 1", cost: 7200 },
  { date: "Jan 8", cost: 7800 },
  { date: "Jan 15", cost: 8400 },
  { date: "Jan 22", cost: 8100 },
  { date: "Jan 29", cost: 8240 },
  { date: "Feb 5", cost: 7900 },
  { date: "Feb 12", cost: 7600 },
]

const serviceCostData: ServiceCost[] = [
  {
    service: "AWS EC2",
    currentMonth: 3200,
    lastMonth: 3800,
    trend: -15.8,
    category: "Compute",
  },
  {
    service: "AWS RDS",
    currentMonth: 1800,
    lastMonth: 1650,
    trend: 9.1,
    category: "Database",
  },
  {
    service: "AWS S3",
    currentMonth: 890,
    lastMonth: 920,
    trend: -3.3,
    category: "Storage",
  },
  {
    service: "CloudFront CDN",
    currentMonth: 1200,
    lastMonth: 1100,
    trend: 9.1,
    category: "Network",
  },
  {
    service: "Lambda Functions",
    currentMonth: 450,
    lastMonth: 380,
    trend: 18.4,
    category: "Compute",
  },
  {
    service: "ElastiCache",
    currentMonth: 700,
    lastMonth: 750,
    trend: -6.7,
    category: "Database",
  },
]

const categoryBreakdown = [
  { category: "Compute", cost: 3650 },
  { category: "Database", cost: 2500 },
  { category: "Storage", cost: 890 },
  { category: "Network", cost: 1200 },
]

const recommendations: Recommendation[] = [
  {
    id: "REC-001",
    title: "Right-size EC2 instances",
    impact: "HIGH",
    savings: 1200,
    description: "3 EC2 instances are over-provisioned with <30% CPU utilization. Downsize to save costs.",
    status: "New",
  },
  {
    id: "REC-002",
    title: "Enable S3 Intelligent-Tiering",
    impact: "MEDIUM",
    savings: 280,
    description: "Move infrequently accessed S3 objects to cheaper storage tiers automatically.",
    status: "In Progress",
  },
  {
    id: "REC-003",
    title: "Purchase Reserved Instances",
    impact: "HIGH",
    savings: 1800,
    description: "Commit to 1-year reserved instances for predictable workloads to save 40%.",
    status: "New",
  },
  {
    id: "REC-004",
    title: "Delete unused EBS volumes",
    impact: "LOW",
    savings: 120,
    description: "5 unattached EBS volumes detected that are no longer in use.",
    status: "Completed",
  },
  {
    id: "REC-005",
    title: "Optimize Lambda memory allocation",
    impact: "MEDIUM",
    savings: 340,
    description: "Lambda functions are over-allocated. Reduce memory to optimal levels.",
    status: "New",
  },
]

export function CostReports() {
  const totalCost = 8240
  const lastMonthCost = 10050
  const costChange = ((totalCost - lastMonthCost) / lastMonthCost) * 100
  const forecastCost = 7600
  const budgetLimit = 10000
  const budgetUtilization = (totalCost / budgetLimit) * 100
  const potentialSavings = recommendations
    .filter((r) => r.status !== "Completed")
    .reduce((sum, r) => sum + r.savings, 0)

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "bg-accent/10 text-accent border-accent/20"
      case "MEDIUM":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "LOW":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-primary/10 text-primary border-primary/20"
      case "In Progress":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "Completed":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <>
      {/* Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Month Cost</p>
              <p className="text-3xl font-semibold text-foreground">${totalCost.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">{costChange.toFixed(1)}%</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Forecasted Cost</p>
              <p className="text-3xl font-semibold text-foreground">${forecastCost.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-7.8%</span>
                <span className="text-xs text-muted-foreground">next month</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-chart-2">
              <TrendingDown className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <p className="text-3xl font-semibold text-foreground">${potentialSavings.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3 text-chart-3" />
                <span className="text-xs text-chart-3">{recommendations.length} recommendations</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-accent">
              <Lightbulb className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Budget Utilization</p>
              <p className="text-3xl font-semibold text-foreground">{budgetUtilization.toFixed(0)}%</p>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">Under budget</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-accent">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Cost Trend Chart */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Cost Trend (Last 30 Days)</h2>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              -18% vs last period
            </Badge>
          </div>
          <ChartContainer
            config={{
              cost: {
                label: "Cost",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <AreaChart data={costTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </Card>

      {/* Category Breakdown Chart */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Cost by Category</h2>
          <ChartContainer
            config={{
              cost: {
                label: "Cost",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[250px]"
          >
            <BarChart data={categoryBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="cost" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>

      {/* Detailed Tables */}
      <Card className="p-6 bg-card border-border">
        <Tabs defaultValue="services" className="w-full">
          <TabsList>
            <TabsTrigger value="services">Service Costs</TabsTrigger>
            <TabsTrigger value="recommendations">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Detailed breakdown by service</p>
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Month</TableHead>
                  <TableHead>Last Month</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceCostData.map((service) => (
                  <TableRow key={service.service}>
                    <TableCell className="font-medium">{service.service}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-secondary text-foreground">
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">${service.currentMonth.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">${service.lastMonth.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {service.trend < 0 ? (
                          <>
                            <TrendingDown className="h-3 w-3 text-accent" />
                            <span className="text-xs text-accent">{service.trend.toFixed(1)}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-3 w-3 text-destructive" />
                            <span className="text-xs text-destructive">+{service.trend.toFixed(1)}%</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">AI-powered cost optimization recommendations</p>
              <Button variant="default" size="sm">
                Apply All
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Potential Savings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="font-mono text-xs">{rec.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{rec.title}</p>
                        <p className="text-xs text-muted-foreground max-w-[400px]">{rec.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getImpactColor(rec.impact)}>
                        {rec.impact}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-accent">${rec.savings.toLocaleString()}/mo</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(rec.status)}>
                        {rec.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {rec.status === "New" && (
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      )}
                      {rec.status === "In Progress" && (
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      )}
                      {rec.status === "Completed" && <CheckCircle2 className="h-4 w-4 text-accent" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  )
}
