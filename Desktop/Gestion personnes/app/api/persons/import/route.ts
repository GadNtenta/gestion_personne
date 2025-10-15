import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST - Valider les données importées
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, validate } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        {
          error: "Format invalide",
          message: "Le fichier doit contenir un tableau de données",
          isValid: false,
        },
        { status: 400 }
      );
    }

    // Validation du schéma
    const requiredFields = ["nom", "postnom", "prenom", "sexe"];
    const validSexes = ["Masculin", "Féminin"];

    const errors: string[] = [];
    const validRecords: any[] = [];

    data.forEach((record, index) => {
      const recordErrors: string[] = [];

      // Vérifier les champs requis
      requiredFields.forEach((field) => {
        if (
          !record[field] ||
          typeof record[field] !== "string" ||
          record[field].trim() === ""
        ) {
          recordErrors.push(`Champ "${field}" manquant ou invalide`);
        }
      });

      // Vérifier le sexe
      if (record.sexe && !validSexes.includes(record.sexe)) {
        recordErrors.push(
          `Le sexe doit être "Masculin" ou "Féminin" (reçu: "${record.sexe}")`
        );
      }

      if (recordErrors.length > 0) {
        errors.push(`Ligne ${index + 1}: ${recordErrors.join(", ")}`);
      } else {
        validRecords.push({
          nom: record.nom.trim(),
          postnom: record.postnom.trim(),
          prenom: record.prenom.trim(),
          sexe: record.sexe,
        });
      }
    });

    // Si c'est juste une validation
    if (validate) {
      return NextResponse.json({
        isValid: errors.length === 0,
        totalRecords: data.length,
        validRecords: validRecords.length,
        invalidRecords: errors.length,
        errors: errors.slice(0, 10), // Limiter à 10 erreurs pour l'affichage
        hasMoreErrors: errors.length > 10,
        preview: validRecords.slice(0, 5), // Aperçu des 5 premiers
      });
    }

    // Si des erreurs, ne pas importer
    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: "Données invalides",
          message: `${errors.length} enregistrement(s) invalide(s) trouvé(s)`,
          isValid: false,
          errors: errors.slice(0, 10),
          hasMoreErrors: errors.length > 10,
        },
        { status: 400 }
      );
    }

    // Importer les données valides
    const result = await prisma.person.createMany({
      data: validRecords,
      skipDuplicates: false,
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} personne(s) importée(s) avec succès`,
      imported: result.count,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'importation",
        message: "Une erreur est survenue lors du traitement du fichier",
        isValid: false,
      },
      { status: 500 }
    );
  }
}

