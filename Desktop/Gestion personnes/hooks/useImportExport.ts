import { ImportValidation } from "@/types/person";
import { useState } from "react";

export function useImportExport(onImportSuccess: () => void) {
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState<any>(null);
  const [importValidation, setImportValidation] =
    useState<ImportValidation | null>(null);
  const [importLoading, setImportLoading] = useState(false);
  const [error, setError] = useState("");

  // Export des données
  const handleExport = async () => {
    try {
      const response = await fetch("/api/persons/export");
      const data = await response.json();

      // Créer un blob et télécharger le fichier
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gestion-personnes-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Erreur lors de l'exportation");
    }
  };

  // Import - Lecture du fichier
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      // Extraire les données (gérer différents formats)
      let dataToImport = json;
      if (json.data && Array.isArray(json.data)) {
        dataToImport = json.data;
      } else if (!Array.isArray(json)) {
        throw new Error("Format invalide");
      }

      setImportData(dataToImport);

      // Valider les données
      setImportLoading(true);
      const response = await fetch("/api/persons/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataToImport, validate: true }),
      });

      const validation = await response.json();
      setImportValidation(validation);
      setShowImportModal(true);
    } catch (err) {
      setError(
        "Erreur lors de la lecture du fichier. Assurez-vous que c'est un fichier JSON valide."
      );
    } finally {
      setImportLoading(false);
      // Reset input
      e.target.value = "";
    }
  };

  // Confirmer l'import
  const handleConfirmImport = async () => {
    if (!importData) return;

    setImportLoading(true);
    try {
      const response = await fetch("/api/persons/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: importData, validate: false }),
      });

      const result = await response.json();

      if (result.success) {
        setShowImportModal(false);
        setImportData(null);
        setImportValidation(null);
        onImportSuccess();
      } else {
        setError(result.message || "Erreur lors de l'importation");
      }
    } catch (err) {
      setError("Erreur lors de l'importation");
    } finally {
      setImportLoading(false);
    }
  };

  // Annuler l'import
  const handleCancelImport = () => {
    setShowImportModal(false);
    setImportData(null);
    setImportValidation(null);
  };

  return {
    showImportModal,
    importValidation,
    importLoading,
    error,
    handleExport,
    handleFileSelect,
    handleConfirmImport,
    handleCancelImport,
  };
}

