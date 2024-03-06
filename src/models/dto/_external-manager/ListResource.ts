import {DEFAULT_PAGE_SIZE} from '~constants/pagination'
import {IPaginationInfo} from '~types'
import {IExternalManager, IPaginationResponse} from '~types/dto'

class ExternalManagerListResource {
  #items: IExternalManager[]
  #currentPageNumber: number
  #lastPageNumber: number
  #totalItemCount: number

  constructor(data: IPaginationResponse<IExternalManager>) {
    const {currentPageNumber, items, lastPageNumber, totalItemCount} = data
    this.#items = items
    this.#currentPageNumber = currentPageNumber
    this.#lastPageNumber = lastPageNumber
    this.#totalItemCount = totalItemCount
  }

  get items(): IExternalManager[] {
    return this.#items
  }

  get paginationInfo(): IPaginationInfo {
    return {
      currentPageNumber: this.#currentPageNumber,
      itemCountPerPage: DEFAULT_PAGE_SIZE,
      lastPageNumber: this.#lastPageNumber,
      totalItemCount: this.#totalItemCount,
    }
  }
}

export default ExternalManagerListResource
