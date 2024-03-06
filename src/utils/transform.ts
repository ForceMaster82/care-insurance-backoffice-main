import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {IPaginationInfo} from '~types'
import {IExternalOrganization} from '~types/dto'

const NUMBER_HUNDRED = 100
export const transformDecimalToPercent = (decimal: number): string =>
  `${decimal * NUMBER_HUNDRED}%`

export const transformPercentToDecimal = (percent: string): number => {
  const [percentValue] = percent.split('%')
  return Number((Number(percentValue) / NUMBER_HUNDRED).toFixed(1))
}

export const transformIndexToItemOrder = (
  paginationInfo: IPaginationInfo,
  itemIndex: number,
): number =>
  paginationInfo.totalItemCount -
  (paginationInfo.currentPageNumber - 1) * paginationInfo.itemCountPerPage -
  itemIndex

/** 계정 관리 */
export const transformOrganizationIdToName = (
  organizationList: IExternalOrganization[],
  organizationId: string,
): string => {
  const organizationInfo = organizationList.find(
    (organization) => organization.id === organizationId,
  )
  return organizationInfo?.name || EMPTY_VALUE_TEXT
}
