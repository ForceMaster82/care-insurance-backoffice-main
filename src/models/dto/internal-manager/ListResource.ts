import {DEFAULT_PAGE_SIZE} from '~constants/pagination'
import {IPaginationInfo} from '~types'
import {IInternalManager, IPaginationResponse} from '~types/dto'

class InternalManagerListResource {
  #items: IInternalManager[]
  #currentPageNumber: number
  #lastPageNumber: number
  #totalItemCount: number

  constructor(data: IPaginationResponse<IInternalManager>) {
    const {currentPageNumber, items, lastPageNumber, totalItemCount} = data
    this.#items = items
    this.#currentPageNumber = currentPageNumber
    this.#lastPageNumber = lastPageNumber
    this.#totalItemCount = totalItemCount
  }

  get items(): IInternalManager[] {
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

export default InternalManagerListResource
