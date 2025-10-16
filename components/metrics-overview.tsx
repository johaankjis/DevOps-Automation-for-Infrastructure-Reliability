import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp, CheckCircle2, XCircle, AlertTriangle, DollarSign } from "lucide-react"

const metrics = [
  {
    label: "Active Deployments",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-accent",
  },
  {
    label: "Security Events",
    value: "3",
    change: "-67%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-chart-3",
  },
  {
    label: "Active Incidents",
    value: "1",
    change: "-50%",
    trend: "down",
    icon: XCircle,
    color: "text-destructive",
  },
  {
    label: "Monthly Cost",
    value: "$8,240",
    change: "-18%",
    trend: "down",
    icon: DollarSign,
    color: "text-primary",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "down" && metric.label !== "Active Deployments"
        const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown

        return (
          <Card key={metric.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                <div className="flex items-center gap-1">
                  <TrendIcon className={`h-3 w-3 ${isPositive ? "text-accent" : "text-muted-foreground"}`} />
                  <span className={`text-xs ${isPositive ? "text-accent" : "text-muted-foreground"}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className={`p-2 rounded-lg bg-secondary ${metric.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
