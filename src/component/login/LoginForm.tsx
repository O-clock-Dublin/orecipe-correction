import { useState } from "react";

function LoginForm() {
  const [token, setToken] = useState<string | null>(null);
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo }),
    });

    if (response.status === 200) {
      const data = await response.json();
      setToken(data.token);
      setPseudo(data.pseudo);
    }

    if (response.status === 401) {
      setError("Identifiants incorrects");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setPseudo("");
  };

  if (token) {
    return (
      <div>
        <p>Connecté en tant que <strong>{pseudo}</strong></p>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Connexion</button>
    </form>
  );
}

export default LoginForm;
