import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [list, setList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const fetchPokemon = (
      next = "https://pokeapi.co/api/v2/pokemon/",
      pokemonArr = []
    ) => {
      if (!next) {
        console.log(pokemonArr);
        setList([...list, ...pokemonArr]);
        return;
      }
      axios
        .get(next)
        .then((response) => [
          [...pokemonArr, ...response.data.results],
          response.data.next,
        ])
        .then(([newList, next]) => fetchPokemon(next, newList))
        .catch((err) => console.log(err));
    };
    fetchPokemon();
  }, []);

  return (
    <>
      <button onClick={() => setIsVisible(true)}>Fetch Pokemon</button>
      {isVisible && (
        <ul>
          {list.map((pokemon, idx) => {
            return <li key={idx}>{pokemon.name}</li>;
          })}
        </ul>
      )}
    </>
  );
};

export default App;
