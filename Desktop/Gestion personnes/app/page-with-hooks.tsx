"use client";

import {
  Footer,
  ImportExportButtons,
  ImportModal,
  PersonForm,
  PersonTable,
  SearchFilters,
  StatisticsCards,
} from "@/components";
import { useFilters, useImportExport, usePersons } from "@/hooks";
import { PersonFormData } from "@/types/person";
import { useState } from "react";

/**
 * Version ultra-modulaire avec hooks personnalisés
 * Cette version démontre la séparation complète des responsabilités :
 * - Logique métier dans les hooks
 * - Présentation dans les composants
 * - Page comme simple orchestrateur
 */
export default function HomeWithHooks() {
  // État du formulaire
  const [formData, setFormData] = useState<PersonFormData>({
    nom: "",
    postnom: "",
    prenom: "",
    sexe: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Hook pour la gestion des personnes
  const {
    persons,
    loading,
    error: personError,
    setError: setPersonError,
    stats,
    createPerson,
    updatePerson,
    deletePerson,
    refreshPersons,
  } = usePersons();

  // Hook pour les filtres et recherche
  const {
    searchTerm,
    setSearchTerm,
    sexFilter,
    setSexFilter,
    filteredPersons,
  } = useFilters(persons);

  // Hook pour import/export
  const {
    showImportModal,
    importValidation,
    importLoading,
    error: importError,
    handleExport,
    handleFileSelect,
    handleConfirmImport,
    handleCancelImport,
  } = useImportExport(refreshPersons);

  // Combiner les erreurs
  const error = personError || importError;

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPersonError("");

    // Validation
    if (
      !formData.nom ||
      !formData.postnom ||
      !formData.prenom ||
      !formData.sexe
    ) {
      setPersonError("Tous les champs sont obligatoires");
      return;
    }

    let success = false;
    if (editingId) {
      success = await updatePerson(editingId, formData);
    } else {
      success = await createPerson(formData);
    }

    if (success) {
      // Réinitialiser le formulaire
      setFormData({ nom: "", postnom: "", prenom: "", sexe: "" });
      setEditingId(null);
    }
  };

  // Gérer le changement des champs
  const handleFormChange = (field: keyof PersonFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Gérer l'édition
  const handleEdit = (person: any) => {
    setFormData({
      nom: person.nom,
      postnom: person.postnom,
      prenom: person.prenom,
      sexe: person.sexe,
    });
    setEditingId(person.id);
    setPersonError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Gérer la suppression
  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette personne ?")) {
      return;
    }
    await deletePerson(id);
  };

  // Annuler l'édition
  const handleCancel = () => {
    setFormData({ nom: "", postnom: "", prenom: "", sexe: "" });
    setEditingId(null);
    setPersonError("");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Statistiques */}
        <StatisticsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
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

          {/* Liste */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <SearchFilters
                searchTerm={searchTerm}
                sexFilter={sexFilter}
                onSearchChange={setSearchTerm}
                onFilterChange={setSexFilter}
                resultCount={filteredPersons.length}
              />
              <PersonTable
                persons={filteredPersons}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modale Import */}
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

