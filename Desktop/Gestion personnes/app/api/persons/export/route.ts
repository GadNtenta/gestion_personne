import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - Exporter toutes les personnes en JSON
export async function GET() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Créer un objet avec métadonnées
    const exportData = {
      exportDate: new Date().toISOString(),
      version: "1.0",
      totalRecords: persons.length,
      data: persons,
    };

    return NextResponse.json(exportData, {
      headers: {
        "Content-Disposition": `attachment; filename="gestion-personnes-${Date.now()}.json"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'exportation des données" },
      { status: 500 }
    );
  }
}

