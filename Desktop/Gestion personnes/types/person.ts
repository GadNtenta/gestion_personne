export interface Person {
  id: number;
  nom: string;
  postnom: string;
  prenom: string;
  sexe: string;
}

export interface PersonFormData {
  nom: string;
  postnom: string;
  prenom: string;
  sexe: string;
}

export interface Statistics {
  total: number;
  masculin: number;
  feminin: number;
}

export interface ImportValidation {
  isValid: boolean;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  errors?: string[];
  hasMoreErrors?: boolean;
  preview?: Person[];
}

