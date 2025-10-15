import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Récupérer toutes les personnes
export async function GET() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(persons);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des personnes" },
      { status: 500 }
    );
  }
}

// POST - Créer une nouvelle personne
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, postnom, prenom, sexe } = body;

    // Validation
    if (!nom || !postnom || !prenom || !sexe) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    const person = await prisma.person.create({
      data: {
        nom,
        postnom,
        prenom,
        sexe,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de la personne" },
      { status: 500 }
    );
  }
}
