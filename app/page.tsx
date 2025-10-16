import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { SystemStatus } from "@/components/system-status"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <MetricsOverview />
        <SystemStatus />
      </main>
    </div>
  )
}
