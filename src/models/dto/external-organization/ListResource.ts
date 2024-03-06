import type {IComboBoxItemData} from '@caredoc/ui-web'
import {DEFAULT_PAGE_SIZE} from '~constants/pagination'
import {IPaginationInfo} from '~types'
import {IExternalOrganization, IPaginationResponse} from '~types/dto'

class ExternalOrganizationListResource {
  #items: IExternalOrganization[]
  #currentPageNumber: number
  #lastPageNumber: number
  #totalItemCount: number

  constructor(data: IPaginationResponse<IExternalOrganization>) {
    const {currentPageNumber, items, lastPageNumber, totalItemCount} = data
    this.#items = items
    this.#currentPageNumber = currentPageNumber
    this.#lastPageNumber = lastPageNumber
    this.#totalItemCount = totalItemCount
  }

  get items(): IExternalOrganization[] {
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

  get options(): IComboBoxItemData<string>[] {
    const options = this.#items.map((organizationInfo) => ({
      data: organizationInfo.id,
      label: organizationInfo.name,
    }))
    return options
  }
}

export default ExternalOrganizationListResource
