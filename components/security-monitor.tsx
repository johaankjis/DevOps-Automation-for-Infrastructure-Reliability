"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, AlertTriangle, AlertCircle, CheckCircle2, TrendingDown, TrendingUp, Activity } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

type ThreatLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
type ThreatType = "Malware" | "DDoS" | "Intrusion" | "Data Breach" | "Phishing"
type VulnerabilityStatus = "Open" | "In Progress" | "Resolved"

interface SecurityEvent {
  id: string
  timestamp: Date
  type: ThreatType
  level: ThreatLevel
  source: string
  description: string
  status: "Active" | "Mitigated" | "Investigating"
}

interface Vulnerability {
  id: string
  cve: string
  severity: ThreatLevel
  component: string
  description: string
  status: VulnerabilityStatus
  discoveredDate: Date
}

// Mock data generators
function generateMockEvent(): SecurityEvent {
  const types: ThreatType[] = ["Malware", "DDoS", "Intrusion", "Data Breach", "Phishing"]
  const levels: ThreatLevel[] = ["CRITICAL", "HIGH", "MEDIUM", "LOW"]
  const sources = ["192.168.1.45", "10.0.0.23", "172.16.0.8", "203.0.113.42", "198.51.100.15"]
  const descriptions = [
    "Suspicious login attempt detected",
    "Unusual network traffic pattern",
    "Unauthorized access attempt blocked",
    "Potential SQL injection detected",
    "Brute force attack in progress",
    "Malicious payload identified",
    "Port scanning activity detected",
    "Certificate validation failed",
  ]
  const statuses: ("Active" | "Mitigated" | "Investigating")[] = ["Active", "Mitigated", "Investigating"]

  return {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date(Date.now() - Math.random() * 3600000),
    type: types[Math.floor(Math.random() * types.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }
}

function generateMockVulnerabilities(): Vulnerability[] {
  return [
    {
      id: "1",
      cve: "CVE-2024-1234",
      severity: "CRITICAL",
      component: "OpenSSL 1.1.1",
      description: "Remote code execution vulnerability in SSL/TLS implementation",
      status: "In Progress",
      discoveredDate: new Date("2024-01-15"),
    },
    {
      id: "2",
      cve: "CVE-2024-5678",
      severity: "HIGH",
      component: "Node.js 18.x",
      description: "Privilege escalation through improper input validation",
      status: "Open",
      discoveredDate: new Date("2024-02-01"),
    },
    {
      id: "3",
      cve: "CVE-2024-9012",
      severity: "MEDIUM",
      component: "Docker Engine",
      description: "Container escape vulnerability in runtime",
      status: "Resolved",
      discoveredDate: new Date("2024-01-20"),
    },
    {
      id: "4",
      cve: "CVE-2024-3456",
      severity: "HIGH",
      component: "PostgreSQL 14",
      description: "SQL injection vulnerability in query parser",
      status: "In Progress",
      discoveredDate: new Date("2024-02-10"),
    },
    {
      id: "5",
      cve: "CVE-2024-7890",
      severity: "LOW",
      component: "Nginx 1.20",
      description: "Information disclosure through error messages",
      status: "Open",
      discoveredDate: new Date("2024-02-05"),
    },
  ]
}

// Mock chart data
const threatTrendData = [
  { time: "00:00", threats: 12 },
  { time: "04:00", threats: 8 },
  { time: "08:00", threats: 15 },
  { time: "12:00", threats: 23 },
  { time: "16:00", threats: 18 },
  { time: "20:00", threats: 14 },
]

export function SecurityMonitor() {
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [vulnerabilities] = useState<Vulnerability[]>(generateMockVulnerabilities())

  useEffect(() => {
    // Generate initial events
    const initialEvents = Array.from({ length: 10 }, generateMockEvent)
    setEvents(initialEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))

    // Simulate real-time events
    const interval = setInterval(() => {
      const newEvent = generateMockEvent()
      setEvents((prev) => [newEvent, ...prev].slice(0, 20))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getLevelColor = (level: ThreatLevel) => {
    switch (level) {
      case "CRITICAL":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "HIGH":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "MEDIUM":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20"
      case "LOW":
        return "bg-accent/10 text-accent border-accent/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Open":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "Investigating":
      case "In Progress":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "Mitigated":
      case "Resolved":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const criticalCount = events.filter((e) => e.level === "CRITICAL").length
  const activeCount = events.filter((e) => e.status === "Active").length
  const openVulnerabilities = vulnerabilities.filter((v) => v.status === "Open").length

  return (
    <>
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Threats</p>
              <p className="text-3xl font-semibold text-foreground">{activeCount}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-23%</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Critical Events</p>
              <p className="text-3xl font-semibold text-foreground">{criticalCount}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-45%</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-chart-3">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Open Vulnerabilities</p>
              <p className="text-3xl font-semibold text-foreground">{openVulnerabilities}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">+12%</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-primary">
              <Shield className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Security Score</p>
              <p className="text-3xl font-semibold text-foreground">87/100</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">+5 points</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-accent">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Threat Trend Chart */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Threat Activity (24h)</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Real-time monitoring</span>
            </div>
          </div>
          <ChartContainer
            config={{
              threats: {
                label: "Threats",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <AreaChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="threats"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </Card>

      {/* Tabs for Events and Vulnerabilities */}
      <Card className="p-6 bg-card border-border">
        <Tabs defaultValue="events" className="w-full">
          <TabsList>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Recent security events and threat detections</p>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {event.timestamp.toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary text-foreground">
                          {event.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getLevelColor(event.level)}>
                          {event.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{event.source}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{event.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Known vulnerabilities and CVE tracking</p>
              <Button variant="outline" size="sm">
                Scan Now
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CVE ID</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Component</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Discovered</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vulnerabilities.map((vuln) => (
                  <TableRow key={vuln.id}>
                    <TableCell className="font-mono text-xs">{vuln.cve}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getLevelColor(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{vuln.component}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{vuln.description}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {vuln.discoveredDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(vuln.status)}>
                        {vuln.status}
                      </Badge>
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
