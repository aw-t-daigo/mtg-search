import * as Scry from 'scryfall-sdk'

// MagicEmitter とやらが意味不明すぎてエラーハンドリングができない
// 魔改造するか意味不明な IF にするか MagicEmitter を使う前提で設計ごとやり直すか……
export function findAllCardsByQuery(query: string): Promise<Scry.Card[]> {
  console.log('fetch: ' + query)
  return Scry.Cards.search(query, { page: 1, unique: 'cards' }).cancelAfterPage().waitForAll()
}
