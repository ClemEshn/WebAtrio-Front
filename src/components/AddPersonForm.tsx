import { useState } from "react";
import { toast } from "react-toastify";

type PersonForm = {
  nom: string;
  prenom: string;
  dateNaissance: string;
};

export default function AddPersonForm({ reload }: { reload: () => void }) {
  const [formData, setFormData] = useState<PersonForm>({
    nom: "",
    prenom: "",
    dateNaissance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/personnes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l'ajout");
      }

      toast.success("✅ Personne ajoutée !");
      setFormData({ nom: "", prenom: "", dateNaissance: "" });
      reload();
    } catch (err: any) {
      toast.error("❌ " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Ajouter une personne</h2>
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={formData.prenom}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={formData.nom}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="date"
        name="dateNaissance"
        value={formData.dateNaissance}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit" style={{ marginTop: "1rem" }}>Ajouter</button>
    </form>
  );
}
