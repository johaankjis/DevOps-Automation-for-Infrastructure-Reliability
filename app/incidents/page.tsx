"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { IncidentAlerts } from "@/components/incident-alerts"

export default function IncidentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <IncidentAlerts />
      </main>
    </div>
  )
}
