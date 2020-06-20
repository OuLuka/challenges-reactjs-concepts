import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Omnistack ${Date.now()}`,
      url: "gostack.com",
      techs: ["React"],
    });

    const repo = response.data;
    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((response) => {
      const repoIndex = repos.findIndex((repo) => repo.id === id);
      if (repoIndex < 0) {
        console.log("Repo not found.");
      }
      repos.splice(repoIndex, 1);
      setRepos([...repos]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
