import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReservationForm } from "@/components/reservation-form"

export default function ReserverPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-black">Réserver un taxi</h1>
            <ReservationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
