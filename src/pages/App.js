import { useState } from "react";
import gitLogo from "../assets/logo.png";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import { api } from "../services/api";

import { Container } from "./styles";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const alreadyExist = repos.find((repo) => repo.id === data.id);

      if (!alreadyExist) {
        setRepos((prev) => [...prev, data]);
        setCurrentRepo("");
        return;
      } else {
        alert("Repositório já existe");
      }
    }
  };

  const handleRemoveRepo = (id) => {
    const itemRemoved = repos.filter((repo) => repo.id !== id);
    setRepos((prev) => [...itemRemoved]);
    return;
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <h1>Github Wiki</h1>
      <p>Search for your favorite repositories. E.g.: pedromartinsdev/portfolio</p>
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />

      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
