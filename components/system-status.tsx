import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Shield, Cloud } from "lucide-react"

const systems = [
  {
    name: "Jenkins CI/CD",
    status: "operational",
    uptime: "99.98%",
    lastCheck: "2 min ago",
    icon: Server,
  },
  {
    name: "Docker Infrastructure",
    status: "operational",
    uptime: "99.95%",
    lastCheck: "1 min ago",
    icon: Database,
  },
  {
    name: "Firewall Security",
    status: "operational",
    uptime: "100%",
    lastCheck: "30 sec ago",
    icon: Shield,
  },
  {
    name: "AWS CloudWatch",
    status: "degraded",
    uptime: "98.12%",
    lastCheck: "5 min ago",
    icon: Cloud,
  },
]

export function SystemStatus() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">System Status</h2>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            All Systems Operational
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systems.map((system) => {
            const Icon = system.icon
            const statusColor = system.status === "operational" ? "text-accent" : "text-chart-3"

            return (
              <div
                key={system.name}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary border border-border"
              >
                <div className={`p-3 rounded-lg bg-card ${statusColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground truncate">{system.name}</p>
                    <Badge
                      variant="outline"
                      className={`${
                        system.status === "operational"
                          ? "bg-accent/10 text-accent border-accent/20"
                          : "bg-chart-3/10 text-chart-3 border-chart-3/20"
                      }`}
                    >
                      {system.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">Uptime: {system.uptime}</span>
                    <span className="text-sm text-muted-foreground">{system.lastCheck}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
