const PokemonDetail = ({ pokemon }) => {
  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      
      {/* Imagen */}
      <img
        src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
        alt={pokemon.name}
        style={{ width: "250px", height: "250px" }}
      />

      {/* Info */}
      <div>
        <h2>#{pokemon.id} {pokemon.name?.toUpperCase()}</h2>

        {/* Tipos */}
        <div>
          {pokemon.types?.map((t) => (
            <span key={t.slot} style={{
              background: "#e74c3c", color: "white",
              padding: "4px 12px", borderRadius: "12px", marginRight: "8px"
            }}>
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Medidas */}
        <p>Altura: {pokemon.height / 10} m</p>
        <p>Peso: {pokemon.weight / 10} kg</p>

        {/* Habilidades */}
        <h3>Habilidades</h3>
        <ul>
          {pokemon.abilities?.map((a) => (
            <li key={a.slot}>
              {a.ability.name} {a.is_hidden && <em>(oculta)</em>}
            </li>
          ))}
        </ul>

        {/* Stats */}
        <h3>Stats</h3>
        {pokemon.stats?.map((s) => (
          <div key={s.stat.name} style={{ marginBottom: "6px" }}>
            <span style={{ display: "inline-block", width: "140px" }}>
              {s.stat.name}
            </span>
            <progress value={s.base_stat} max={255} />
            <span> {s.base_stat}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PokemonDetail;