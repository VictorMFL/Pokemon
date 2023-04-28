import React from "react";
import axios from "axios";
import Login from "./Carregamento/Login";
import styles from "./DadosPokemon.module.css";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const DadosPokemon = () => {
  const [pokemon, setPokemon] = React.useState(null);

  const get = async () => {
    let ValorLocal = localStorage.getItem("Dados");
    try {
      const response = await axios.get(ValorLocal);
      const data = response.data;
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  const timer = () => {
    setTimeout(() => {
      get();
    }, 500);
    setTimeout(() => {
      window.localStorage.clear();
    }, 1000);
  };

  React.useEffect(() => {
    timer();
    clearTimeout();
  }, []);

  if (pokemon === null) return <Login />;
  return (
    <main className={styles.main}>
      <section className={styles.pokemon}>
        <Link to="/">
          <MdKeyboardBackspace size={38} />
        </Link>
        <div className={styles.imgPokemon}>
          <img src={pokemon.sprites.back_default} alt={pokemon.species.name} />
          <img src={pokemon.sprites.front_default} alt={pokemon.species.name} />
        </div>
        <p className={styles.name}>{pokemon.name}</p>
      </section>

      <section className={styles.dadosPokemon}>
        <h1>Nome: {pokemon.name}</h1>
        <h3>Pontos de Experiência: {pokemon.base_experience}</h3>

        <div className={styles.habilidades}>
          <h1>Habilidades:</h1>
          {pokemon.abilities.map((item, index) => (
            <p key={index}>{item.ability.name}</p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DadosPokemon;
