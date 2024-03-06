import {JwtPayload} from 'jwt-decode'
import {SubmitHandler} from 'react-hook-form'
import {IPageData, QueryType, ServerErrorFormat} from './dto'

/** 공통 */
export type FilterItem<T = string> = {
  title: string
  value: T
}

export type TokenPayload = JwtPayload & {
  externalCaregivingManagerIds: string[]
  internalCaregivingManagerId?: string
  tokenType: 'access' | 'refresh'
}
export type ResourceHook<ResourceType, U = unknown> = (
  params?: {
    id?: string
    pageNumber?: number
    pageSize?: number
    query?: QueryType
  } & U,
) => ResourceType | null

export interface IInputHook<T> {
  formData: T
  isLoaded?: boolean
  onCancel?: () => void
  onSubmit: SubmitHandler<T>
  serverError?: ServerErrorFormat
}

/** pagination */

export type PaginationQuery = {
  pageNumber: number
  pageSize: number
  query?: QueryType
}
export interface IPaginationInfo extends IPageData {
  itemCountPerPage: number
}

/** gnb */
export type PageCategoryType = 'MASTER_DATA' | 'ACCOUNT_MANAGEMENT'

export type PageKeyType =
  | 'COVERAGE'
  | 'EXTERNAL_ORGANIZATION'
  | 'INTERNAL_MANAGER'
  | 'EXTERNAL_MANAGER'

export type PagePathType =
  | '/external-organization'
  | '/coverage'
  | '/internal-manager'
  | '/external-manager'

export type NavigationTitleType = '기준정보 관리' | '계정 관리'

export type SideBarTitleType =
  | '제휴사(협회) 관리'
  | '가입담보 관리'
  | '제휴사 계정 관리'
  | '관리자 계정 관리'

export type NavigationItemType = {
  category: PageCategoryType
  path: PagePathType
  title: NavigationTitleType
}

export type SideBarItemType = {
  pageKey: PageKeyType
  path: PagePathType
  title: SideBarTitleType
}

export type SideBarMapType = {
  [key in PageCategoryType]: SideBarItemType[]
}
