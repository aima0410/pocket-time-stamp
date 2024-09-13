// ---- Types ----
import DefaultPokemonName from './PokemonName';

interface CollectionData {
  selected: boolean;
  id: DefaultPokemonName | string;
  name: DefaultPokemonName | string;
  japaneseName: string;
  imageUrl: string;
  level: number;
  XP: number;
  evolutionChain: Array<DefaultPokemonName | string >;
}

export default CollectionData;
