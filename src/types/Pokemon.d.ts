import PokemonName from 'src/types/PokemonName';

interface Pokemon {
  name: PokemonName;
  japaneseName: string;
  url: string;
  imageUrl: string;
  evolutionChain: Array<string>;
}

export default Pokemon;