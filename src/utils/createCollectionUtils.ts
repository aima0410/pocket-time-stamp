// ---- Types ----
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';
import { getRandomInt } from '@utils/calculate';
import { getRandomLevel, getRandomXP } from '@utils/getLevelInfo';

// -------- コレクションの初期データ --------
export function createDefaultCollection(defaultPokemon: Array<Pokemon>): Array<CollectionData> {
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

// -------- コレクションのデモデータ --------
export function createDemoCollection(collectionData: Array<CollectionData>): Array<CollectionData> {
  const maxIndex = collectionData.length - 1;
  const selectedIndex = getRandomInt(0, maxIndex);
  return collectionData.map((data, i) => {
    const level = getRandomLevel();
    const XP = getRandomXP(level);
    const collectionData: CollectionData = {
      selected: i === selectedIndex,
      id: data.evolutionChain[0],
      name: data.name,
      japaneseName: data.japaneseName,
      imageUrl: data.imageUrl,
      level: level,
      XP: XP,
      evolutionChain: data.evolutionChain,
    };
    return collectionData;
  });
}
