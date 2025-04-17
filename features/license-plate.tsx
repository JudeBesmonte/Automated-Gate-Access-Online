"use client"

import { useState } from "react"
import { Camera, Upload, Save, CheckCircle, ChevronRight, FileImage } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function LicensePlateRecognition() {
  const [plateDetected, setPlateDetected] = useState(false)
  const [plateNumber, setPlateNumber] = useState("")
  const [autoScan, setAutoScan] = useState(true)
  const [autoSave, setAutoSave] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  // This is just for UI demonstration
  const handleImageUpload = () => {
    // Simulate plate detection after 1 second
    setTimeout(() => {
      setPlateDetected(true)
      setPlateNumber("ABC 1234")
    }, 1000)
  }

  const resetDetection = () => {
    setPlateDetected(false)
    setPlateNumber("")
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">License Plate Recognition</h1>
          <p className="text-muted-foreground">Scan or upload an image to detect license plates automatically</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Plate Scanner</CardTitle>
                <CardDescription>Upload an image or use your camera to scan a license plate</CardDescription>
              </div>
              {plateDetected && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Plate Detected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upload" onClick={resetDetection}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </TabsTrigger>
                <TabsTrigger value="camera" onClick={resetDetection}>
                  <Camera className="h-4 w-4 mr-2" />
                  Use Camera
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={handleImageUpload}
                >
                  <div className="flex flex-col items-center gap-2">
                    <FileImage className="h-10 w-10 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG or JPEG (max. 10MB)</p>
                    </div>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      id="license-plate-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById("license-plate-upload")?.click()
                      }}
                    >
                      Browse files
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="camera" className="space-y-4">
                <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Camera access required</p>
                      <p className="text-sm text-muted-foreground">Click the button below to enable your camera</p>
                    </div>
                    <Button onClick={handleImageUpload}>
                      <Camera className="h-4 w-4 mr-2" />
                      Enable Camera
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {plateDetected && (
              <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Detected License Plate</h3>
                    <Badge>{plateNumber}</Badge>
                  </div>
                  <div className="h-20 bg-muted rounded flex items-center justify-center">
                    <p className="text-xl font-bold tracking-widest">{plateNumber}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <Switch id="auto-scan" checked={autoScan} onCheckedChange={setAutoScan} />
                <Label htmlFor="auto-scan">Auto-scan license plate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                <Label htmlFor="auto-save">Auto-save upon detection</Label>
              </div>
            </div>
            <div className="flex gap-2 ml-auto mt-4 sm:mt-0">
              <Button variant="outline" onClick={resetDetection}>
                Reset
              </Button>
              <Button disabled={!plateDetected} onClick={() => alert("Plate saved!")}>
                <Save className="h-4 w-4 mr-2" />
                Save Plate
              </Button>
              <Button variant="secondary" onClick={() => alert("Redirecting to Driver's License page...")}>
                Driver's License
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scanner Settings</CardTitle>
            <CardDescription>Configure how the license plate scanner works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Detection Confidence Threshold</Label>
                  <p className="text-sm text-muted-foreground">Minimum confidence level required for a detection</p>
                </div>
                <div className="w-[180px]">
                  <div className="flex items-center">
                    <Input type="range" min="0" max="100" defaultValue="80" className="w-full" />
                    <span className="ml-2 w-12 text-sm">80%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Process Multiple Plates</Label>
                  <p className="text-sm text-muted-foreground">Detect multiple license plates in a single image</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enhanced Recognition</Label>
                  <p className="text-sm text-muted-foreground">Use advanced algorithms for better accuracy</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
