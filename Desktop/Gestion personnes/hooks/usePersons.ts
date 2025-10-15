import { Person, PersonFormData } from "@/types/person";
import { useEffect, useMemo, useState } from "react";

export function usePersons() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const createPerson = async (formData: PersonFormData) => {
    setLoading(true);
    setError("");
    try {
      await fetch("/api/persons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await fetchPersons();
      return true;
    } catch (err) {
      setError("Erreur lors de la création");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePerson = async (id: number, formData: PersonFormData) => {
    setLoading(true);
    setError("");
    try {
      await fetch(`/api/persons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await fetchPersons();
      return true;
    } catch (err) {
      setError("Erreur lors de la mise à jour");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePerson = async (id: number) => {
    try {
      await fetch(`/api/persons/${id}`, {
        method: "DELETE",
      });
      await fetchPersons();
      return true;
    } catch (err) {
      setError("Erreur lors de la suppression");
      return false;
    }
  };

  // Statistiques calculées
  const stats = useMemo(() => {
    const total = persons.length;
    const masculin = persons.filter((p) => p.sexe === "Masculin").length;
    const feminin = persons.filter((p) => p.sexe === "Féminin").length;
    return { total, masculin, feminin };
  }, [persons]);

  return {
    persons,
    loading,
    error,
    setError,
    stats,
    createPerson,
    updatePerson,
    deletePerson,
    refreshPersons: fetchPersons,
  };
}

