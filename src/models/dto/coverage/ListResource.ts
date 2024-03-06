import {COVERAGE_PAGE_SIZE} from '~constants/pagination'
import {IPaginationInfo} from '~types'
import {ICoverage, IPaginationResponse} from '~types/dto'

class CoverageListResource {
  #items: ICoverage[]
  #currentPageNumber: number
  #lastPageNumber: number
  #totalItemCount: number

  constructor(data: IPaginationResponse<ICoverage>) {
    const {currentPageNumber, items, lastPageNumber, totalItemCount} = data
    this.#items = items
    this.#currentPageNumber = currentPageNumber
    this.#lastPageNumber = lastPageNumber
    this.#totalItemCount = totalItemCount
  }

  get items(): ICoverage[] {
    return this.#items
  }

  get paginationInfo(): IPaginationInfo {
    return {
      currentPageNumber: this.#currentPageNumber,
      itemCountPerPage: COVERAGE_PAGE_SIZE,
      lastPageNumber: this.#lastPageNumber,
      totalItemCount: this.#totalItemCount,
    }
  }
}

export default CoverageListResource
