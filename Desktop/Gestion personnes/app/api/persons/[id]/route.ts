import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT - Mettre à jour une personne
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const person = await prisma.person.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        nom,
        postnom,
        prenom,
        sexe,
      },
    });

    return NextResponse.json(person);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la personne" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer une personne
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.person.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: "Personne supprimée avec succès" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la personne" },
      { status: 500 }
    );
  }
}
