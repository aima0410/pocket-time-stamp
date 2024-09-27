// ---- Types ----
import Pokemon from 'src/types/Pokemon';
import CollectionData from 'src/types/CollectionData';
import { getRandomInt } from '@utils/calculate';
import { getRandomLevel, getRandomDemoXP, getRandomXP } from '@utils/getLevelInfo';
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
export function createDemoCollection(
  collectionData: Array<CollectionData>,
  pokemonList: Array<Pokemon>,
): Array<CollectionData> {
  const maxIndex = collectionData.length - 1;
  const selectedIndex = getRandomInt(0, maxIndex);
  return collectionData.map((data, i) => {
    const level = getRandomLevel();
    const XP = getRandomDemoXP(level) + levelTable[level - 1].totalExp;

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

    if (66 <= level) {
      const thirdPokemonIndex = pokemonList.findIndex(
        (pokemon) => data.evolutionChain[2] === pokemon.name,
      );

      collectionData.name = pokemonList[thirdPokemonIndex].name;
      collectionData.japaneseName = pokemonList[thirdPokemonIndex].japaneseName;
      collectionData.imageUrl = pokemonList[thirdPokemonIndex].imageUrl;
    } else if (33 <= level) {
      const secondPokemonIndex = pokemonList.findIndex(
        (pokemon) => data.evolutionChain[1] === pokemon.name,
      );

      collectionData.name = pokemonList[secondPokemonIndex].name;
      collectionData.japaneseName = pokemonList[secondPokemonIndex].japaneseName;
      collectionData.imageUrl = pokemonList[secondPokemonIndex].imageUrl;
    }

    return collectionData;
  });
}

// ------------- 経験値獲得＆レベルアップ＆進化 -------------
export function grownCollection(
  collectionData: Array<CollectionData>,
  pokemonList: Array<Pokemon>,
) {
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
      const nextLevel = currentLevel + 1;
      grownCollection[i].level = nextLevel;

      if (nextLevel === 33) {
        const secondPokemonName = grownCollection[i].evolutionChain[1];

        const targetPokemonListIndex = pokemonList.findIndex((pokemon) => {
          pokemon.name === secondPokemonName;
        });

        grownCollection[i].name = pokemonList[targetPokemonListIndex].name;
        grownCollection[i].japaneseName = pokemonList[targetPokemonListIndex].japaneseName;
        grownCollection[i].imageUrl = pokemonList[targetPokemonListIndex].imageUrl;
        //
      } else if (nextLevel === 66) {
        const thirdPokemonName = grownCollection[i].evolutionChain[2];

        const targetPokemonListIndex = pokemonList.findIndex((pokemon) => {
          pokemon.name === thirdPokemonName;
        });

        grownCollection[i].name = pokemonList[targetPokemonListIndex].name;
        grownCollection[i].japaneseName = pokemonList[targetPokemonListIndex].japaneseName;
        grownCollection[i].imageUrl = pokemonList[targetPokemonListIndex].imageUrl;
      }
    }
    grownCollection[i].XP = grownXP;
    return grownCollection;
  } else {
    return collectionData;
  }
}
