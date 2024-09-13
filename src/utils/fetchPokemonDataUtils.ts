// ---- Types ----
import PokemonName from "src/types/PokemonName";

export const fetchPokemonData = async (name: PokemonName) => {
  try {
    // ポケモンの種別情報を取得
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
    const data = await response.json();

    // 日本語の名前を取得
    const japaneseName =
      data.names.find(
        (name: { language: { name: string }; name: string }) => name.language.name === 'ja-Hrkt',
      )?.name || data.name;

    // 進化チェーン情報を取得
    const evolutionChainResponse = await fetch(data.evolution_chain.url);
    const evolutionChainData = await evolutionChainResponse.json();

    // 進化チェーンのすべての段階をリストとして取得
    const chainNames: Array<string | null> = [];
    let currentChain = evolutionChainData.chain;
    while (currentChain) {
      chainNames.push(currentChain.species.name);
      currentChain = currentChain.evolves_to[0];
    }

    // ポケモンの画像を取得
    const pokemonDataResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const pokemonData = await pokemonDataResponse.json();
    const imageUrl = pokemonData.sprites.front_default;

    return { name: data.name, japaneseName, url: data.url, imageUrl, evolutionChain: chainNames };
  } catch (error) {
    console.error('Failed to fetch Pokemon:', error);
    return null;
  }
};
