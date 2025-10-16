"use client"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProvisioningLogs } from "@/components/provisioning-logs"

export default function ProvisioningPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <ProvisioningLogs />
      </main>
    </div>
  )
}
