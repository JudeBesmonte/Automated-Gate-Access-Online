"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertCircle, ArrowRightCircle, ArrowLeftCircle } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

export default function RFIDTag() {
  // Static data for demonstration
  const isDetected = true
  const vehicleDirection = "entry" // or "exit"
  const lastDetectionTime = new Date().toLocaleTimeString()

  // Mock history data
  const detectionHistory = [
    { id: "TAG001", vehicleType: "Car", direction: "entry", timestamp: "10:15:32 AM", status: "Authorized" },
    { id: "TAG002", vehicleType: "Truck", direction: "exit", timestamp: "10:10:45 AM", status: "Authorized" },
    { id: "TAG003", vehicleType: "Bike", direction: "entry", timestamp: "09:58:21 AM", status: "Unauthorized" },
    { id: "TAG001", vehicleType: "Car", direction: "exit", timestamp: "09:45:12 AM", status: "Authorized" },
    { id: "TAG004", vehicleType: "Car", direction: "entry", timestamp: "09:30:05 AM", status: "Authorized" },
  ]

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Detection Status Card */}
        <Card className={isDetected ? "border-green-500 border-2" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Detection Status
              {isDetected ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-gray-400" />
              )}
            </CardTitle>
            <CardDescription>Last updated: {lastDetectionTime}</CardDescription>
          </CardHeader>
          <CardContent>
            {isDetected ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle>RFID Tag Detected</AlertTitle>
                <AlertDescription>Tag successfully scanned and processed.</AlertDescription>
              </Alert>
            ) : (
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No RFID Tag Detected</AlertTitle>
                <AlertDescription>Waiting for RFID tag to be scanned.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Vehicle Direction Card */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Direction</CardTitle>
            <CardDescription>Current vehicle movement</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-32">
            {isDetected && (
              <>
                {vehicleDirection === "entry" ? (
                  <div className="flex flex-col items-center">
                    <ArrowRightCircle className="h-16 w-16 text-blue-500" />
                    <Badge className="mt-2 bg-blue-500">Vehicle Entering</Badge>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ArrowLeftCircle className="h-16 w-16 text-orange-500" />
                    <Badge className="mt-2 bg-orange-500">Vehicle Exiting</Badge>
                  </div>
                )}
              </>
            )}
            {!isDetected && <div className="text-gray-400 text-center">No vehicle movement detected</div>}
          </CardContent>
        </Card>

        {/* RFID Reader Control Card */}
        <Card>
          <CardHeader>
            <CardTitle>RFID Reader Control</CardTitle>
            <CardDescription>Turn the RFID reader on or off</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Reader Status:</span>
              <div className="flex items-center space-x-2">
                <Toggle aria-label="Toggle RFID Reader" defaultPressed>
                  <span className="px-2">Active</span>
                </Toggle>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button variant="outline" className="w-full mt-2">
                Reset Reader
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detection History */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detection History</h2>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="entry">Entry</TabsTrigger>
            <TabsTrigger value="exit">Exit</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag ID</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detectionHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        {record.direction === "entry" ? (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
                          >
                            <ArrowRightCircle className="h-3 w-3" /> Entry
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1"
                          >
                            <ArrowLeftCircle className="h-3 w-3" /> Exit
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{record.timestamp}</TableCell>
                      <TableCell>
                        <Badge className={record.status === "Authorized" ? "bg-green-500" : "bg-red-500"}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entry" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detectionHistory
                    .filter((record) => record.direction === "entry")
                    .map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.timestamp}</TableCell>
                        <TableCell>
                          <Badge className={record.status === "Authorized" ? "bg-green-500" : "bg-red-500"}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exit" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag ID</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detectionHistory
                    .filter((record) => record.direction === "exit")
                    .map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.timestamp}</TableCell>
                        <TableCell>
                          <Badge className={record.status === "Authorized" ? "bg-green-500" : "bg-red-500"}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
