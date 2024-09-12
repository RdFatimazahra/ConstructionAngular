import { Ressource } from "./ressource.model";

export interface Tache {

    idTache: number;
    idProjet?: number;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    statut: string;
    ressources: Ressource[];
}
