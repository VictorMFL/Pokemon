import React from "react";
import axios from "axios";
import Login from "../Components/Carregamento/Login";
import { Link } from "react-router-dom";

const Pokemons = ({ data }) => {
  const [detalhes, setDetalhes] = React.useState(null);
  const [cada, setCada] = React.useState(null);
  
  React.useEffect(() => {
    axios.get(data.url).then((response) => setDetalhes(response.data));
  }, [data]);
  console.log(detalhes);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${detalhes.species.name}`
      );
      const data = response.data;
      console.log(data);
      setCada(data);
    } catch (error) {
      console.log(error);
    } finally {
      let pokemon = `https://pokeapi.co/api/v2/pokemon/${detalhes.species.name}`;
      window.localStorage.setItem("Dados", pokemon);
    }
  };

  if (detalhes === null) return <Login />;
  return (
    <div className="pokemons">
      <Link to={`/dados/${detalhes.species.name}`} onClick={handleClick}>
        <img
          src={detalhes.sprites.front_default}
          alt={detalhes.species.name}
          className="img-pokemon"
        />
      </Link>
      <h2 className="nome-pokemon">{data.name}</h2>
      <p className="experiencia-pokemon">
        Pontos de Experiência: {detalhes.base_experience}
      </p>
    </div>
  );
};

export default Pokemons;
