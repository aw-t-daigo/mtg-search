export class SearchCondition {
  keyword!: string
  cardType!: string
  colors!: string[]
  isOr!: boolean

  constructor(keyword: string, cardType: string, colors: string[], isOr: boolean) {
    this.keyword = keyword
    this.cardType = cardType
    this.colors = colors
    this.isOr = isOr
  }

  buildQuery(): string {
    let query = `${this.keyword}`
    if (this.cardType !== '') {
      query += ` t:${this.cardType}`
    }
    if (this.colors.length > 0) {
      if (this.isOr) {
        query += ` (${this.colors.map((v) => `c:${v}`).join(' or ')})`
      } else {
        query += ` c:${this.colors.join('')}`
      }
    }

    return query
  }
}
