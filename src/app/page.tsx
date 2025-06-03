import { CaptureForm } from "@/components/captureLeadPage/Form";
import { PublicHeader } from "@/components/shared/PublicHeader";

export default function Home() {
  return (
    <>
      <PublicHeader />
      <main className={`w-screen min-h-[calc(100vh-6rem)] flex justify-center items-center`}>
        <CaptureForm />
      </main>
    </>
  )
}