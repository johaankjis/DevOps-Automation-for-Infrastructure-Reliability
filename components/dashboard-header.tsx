import { Activity, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">DevOps Monitor</h1>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-foreground">
                  Overview
                </Button>
              </Link>
              <Link href="/provisioning">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Provisioning
                </Button>
              </Link>
              <Link href="/security">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Security
                </Button>
              </Link>
              <Link href="/incidents">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Incidents
                </Button>
              </Link>
              <Link href="/costs">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Cost Reports
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="production">
              <SelectTrigger className="w-[140px] h-9 bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="12h">
              <SelectTrigger className="w-[120px] h-9 bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last 1 hour</SelectItem>
                <SelectItem value="12h">Last 12 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
