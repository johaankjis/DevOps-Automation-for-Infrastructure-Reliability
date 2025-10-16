"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { Search, Download, Pause, Play, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type LogLevel = "ERROR" | "WARN" | "INFO" | "DEBUG"
type LogService = "Docker" | "Jenkins" | "AWS" | "Kubernetes" | "Terraform"

interface LogEntry {
  id: string
  timestamp: Date
  level: LogLevel
  service: LogService
  message: string
}

// Mock log generator for demo
function generateMockLog(): LogEntry {
  const levels: LogLevel[] = ["ERROR", "WARN", "INFO", "DEBUG"]
  const services: LogService[] = ["Docker", "Jenkins", "AWS", "Kubernetes", "Terraform"]
  const messages = [
    "Container deployment initiated",
    "Build pipeline started",
    "EC2 instance provisioned successfully",
    "Pod scaling event triggered",
    "Infrastructure state synchronized",
    "Network configuration updated",
    "Security group rules applied",
    "Load balancer health check passed",
    "Database migration completed",
    "Cache invalidation successful",
    "API gateway endpoint created",
    "Certificate renewal scheduled",
    "Backup process initiated",
    "Resource allocation optimized",
    "Configuration drift detected",
  ]

  return {
    id: Math.random().toString(36).substring(7),
    timestamp: new Date(),
    level: levels[Math.floor(Math.random() * levels.length)],
    service: services[Math.floor(Math.random() * services.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
  }
}

export function ProvisioningLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isStreaming, setIsStreaming] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<LogLevel | "ALL">("ALL")
  const [serviceFilter, setServiceFilter] = useState<LogService | "ALL">("ALL")
  const scrollRef = useRef<HTMLDivElement>(null)

  // Simulate real-time log streaming
  useEffect(() => {
    if (!isStreaming) return

    const interval = setInterval(() => {
      const newLog = generateMockLog()
      setLogs((prev) => [...prev, newLog].slice(-100)) // Keep last 100 logs
    }, 2000)

    return () => clearInterval(interval)
  }, [isStreaming])

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current && isStreaming) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs, isStreaming])

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === "ALL" || log.level === levelFilter
    const matchesService = serviceFilter === "ALL" || log.service === serviceFilter
    return matchesSearch && matchesLevel && matchesService
  })

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case "ERROR":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "WARN":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "INFO":
        return "bg-accent/10 text-accent border-accent/20"
      case "DEBUG":
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setLevelFilter("ALL")
    setServiceFilter("ALL")
  }

  const hasActiveFilters = searchQuery || levelFilter !== "ALL" || serviceFilter !== "ALL"

  return (
    <Card className="p-6 bg-card border-border">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">Infrastructure Provisioning Logs</h2>
            {isStreaming && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Spinner className="h-3 w-3" />
                <span>Live streaming</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsStreaming(!isStreaming)} className="h-8">
              {isStreaming ? (
                <>
                  <Pause className="h-3 w-3" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  Resume
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <Download className="h-3 w-3" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <InputGroup className="flex-1">
            <InputGroupAddon>
              <Search className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <Select value={levelFilter} onValueChange={(value) => setLevelFilter(value as LogLevel | "ALL")}>
            <SelectTrigger className="w-[140px] h-9 bg-secondary border-border">
              <SelectValue placeholder="Log Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="ERROR">Error</SelectItem>
              <SelectItem value="WARN">Warning</SelectItem>
              <SelectItem value="INFO">Info</SelectItem>
              <SelectItem value="DEBUG">Debug</SelectItem>
            </SelectContent>
          </Select>

          <Select value={serviceFilter} onValueChange={(value) => setServiceFilter(value as LogService | "ALL")}>
            <SelectTrigger className="w-[140px] h-9 bg-secondary border-border">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Services</SelectItem>
              <SelectItem value="Docker">Docker</SelectItem>
              <SelectItem value="Jenkins">Jenkins</SelectItem>
              <SelectItem value="AWS">AWS</SelectItem>
              <SelectItem value="Kubernetes">Kubernetes</SelectItem>
              <SelectItem value="Terraform">Terraform</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="bg-secondary">
                Search: {searchQuery}
              </Badge>
            )}
            {levelFilter !== "ALL" && (
              <Badge variant="outline" className="bg-secondary">
                Level: {levelFilter}
              </Badge>
            )}
            {serviceFilter !== "ALL" && (
              <Badge variant="outline" className="bg-secondary">
                Service: {serviceFilter}
              </Badge>
            )}
          </div>
        )}

        {/* Logs Display */}
        <div className="border border-border rounded-lg bg-secondary/50">
          <ScrollArea className="h-[600px]">
            <div ref={scrollRef} className="p-4 space-y-2 font-mono text-sm">
              {filteredLogs.length === 0 ? (
                <div className="flex items-center justify-center h-[560px] text-muted-foreground">
                  {logs.length === 0 ? "Waiting for logs..." : "No logs match your filters"}
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-2 rounded hover:bg-card/50 transition-colors">
                    <span className="text-muted-foreground text-xs whitespace-nowrap mt-0.5">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                    <Badge variant="outline" className={`${getLevelColor(log.level)} text-xs font-medium`}>
                      {log.level}
                    </Badge>
                    <Badge variant="outline" className="bg-card text-foreground border-border text-xs">
                      {log.service}
                    </Badge>
                    <span className="text-foreground flex-1">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {filteredLogs.length} of {logs.length} logs
          </span>
          <span>Last updated: {logs.length > 0 ? logs[logs.length - 1].timestamp.toLocaleTimeString() : "N/A"}</span>
        </div>
      </div>
    </Card>
  )
}
