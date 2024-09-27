// ---- Types ----
import CollectionData from 'src/types/CollectionData';
import Pokemon from 'src/types/Pokemon';
import DefaultPokemonName from 'src/types/PokemonName';
import { createDefaultCollection } from '@utils/collectionUtils';
import { sortPokemonCollection } from '@utils/sortUtils';

// ---------------------------------------------
/**
 * 指定されたポケモンの詳細データを取得する非同期関数
 * @param name - ポケモンの名前（デフォルト名または文字列）
 * @returns ポケモンの詳細データ、またはエラー時にnull
 */
const fetchPokemonData = async (name: DefaultPokemonName | string) => {
  try {
    // ポケモンの種別情報を取得
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}/`);
    const data = await response.json();

    // 日本語の名前を取得（なければ英語名をデフォルトとして使用）
    const japaneseName =
      data.names.find(
        (name: { language: { name: string }; name: string }) => name.language.name === 'ja-Hrkt',
      )?.name || data.name;

    // 進化チェーン情報を取得
    const evolutionChainResponse = await fetch(data.evolution_chain.url);
    const evolutionChainData = await evolutionChainResponse.json();

    // 進化チェーンのすべての段階をリストとして取得
    const chainNames: Array<DefaultPokemonName | string | null> = [];
    let currentChain = evolutionChainData.chain;
    while (currentChain) {
      chainNames.push(currentChain.species.name);
      currentChain = currentChain.evolves_to[0];
    }

    // ポケモンの画像URLを取得
    const pokemonDataResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const pokemonData = await pokemonDataResponse.json();
    const imageUrl = pokemonData.sprites.front_default;

    // 取得したデータを整形して返す
    return { name: data.name, japaneseName, url: data.url, imageUrl, evolutionChain: chainNames };
  } catch (error) {
    console.error('Failed to fetch Pokemon:', error);
    return null;
  }
};

// ---------------------------------------------
/**
 * 指定されたポケモンリストのデータを取得し、状態を更新する非同期関数
 * @param pokemonNameList - 取得するポケモンの名前リスト
 * @param getPokemonList - ポケモンリストを更新するコールバック関数
 * @param getCollectionData - コレクションデータを更新するコールバック関数
 */
export const fetchPokemonList = async (
  pokemonNameList: Array<DefaultPokemonName | string>,
  getPokemonList: (pokemonList: Array<Pokemon>) => void,
  getCollectionData: (collectionList: Array<CollectionData>) => void,
  isDemo: boolean,
) => {
  // すべてのポケモンデータを非同期で取得
  const pokemonDataList = await Promise.all(pokemonNameList.map((name) => fetchPokemonData(name)));

  // nullでないポケモンデータのみをフィルタリング
  const filteredPokemonDataList = pokemonDataList.filter(
    (pokemonData) =>
      pokemonData !== null &&
      pokemonData.evolutionChain.filter((name): name is string => name !== null),
  ) as Array<Pokemon>;

  // デフォルトコレクションを作成し、nullエントリーを除外
  const defaultCollection = createDefaultCollection(filteredPokemonDataList);
  const filteredDefaultCollection = defaultCollection.filter(
    (collection: CollectionData) => collection !== null,
  );

  // コレクションをソートし、状態を更新してローカルストレージに保存
  const sortedDefaultCollection = sortPokemonCollection(filteredDefaultCollection);
  getCollectionData(sortedDefaultCollection);
  !isDemo && localStorage.setItem('collectionData', JSON.stringify(sortedDefaultCollection));

  const allEvolutionNameList: Array<string> = [];

  filteredPokemonDataList.forEach((data) => {
    allEvolutionNameList.push(data.evolutionChain[1]);
    allEvolutionNameList.push(data.evolutionChain[2]);
  });

  // すべてのポケモンデータを非同期で取得
  const additionalPokemonDataList = await Promise.all(
    allEvolutionNameList.map((name) => fetchPokemonData(name)),
  );

  const filteredAdditionalPokemonDataList = additionalPokemonDataList.filter(
    (pokemonData) =>
      pokemonData !== null &&
      pokemonData.evolutionChain.filter((name): name is string => name !== null),
  ) as Array<Pokemon>;

  const allPokemonDataList: Array<Pokemon> = [
    ...filteredPokemonDataList,
    ...filteredAdditionalPokemonDataList,
  ];

  // フィルタリングされたポケモンリストで状態を更新し、ローカルストレージに保存
  getPokemonList(allPokemonDataList);
  !isDemo && localStorage.setItem('pokemonList', JSON.stringify(allPokemonDataList));
};
