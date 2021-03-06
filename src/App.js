import React, { useState } from "react";

const App = () => {
  const [list, setList] = useState([]);
  const fetchPokemon = (
    next = "https://pokeapi.co/api/v2/pokemon/",
    pokemonArr = []
  ) => {
    if (!next) {
      console.log(pokemonArr);
      setList([...list, ...pokemonArr]);
      return;
    }
    fetch(next)
      .then((response) => response.json())
      .then((responseJSON) => {
        const listArr = [...pokemonArr, ...responseJSON.results];
        return [listArr, responseJSON.next];
      })
      .then(([newList, next]) => fetchPokemon(next, newList))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button onClick={() => fetchPokemon()}>Fetch Pokemon</button>
      <ul>
        {list.map((pokemon, idx) => {
          return <li key={idx}>{pokemon.name}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
