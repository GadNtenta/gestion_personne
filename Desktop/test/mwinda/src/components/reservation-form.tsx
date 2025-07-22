"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Car, Bike } from "lucide-react"

export function ReservationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    departure: "",
    destination: "",
    transportType: "voiture",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulation d'envoi du formulaire
    console.log("Données de réservation:", formData)

    // Ici vous pourriez envoyer les données à votre backend ou par email
    // Par exemple avec une API route Next.js ou un service d'email

    setIsSubmitted(true)

    // Reset du formulaire après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        departure: "",
        destination: "",
        transportType: "voiture",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-black mb-2">Réservation envoyée !</h3>
          <p className="text-gray-600">
            Nous vous contacterons dans les plus brefs délais pour confirmer votre réservation.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-black">Formulaire de réservation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom et Prénom */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-black font-medium">
                Prénom *
              </Label>
              <input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-black font-medium">
                Nom *
              </Label>
              <input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Votre nom"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <Label htmlFor="phone" className="text-black font-medium">
              Numéro de téléphone *
            </Label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="+243 123 456 789"
            />
          </div>

          {/* Point de départ */}
          <div>
            <Label htmlFor="departure" className="text-black font-medium">
              Point de départ *
            </Label>
            <input
              id="departure"
              type="text"
              required
              value={formData.departure}
              onChange={(e) => handleChange("departure", e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Adresse de départ"
            />
          </div>

          {/* Destination */}
          <div>
            <Label htmlFor="destination" className="text-black font-medium">
              Destination *
            </Label>
            <input
              id="destination"
              type="text"
              required
              value={formData.destination}
              onChange={(e) => handleChange("destination", e.target.value)}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Adresse de destination"
            />
          </div>

          {/* Type de transport */}
          <div>
            <Label className="text-black font-medium mb-4 block">Type de transport *</Label>
            <RadioGroup
              value={formData.transportType}
              onValueChange={(value) => handleChange("transportType", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-4 hover:bg-gray-50">
                <RadioGroupItem value="voiture" id="voiture" />
                <Label htmlFor="voiture" className="flex items-center space-x-2 cursor-pointer">
                  <Car className="w-5 h-5 text-black" />
                  <span className="text-black">Voiture</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-4 hover:bg-gray-50">
                <RadioGroupItem value="moto" id="moto" />
                <Label htmlFor="moto" className="flex items-center space-x-2 cursor-pointer">
                  <Bike className="w-5 h-5 text-black" />
                  <span className="text-black">Moto</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Bouton d'envoi */}
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 py-3 text-lg font-medium">
            Envoyer la réservation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
