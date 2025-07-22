"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Car } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-black" />
            <span className="text-2xl font-bold text-black">Mwinda</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-black hover:text-gray-600 font-medium">
              Accueil
            </Link>
            <Link href="/reserver" className="text-black hover:text-gray-600 font-medium">
              Réserver
            </Link>
            <Link href="/a-propos" className="text-black hover:text-gray-600 font-medium">
              À propos
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-600 font-medium">
              Contact
            </Link>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/reserver">Réserver un taxi</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-black hover:text-gray-600 font-medium" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
              <Link
                href="/reserver"
                className="text-black hover:text-gray-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Réserver
              </Link>
              <Link
                href="/a-propos"
                className="text-black hover:text-gray-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-gray-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="bg-black text-white hover:bg-gray-800 w-full">
                <Link href="/reserver" onClick={() => setIsOpen(false)}>
                  Réserver un taxi
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
