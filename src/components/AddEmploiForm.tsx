import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type Props = {
  personneId: number;
  onSuccess: () => void;
};

const AddEmploiForm = ({ personneId, onSuccess }: Props) => {
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [poste, setPoste] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/personnes/${personneId}/emplois`, {
        nomEntreprise,
      poste,
      dateDebut,
      dateFin: dateFin || null,
    }).then(() => {
      toast.success("Emploi ajouté !");
      onSuccess();
    }).catch(() => {
      toast.error("Erreur lors de l'ajout.");
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h4>Ajouter un emploi</h4>
      <input value={nomEntreprise} onChange={e => setNomEntreprise(e.target.value)} placeholder="Entreprise" required />
      <input value={poste} onChange={e => setPoste(e.target.value)} placeholder="Poste" required />
      <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} required />
      <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddEmploiForm;
