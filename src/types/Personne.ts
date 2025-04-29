import { Emploi } from "./Emploi";
  export interface Personne {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: string;
    age: number;
    emplois: Emploi[];
  }
  