"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SecurityMonitor } from "@/components/security-monitor"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <SecurityMonitor />
      </main>
    </div>
  )
}
