import { useState } from 'react';
import axios from 'axios';

const SearchEmplois = () => {
  const [personId, setPersonId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [result, setResult] = useState<string>('');

  const handleSearch = async () => {
    if (!personId || !fromDate || !toDate) {
      alert("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/personnes/${personId}/emplois`, {
        params: {
          from: fromDate,
          to: toDate,
        },
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
      setResult("Erreur lors de la récupération des données.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Rechercher les emplois d'une personne</h2>
      <input
        type="number"
        placeholder="ID de la personne"
        value={personId}
        onChange={(e) => setPersonId(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <button onClick={handleSearch} style={{ width: "100%", padding: "0.7rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
        Rechercher
      </button>
      {result && (
        <pre style={{ marginTop: "1.5rem", background: "#f8f8f8", padding: "1rem", borderRadius: "4px" }}>
          {result}
        </pre>
      )}
    </div>
  );
};

export default SearchEmplois;
