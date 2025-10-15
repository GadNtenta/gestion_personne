import { Person } from "@/types/person";
import { useMemo, useState } from "react";

export function useFilters(persons: Person[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sexFilter, setSexFilter] = useState<string>("tous");

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

  return {
    searchTerm,
    setSearchTerm,
    sexFilter,
    setSexFilter,
    filteredPersons,
  };
}

