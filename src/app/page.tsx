import { CaptureForm } from "@/components/captureLeadPage/Form";

export default function Home() {
  return (
    <main className={`w-screen min-h-[calc(100vh-6rem)] flex justify-center items-center`}>
      <CaptureForm />
    </main>
  )
}