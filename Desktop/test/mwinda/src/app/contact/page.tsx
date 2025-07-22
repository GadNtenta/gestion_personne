import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-12 text-black">Contactez-nous</h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-black">Nos coordonnées</h2>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Phone className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">Téléphone</h3>
                          <p className="text-gray-700">+243 123 456 789</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Mail className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">Email</h3>
                          <p className="text-gray-700">contact@mwinda.cd</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <MapPin className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">Adresse</h3>
                          <p className="text-gray-700">
                            123 Avenue de la Paix
                            <br />
                            Kinshasa, RDC
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                          <Clock className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">Horaires</h3>
                          <p className="text-gray-700">
                            24h/24 - 7j/7
                            <br />
                            Service client : 8h - 20h
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6 text-black">Envoyez-nous un message</h2>

                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Nom complet</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Votre nom complet"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Email</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Sujet</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Sujet de votre message"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">Message</label>
                        <textarea
                          rows={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                          placeholder="Votre message..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
                      >
                        Envoyer le message
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
