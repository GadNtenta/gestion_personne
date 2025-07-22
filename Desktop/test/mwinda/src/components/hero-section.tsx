import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Clock, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Votre taxi en un clic avec <span className="text-black">Mwinda</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Réservez facilement votre transport. Service rapide, fiable et sécurisé disponible 24h/24 dans toute la
            ville.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-4">
              <Link href="/reserver">Réserver maintenant</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-black text-black hover:bg-gray-50 bg-transparent"
            >
              <Link href="/a-propos">En savoir plus</Link>
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">500+</h3>
              <p className="text-gray-600">Véhicules disponibles</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">5 min</h3>
              <p className="text-gray-600">Temps d'attente moyen</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">100%</h3>
              <p className="text-gray-600">Trajets sécurisés</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
