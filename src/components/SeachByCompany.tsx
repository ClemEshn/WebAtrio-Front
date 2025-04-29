import { useState } from 'react';
import axios from 'axios';
import { Personne } from '../types/Personne';

export default function SearchByCompany() {
  const [company, setCompany] = useState('');
  const [results, setResults] = useState<Personne[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get<Personne[]>(
        `http://localhost:8080/personnes/entreprise?nom=${encodeURIComponent(company)}`
      );
      setResults(response.data);
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "2rem auto", maxWidth: "600px" }}>
      <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
        <h2>Rechercher par entreprise</h2>
        <input
          type="text"
          placeholder="Nom de l'entreprise"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ padding: "0.5rem", width: "70%", marginRight: "1rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Rechercher</button>
      </form>

      {loading && <p>Recherche en cours...</p>}

      {results !== null && (
        <div>
          <h3>Résultats :</h3>
          {results.length === 0 ? (
            <p>Aucune personne trouvée pour "{company}".</p>
          ) : (
            results.map((p) => (
              <div key={p.id} className="person-card" style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem"
              }}>
                <h4>{p.prenom} {p.nom} ({p.age} ans)</h4>
                <ul>
                  {p.emplois.map((e, i) => (
                    <li key={i}>
                      <strong>{e.nomEntreprise}</strong> - {e.poste} ({e.dateDebut} → {e.dateFin ?? "en cours"})
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
