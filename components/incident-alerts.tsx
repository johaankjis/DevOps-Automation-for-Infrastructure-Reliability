"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, TrendingDown, TrendingUp, User } from "lucide-react"

type IncidentSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
type IncidentStatus = "Open" | "Investigating" | "Resolved" | "Closed"
type IncidentCategory = "Infrastructure" | "Security" | "Performance" | "Network" | "Database"

interface Incident {
  id: string
  title: string
  severity: IncidentSeverity
  status: IncidentStatus
  category: IncidentCategory
  assignee: string
  createdAt: Date
  resolvedAt?: Date
  description: string
  affectedServices: string[]
}

// Mock data generator
function generateMockIncidents(): Incident[] {
  return [
    {
      id: "INC-001",
      title: "Database connection pool exhausted",
      severity: "CRITICAL",
      status: "Investigating",
      category: "Database",
      assignee: "Sarah Chen",
      createdAt: new Date(Date.now() - 1800000),
      description: "Production database connection pool reached maximum capacity causing service degradation",
      affectedServices: ["API Gateway", "User Service", "Payment Service"],
    },
    {
      id: "INC-002",
      title: "High CPU usage on web servers",
      severity: "HIGH",
      status: "Open",
      category: "Performance",
      assignee: "Mike Johnson",
      createdAt: new Date(Date.now() - 3600000),
      description: "Web server cluster experiencing sustained 85%+ CPU utilization",
      affectedServices: ["Web Frontend", "Load Balancer"],
    },
    {
      id: "INC-003",
      title: "SSL certificate expiring soon",
      severity: "MEDIUM",
      status: "Open",
      category: "Security",
      assignee: "Unassigned",
      createdAt: new Date(Date.now() - 7200000),
      description: "SSL certificate for api.example.com expires in 7 days",
      affectedServices: ["API Gateway"],
    },
    {
      id: "INC-004",
      title: "Intermittent network latency",
      severity: "MEDIUM",
      status: "Investigating",
      category: "Network",
      assignee: "Alex Rivera",
      createdAt: new Date(Date.now() - 10800000),
      description: "Users reporting slow response times from EU region",
      affectedServices: ["CDN", "Edge Servers"],
    },
    {
      id: "INC-005",
      title: "Container orchestration failure",
      severity: "HIGH",
      status: "Resolved",
      category: "Infrastructure",
      assignee: "Sarah Chen",
      createdAt: new Date(Date.now() - 14400000),
      resolvedAt: new Date(Date.now() - 7200000),
      description: "Kubernetes pod scheduling failures in production cluster",
      affectedServices: ["Container Platform", "Microservices"],
    },
    {
      id: "INC-006",
      title: "Backup job failed",
      severity: "LOW",
      status: "Closed",
      category: "Infrastructure",
      assignee: "Mike Johnson",
      createdAt: new Date(Date.now() - 86400000),
      resolvedAt: new Date(Date.now() - 72000000),
      description: "Nightly database backup job failed due to insufficient storage",
      affectedServices: ["Backup System"],
    },
  ]
}

export function IncidentAlerts() {
  const [incidents, setIncidents] = useState<Incident[]>(generateMockIncidents())
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
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

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "Open":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "Investigating":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "Resolved":
        return "bg-accent/10 text-accent border-accent/20"
      case "Closed":
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getSeverityIcon = (severity: IncidentSeverity) => {
    switch (severity) {
      case "CRITICAL":
      case "HIGH":
        return AlertCircle
      case "MEDIUM":
        return AlertTriangle
      case "LOW":
        return CheckCircle2
    }
  }

  const openIncidents = incidents.filter((i) => i.status === "Open" || i.status === "Investigating")
  const resolvedIncidents = incidents.filter((i) => i.status === "Resolved" || i.status === "Closed")
  const criticalCount = incidents.filter(
    (i) => i.severity === "CRITICAL" && i.status !== "Resolved" && i.status !== "Closed",
  ).length
  const avgResolutionTime = "2.4h"

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident)
    setDialogOpen(true)
  }

  const handleStatusChange = (incidentId: string, newStatus: IncidentStatus) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: newStatus,
              resolvedAt: newStatus === "Resolved" || newStatus === "Closed" ? new Date() : inc.resolvedAt,
            }
          : inc,
      ),
    )
  }

  return (
    <>
      {/* Incident Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Incidents</p>
              <p className="text-3xl font-semibold text-foreground">{openIncidents.length}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-15%</span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-destructive">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Critical Incidents</p>
              <p className="text-3xl font-semibold text-foreground">{criticalCount}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-50%</span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-chart-3">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
              <p className="text-3xl font-semibold text-foreground">{avgResolutionTime}</p>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">-22%</span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-primary">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Resolved Today</p>
              <p className="text-3xl font-semibold text-foreground">{resolvedIncidents.length}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent">+33%</span>
                <span className="text-xs text-muted-foreground">vs last week</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-secondary text-accent">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Incidents Table */}
      <Card className="p-6 bg-card border-border">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="active">Active Incidents</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <Button variant="default" size="sm">
              Create Incident
            </Button>
          </div>

          <TabsContent value="active" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openIncidents.map((incident) => {
                  const SeverityIcon = getSeverityIcon(incident.severity)
                  return (
                    <TableRow key={incident.id}>
                      <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                      <TableCell className="font-medium max-w-[300px] truncate">{incident.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                          <SeverityIcon className="h-3 w-3" />
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary text-foreground">
                          {incident.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{incident.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {incident.createdAt.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(incident)}>
                            View
                          </Button>
                          <Select
                            value={incident.status}
                            onValueChange={(value) => handleStatusChange(incident.id, value as IncidentStatus)}
                          >
                            <SelectTrigger className="w-[120px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Open">Open</SelectItem>
                              <SelectItem value="Investigating">Investigating</SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Resolved</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resolvedIncidents.map((incident) => {
                  const SeverityIcon = getSeverityIcon(incident.severity)
                  return (
                    <TableRow key={incident.id}>
                      <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                      <TableCell className="font-medium max-w-[300px] truncate">{incident.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                          <SeverityIcon className="h-3 w-3" />
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary text-foreground">
                          {incident.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{incident.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {incident.resolvedAt?.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(incident)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Incident Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="font-mono text-sm text-muted-foreground">{selectedIncident?.id}</span>
              <span>{selectedIncident?.title}</span>
            </DialogTitle>
            <DialogDescription>Incident details and response information</DialogDescription>
          </DialogHeader>

          {selectedIncident && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Severity</p>
                  <Badge variant="outline" className={getSeverityColor(selectedIncident.severity)}>
                    {selectedIncident.severity}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant="outline" className={getStatusColor(selectedIncident.status)}>
                    {selectedIncident.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <Badge variant="outline" className="bg-secondary text-foreground">
                    {selectedIncident.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assignee</p>
                  <p className="text-sm font-medium">{selectedIncident.assignee}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{selectedIncident.description}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Affected Services</p>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.affectedServices.map((service) => (
                    <Badge key={service} variant="outline" className="bg-secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created At</p>
                  <p className="text-sm">{selectedIncident.createdAt.toLocaleString()}</p>
                </div>
                {selectedIncident.resolvedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Resolved At</p>
                    <p className="text-sm">{selectedIncident.resolvedAt.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button variant="default">Update Incident</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
