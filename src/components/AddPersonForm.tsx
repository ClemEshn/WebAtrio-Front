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
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
      marginBottom: "2rem"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Ajouter une personne</h2>

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="date"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
