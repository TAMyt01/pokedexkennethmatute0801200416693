import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PokemonDetail from "../components/Pokemon/PokemonDetail";
import "./Detailcss.css";

export const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("linear-gradient(135deg, #667eea 0%, #764ba2 100%)");

  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon no encontrado");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setError(null);
        
        const mainType = data.types[0]?.type?.name;
        if (mainType && typeColors[mainType]) {
          const color = typeColors[mainType];
          setBgColor(`linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page" style={{ background: bgColor }}>
        <div className="detail-container">
          <div className="loader">
            <div className="pokeball-loader"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-page" style={{ background: bgColor }}>
        <div className="detail-container">
          <div className="error-message">
            ❌ {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page" style={{ background: bgColor }}>
      <div className="detail-container">
        <h1 className="detail-title">Pokémon Details</h1>
        <div className="pokemon-card-wrapper">
          <PokemonDetail pokemon={pokemon} typeColors={typeColors} />
        </div>
      </div>
    </div>
  );
};

export default Detail;