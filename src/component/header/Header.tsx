import { useContext, useState } from "react";
import { NavLink } from "react-router";
import UserContext from "../../context/userContext";

export default function Header() {
  // Define initial value et setter using useState
  const [token, setLocalToken] = useState<string | null>(null);
  const [username, setLocalUsername] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Use User Context
  const { setToken, setUsername } = useContext(UserContext);

  // Create function to handle on submit
  const handleAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrorMessage("");

    try {
      // Send post request to login URL with data
      const response = await fetch(
        "https://orecipes-api-msfv.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setLocalToken(data.token);
        setLocalUsername(data.username);
        setToken(data.token);
        setUsername(data.pseudo);
      } else {
        setErrorMessage("Erreur de connexion");
      }
    } catch {
      setErrorMessage("Erreur de connexion");
    }
  };

  // Create function to handle logout
  function handleLogout() {
    setLocalToken(null);
    setLocalUsername(null);
    setToken(null);
    setUsername(null);
  }

  return (
    <header>
      <NavLink to={"/"}>
        <img src="/vite.svg" alt="o'clock recipes" />
      </NavLink>

      {username ? (
        <>
          <p>Bienvenue {username}</p>
          <button onClick={handleLogout} type="button">
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <form action={handleAction}>
            <input type="email" placeholder="Adresse email" name="email" />
            <input type="password" placeholder="Mot de passe" name="password" />
            <button type="submit">Connexion</button>
          </form>

          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
    </header>
  );
}
