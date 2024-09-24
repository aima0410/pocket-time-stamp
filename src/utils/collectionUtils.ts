// ---- Types ----
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';
import { getRandomInt } from '@utils/calculate';
import {
  getRandomLevel,
  getRandomDemoXP,
  getRandomXP,
  getRemainingReqExpForNext,
} from '@utils/getLevelInfo';
import levelTable from '@assets/LevelTable';

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
    const XP = getRandomDemoXP(level);
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

// ------------- 経験値獲得＆レベルアップ -------------
export function grownCollection(collectionData: Array<CollectionData>) {
  const grownCollection: Array<CollectionData> = JSON.parse(JSON.stringify(collectionData));

  const selectedPokemonIndex = collectionData.findIndex((data) => data.selected === true);

  if (selectedPokemonIndex !== -1) {
    const i = selectedPokemonIndex;

    const currentLevel = grownCollection[i].level;

    const nextTotalXP = levelTable[currentLevel].totalExp;

    const additionalXP = getRandomXP(currentLevel);
    const currentXP = grownCollection[i].XP;
    const grownXP = currentXP + additionalXP;

    if (nextTotalXP < grownXP) {
      // レベルアップ！
      grownCollection[i].level = currentLevel + 1;
    }
    grownCollection[i].XP = grownXP;
    return grownCollection;
  } else {
    return collectionData;
  }
}
