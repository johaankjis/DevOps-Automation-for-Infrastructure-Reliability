"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { CostReports } from "@/components/cost-reports"

export default function CostsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <CostReports />
      </main>
    </div>
  )
}
