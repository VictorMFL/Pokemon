import React from "react";
import axios from "axios";
import Header from "./Components/Header";
import Pokemons from "./Components/Pokemons";
import Login from "./Components/Carregamento/Login";

let apiUrl = "https://pokeapi.co/api/v2/pokemon";

const App = () => {
  const [dados, setDados] = React.useState([]);
  const [next, setNext] = React.useState(null);
  const [previous, setPrevious] = React.useState(null);
  const [login, setLogin]  = React.useState(false)

  const get = async () => {
    try {
      setLogin(true)
      const response = await axios.get(apiUrl);
      const data = response.data.results;
      console.log(data);
      setDados(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(false)
    }
  };

  const proximaPagina = async () => {
    try {
      setLogin(true)
      const response = await axios.get(apiUrl);
      const data = response.data.next;
      const dado = response.data;
      console.log(data);
      console.log(dado);
      setNext(data);
      apiUrl = data;
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(false)
      setPrevious(true)
    }
  };

  const voltarPagina = async () => {
    try {
      setLogin(true)
      const response = await axios.get(apiUrl);
      const data = response.data.previous;
      if(response.data.previous !== null) {
        console.log(data);
        setPrevious(data);
        apiUrl = data;
      } else {
        window.alert('esta é a primeira página.')
        setPrevious(false)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(false)
    }
  };

  React.useEffect(() => {
    get();
  }, [apiUrl]);

  if(login) return <Login />;
  return (
    <>
      <Header />
      <main>
        {dados.map((item) => (
          <Pokemons data={item} key={item.name} />
        ))}
      </main>
      <footer className="footer">

        {previous ? <button onClick={voltarPagina}>Voltar</button> : <div></div>}
        <button onClick={proximaPagina}>Próximo</button>
      </footer>
    </>
  );
};

export default App;
