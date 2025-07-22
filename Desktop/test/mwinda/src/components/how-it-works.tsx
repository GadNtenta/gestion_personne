import { Smartphone, MapPin, Car } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: "1. Réservez",
      description: "Remplissez le formulaire avec vos informations de trajet",
    },
    {
      icon: MapPin,
      title: "2. Confirmez",
      description: "Indiquez votre point de départ et votre destination",
    },
    {
      icon: Car,
      title: "3. Voyagez",
      description: "Un chauffeur professionnel vient vous chercher",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black mb-4">Comment ça marche ?</h2>
          <p className="text-xl text-gray-600 text-center mb-16">Réserver votre taxi n'a jamais été aussi simple</p>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <step.icon className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
