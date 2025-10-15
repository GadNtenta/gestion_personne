"use client";

import Footer from "@/components/Footer";
import ImportExportButtons from "@/components/ImportExportButtons";
import ImportModal from "@/components/ImportModal";
import PersonForm from "@/components/PersonForm";
import PersonTable from "@/components/PersonTable";
import SearchFilters from "@/components/SearchFilters";
import StatisticsCards from "@/components/StatisticsCards";
import { ImportValidation, Person, PersonFormData } from "@/types/person";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [formData, setFormData] = useState<PersonFormData>({
    nom: "",
    postnom: "",
    prenom: "",
    sexe: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sexFilter, setSexFilter] = useState<string>("tous");
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState<any>(null);
  const [importValidation, setImportValidation] =
    useState<ImportValidation | null>(null);
  const [importLoading, setImportLoading] = useState(false);

  // Charger les personnes au démarrage
  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const response = await fetch("/api/persons");
      const data = await response.json();
      setPersons(data);
    } catch (err) {
      setError("Erreur lors du chargement des données");
    }
  };

  // Filtrage et recherche
  const filteredPersons = useMemo(() => {
    let filtered = persons;

    // Filtre par sexe
    if (sexFilter !== "tous") {
      filtered = filtered.filter((person) => person.sexe === sexFilter);
    }

    // Recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.postnom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.prenom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [persons, searchTerm, sexFilter]);

  // Statistiques
  const stats = useMemo(() => {
    const total = persons.length;
    const masculin = persons.filter((p) => p.sexe === "Masculin").length;
    const feminin = persons.filter((p) => p.sexe === "Féminin").length;
    return { total, masculin, feminin };
  }, [persons]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.nom ||
      !formData.postnom ||
      !formData.prenom ||
      !formData.sexe
    ) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    setLoading(true);

    try {
      if (editingId) {
        // Mise à jour
        await fetch(`/api/persons/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Création
        await fetch("/api/persons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      // Réinitialiser le formulaire
      setFormData({ nom: "", postnom: "", prenom: "", sexe: "" });
      setEditingId(null);

      // Recharger la liste
      await fetchPersons();
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof PersonFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEdit = (person: Person) => {
    setFormData({
      nom: person.nom,
      postnom: person.postnom,
      prenom: person.prenom,
      sexe: person.sexe,
    });
    setEditingId(person.id);
    setError("");
    // Scroll vers le formulaire
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette personne ?")) {
      return;
    }

    try {
      await fetch(`/api/persons/${id}`, {
        method: "DELETE",
      });
      await fetchPersons();
    } catch (err) {
      setError("Erreur lors de la suppression");
    }
  };

  const handleCancel = () => {
    setFormData({ nom: "", postnom: "", prenom: "", sexe: "" });
    setEditingId(null);
    setError("");
  };

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
        await fetchPersons();
        // Pas d'erreur, juste fermer
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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec statistiques */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Gestion des Personnes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gérez facilement votre base de données de personnes avec recherche,
            filtres et statistiques en temps réel
          </p>
        </div>

        {/* Boutons Import/Export */}
        <ImportExportButtons
          onFileSelect={handleFileSelect}
          onExport={handleExport}
        />

        {/* Statistiques Cards */}
        <StatisticsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire - 1 colonne */}
          <div className="lg:col-span-1">
            <PersonForm
              formData={formData}
              editingId={editingId}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onChange={handleFormChange}
              onCancel={handleCancel}
            />
          </div>

          {/* Liste des personnes - 2 colonnes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* En-tête avec recherche et filtres */}
              <SearchFilters
                searchTerm={searchTerm}
                sexFilter={sexFilter}
                onSearchChange={setSearchTerm}
                onFilterChange={setSexFilter}
                resultCount={filteredPersons.length}
              />

              {/* Tableau */}
              <PersonTable
                persons={filteredPersons}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modale d'importation */}
      {showImportModal && (
        <ImportModal
          validation={importValidation}
          loading={importLoading}
          onConfirm={handleConfirmImport}
          onCancel={handleCancelImport}
        />
      )}

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
