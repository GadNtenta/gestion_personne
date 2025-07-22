import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Car, Users, Clock, Shield } from "lucide-react"

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12 text-black">À propos de Mwinda</h1>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-black">Notre Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  Mwinda révolutionne le transport urbain en offrant un service de taxi moderne, fiable et accessible à
                  tous. Nous connectons les passagers avec des chauffeurs professionnels pour des trajets sûrs et
                  confortables.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-black">Notre Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  Devenir la plateforme de référence pour le transport de personnes, en proposant des solutions
                  innovantes qui simplifient les déplacements quotidiens de nos utilisateurs.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-semibold mb-2 text-black">Flotte Moderne</h3>
                <p className="text-gray-600 text-sm">Véhicules récents et bien entretenus</p>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-semibold mb-2 text-black">Chauffeurs Pros</h3>
                <p className="text-gray-600 text-sm">Conducteurs expérimentés et courtois</p>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-semibold mb-2 text-black">Service 24/7</h3>
                <p className="text-gray-600 text-sm">Disponible à toute heure</p>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-semibold mb-2 text-black">Sécurité</h3>
                <p className="text-gray-600 text-sm">Trajets sécurisés et assurés</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
