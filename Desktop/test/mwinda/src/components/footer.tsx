import Link from "next/link"
import { Car, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Car className="w-8 h-8 text-black" />
              <span className="text-2xl font-bold text-black">Mwinda</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Votre service de taxi moderne et fiable. Réservez facilement vos trajets en quelques clics pour des
              déplacements sûrs et confortables.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-black mb-4">Navigation</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-black">
                Accueil
              </Link>
              <Link href="/reserver" className="block text-gray-600 hover:text-black">
                Réserver
              </Link>
              <Link href="/a-propos" className="block text-gray-600 hover:text-black">
                À propos
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-black">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-black mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">+243 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">contact@mwinda.cd</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Kinshasa, RDC</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Mwinda. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
