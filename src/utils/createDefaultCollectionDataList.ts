// ---- Types ----
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';

export default function createDefaultCollectionDataList(
  defaultPokemon: Array<Pokemon>,
): Array<CollectionData> {
  return defaultPokemon.map((data, i) => {
    const collectionData: CollectionData = {
      selected: i === 0,
      id: data.evolutionChain[0],
      name: data.name,
      japaneseName: data.japaneseName,
      imageUrl: data.imageUrl,
      level: 1,
      XP: 0,
      evolutionChain: data.evolutionChain,
    };
    return collectionData;
  });
}
