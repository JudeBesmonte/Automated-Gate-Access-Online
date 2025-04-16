import RFIDTag from "@/features/rfid-tag"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">RFID Detection System</h1>
      <RFIDTag />
    </main>
  )
}
