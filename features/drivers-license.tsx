"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScanLine, Save, AlertCircle, RefreshCw } from "lucide-react"

interface LicenseData {
  licenseNumber: string
  lastName: string
  firstName: string
  middleName: string
  address: string
  birthDate: string
  issueDate: string
  expiryDate: string
  restrictions: string
  classification: string
  nationality: string
  gender: string
  height: string
  weight: string
  bloodType: string
}

export function DriversLicenseScan() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)
  const [scanError, setScanError] = useState(false)
  const [licenseData, setLicenseData] = useState<LicenseData>({
    licenseNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
    address: "",
    birthDate: "",
    issueDate: "",
    expiryDate: "",
    restrictions: "",
    classification: "",
    nationality: "",
    gender: "",
    height: "",
    weight: "",
    bloodType: "",
  })

  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate scanning process
  const handleScan = () => {
    setIsScanning(true)
    setScanSuccess(false)
    setScanError(false)

    // Clear any existing timeout
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current)
    }

    // Simulate scanning delay (3 seconds)
    scanTimeoutRef.current = setTimeout(() => {
      // 90% chance of success for demo purposes
      const success = Math.random() < 0.9

      if (success) {
        setScanSuccess(true)
        // Populate with sample data
        setLicenseData({
          licenseNumber: "N01-12-345678",
          lastName: "DELA CRUZ",
          firstName: "JUAN",
          middleName: "SANTOS",
          address: "123 MAIN ST., MAKATI CITY, METRO MANILA",
          birthDate: "1990-01-15",
          issueDate: "2022-05-10",
          expiryDate: "2027-05-10",
          restrictions: "A",
          classification: "NON-PROFESSIONAL",
          nationality: "FILIPINO",
          gender: "MALE",
          height: "170",
          weight: "65",
          bloodType: "O+",
        })
      } else {
        setScanError(true)
      }

      setIsScanning(false)
    }, 3000)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }
    }
  }, [])

  const handleSave = () => {
    // In a real application, this would save the data to a database
    alert("License data saved successfully!")
  }

  const handleInputChange = (field: keyof LicenseData, value: string) => {
    setLicenseData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setLicenseData({
      licenseNumber: "",
      lastName: "",
      firstName: "",
      middleName: "",
      address: "",
      birthDate: "",
      issueDate: "",
      expiryDate: "",
      restrictions: "",
      classification: "",
      nationality: "",
      gender: "",
      height: "",
      weight: "",
      bloodType: "",
    })
    setScanSuccess(false)
    setScanError(false)
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan">Scan License</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan Driver's License</CardTitle>
              <CardDescription>
                Position the PDF417 barcode on the back of the license under the scanner.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 bg-muted/50 relative min-h-[200px]">
                {isScanning ? (
                  <>
                    <div className="w-full h-1 bg-primary absolute top-1/2 animate-pulse"></div>
                    <ScanLine className="w-16 h-16 text-primary animate-pulse" />
                    <p className="mt-4 text-center">Scanning... Please hold the barcode steady</p>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-16 h-16 text-muted-foreground" />
                    <p className="mt-4 text-center">Ready to scan</p>
                  </>
                )}
              </div>

              {scanSuccess && (
                <Alert className="bg-green-50 border-green-200">
                  <AlertCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">Success</AlertTitle>
                  <AlertDescription className="text-green-600">
                    License scanned successfully. Please verify the information below.
                  </AlertDescription>
                </Alert>
              )}

              {scanError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Scan Failed</AlertTitle>
                  <AlertDescription>Unable to read the barcode. Please try again or use manual entry.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm} disabled={isScanning}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleScan} disabled={isScanning}>
                <ScanLine className="mr-2 h-4 w-4" />
                {isScanning ? "Scanning..." : "Start Scan"}
              </Button>
            </CardFooter>
          </Card>

          {scanSuccess && (
            <LicenseDataForm licenseData={licenseData} onInputChange={handleInputChange} onSave={handleSave} />
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Data Entry</CardTitle>
              <CardDescription>Enter the driver's license information manually.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Use this form when the barcode scanner is unavailable or if the scan fails.
              </p>
            </CardContent>
          </Card>

          <LicenseDataForm licenseData={licenseData} onInputChange={handleInputChange} onSave={handleSave} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface LicenseDataFormProps {
  licenseData: LicenseData
  onInputChange: (field: keyof LicenseData, value: string) => void
  onSave: () => void
}

function LicenseDataForm({ licenseData, onInputChange, onSave }: LicenseDataFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>License Information</CardTitle>
        <CardDescription>Review and edit the extracted information from the LTO driver's license.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={licenseData.licenseNumber}
              onChange={(e) => onInputChange("licenseNumber", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classification">Classification</Label>
            <Input
              id="classification"
              value={licenseData.classification}
              onChange={(e) => onInputChange("classification", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restrictions">Restrictions</Label>
            <Input
              id="restrictions"
              value={licenseData.restrictions}
              onChange={(e) => onInputChange("restrictions", e.target.value)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={licenseData.lastName}
                onChange={(e) => onInputChange("lastName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={licenseData.firstName}
                onChange={(e) => onInputChange("firstName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                value={licenseData.middleName}
                onChange={(e) => onInputChange("middleName", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={licenseData.address} onChange={(e) => onInputChange("address", e.target.value)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              value={licenseData.nationality}
              onChange={(e) => onInputChange("nationality", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" value={licenseData.gender} onChange={(e) => onInputChange("gender", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              type="date"
              value={licenseData.birthDate}
              onChange={(e) => onInputChange("birthDate", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" value={licenseData.height} onChange={(e) => onInputChange("height", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" value={licenseData.weight} onChange={(e) => onInputChange("weight", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type</Label>
            <Input
              id="bloodType"
              value={licenseData.bloodType}
              onChange={(e) => onInputChange("bloodType", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={licenseData.issueDate}
              onChange={(e) => onInputChange("issueDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={licenseData.expiryDate}
              onChange={(e) => onInputChange("expiryDate", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save License Data
        </Button>
      </CardFooter>
    </Card>
  )
}
