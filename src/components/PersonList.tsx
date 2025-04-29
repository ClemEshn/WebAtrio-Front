import { useEffect, useState } from 'react';
import axios from 'axios';
import { Personne } from '../types/Personne';

const PersonList = () => {
  const [personnes, setPersonnes] = useState<Personne[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Personne[]>('http://localhost:8080/personnes')
      .then(response => {
        setPersonnes(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container">
    <h1>Liste des personnes</h1>
    {personnes.map((p) => (
      <div key={p.id} className="person-card">
        <h2>{p.prenom} {p.nom} ({p.age} ans)</h2>
        <div className="emplois">
          {p.emplois.length === 0 ? (
            <em>Pas d'emploi actuel</em>
          ) : (
            <ul>
              {p.emplois.map((e, i) => (
                <li key={i}>
                  <strong>{e.entreprise}</strong> - {e.poste} ({e.dateDebut} → {e.dateFin ?? "en cours"})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ))}
  </div>
  );
};

export default PersonList;
