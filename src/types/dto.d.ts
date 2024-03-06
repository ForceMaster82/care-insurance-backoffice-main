import {
  GLOBAL_SERVER_ERROR_TYPES,
  LOCAL_SERVER_ERROR_TYPES,
} from '../constants/errors'

/** 공통 */
export interface IPageData {
  currentPageNumber: number
  lastPageNumber: number
  totalItemCount: number
}

export type QueryType = `${string}:${string}`

export interface IPaginationResponse<T> extends IPageData {
  items: T[]
}

export interface ServerErrorFormat<T = unknown> {
  data: T
  errorType: ServerErrorType
  message: string
}

export type ServerErrorType = GlobalServerErrorType | LocalServerErrorType

export type GlobalServerErrorType = (typeof GLOBAL_SERVER_ERROR_TYPES)[number]

export type LocalServerErrorType = (typeof LOCAL_SERVER_ERROR_TYPES)[number]

/** auth */
export interface ILogin {
  email: string | null
  password: string | null
  refreshToken: string | null
}

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface IPasswordUpdate {
  currentPassword: string
  password: string
}

/** 유저정보 */
export interface IUser {
  id: string
  lastLoginDateTime: string
  name: string
  organizations: {
    id: string | null
    organizationType: OrganizationType
  }[]
}

/** 외부 간병 협회 관리 */
export type OrganizationType = 'INTERNAL' | ExternalOrganizationType
export type ExternalOrganizationType = 'ORGANIZATION' | 'AFFILIATED'
export interface IExternalOrganization {
  externalCaregivingOrganizationType: ExternalOrganizationType
  id: string
  name: string
}

interface IAccountInfo {
  accountHolder: string | null
  accountNumber: string | null
  bank: string | null
}

export interface IExternalOrganizationDetail
  extends IExternalOrganizationUpdate {
  id: string
}

export interface IExternalOrganizationUpdate {
  accountInfo: IAccountInfo
  address: string
  businessLicenseFileName: string | null
  businessLicenseFileUrl: string | null
  contractName: string
  externalCaregivingOrganizationType: ExternalOrganizationType
  name: string
  phoneNumber: string
  profitAllocationRatio: number | null
}

export interface IBusinessLicenseUpdate {
  businessLicenseFile: File
  organizationId: string
}

/** 가입담보 관리 */

export type RenewalType = 'THREE_YEAR' | 'TEN_YEAR'
export type AnnualCoveredCaregivingCharge = {
  caregivingCharge: number
  targetAccidentYear: number
}
export interface ICoverage {
  id: string
  lastModifiedDateTime: string
  name: string
  renewalType: RenewalType
  targetSubscriptionYear: number
}

export interface ICoverageDetail extends ICoverage {
  annualCoveredCaregivingCharges: AnnualCoveredCaregivingCharge[]
}

export interface ICoverageCreate {
  annualCoveredCaregivingCharges: AnnualCoveredCaregivingCharge[]
  name: string
  renewalType: RenewalType
  targetSubscriptionYear: number
}

/** 외부 계정 관리 */

export interface IManagerSuspendUpdate {
  id: string
  suspended: boolean
}

export interface IExternalManager {
  email: string
  externalCaregivingOrganizationId: string
  id: string
  lastLoginDateTime: string
  name: string
  suspended: boolean
}

export interface IExternalManagerDetail {
  email: string
  externalCaregivingOrganizationId: string
  id: string
  lastLoginDateTime: string
  name: string
  phoneNumber: string
  remarks: string | null
  suspended: boolean
}

export interface IExternalManagerCreate {
  email: string
  externalCaregivingOrganizationId: string
  name: string
  phoneNumber: string
  remarks: string
}

export interface IExternalManagerUpdate {
  email: string
  externalCaregivingOrganizationId: string
  name: string
  phoneNumber: string
  remarks: string
  suspended: boolean
}

/** 내부 계정(관리자) 관리 */

export interface IInternalManager {
  email: string
  id: string
  lastLoginDateTime: string
  name: string
  nickname: string
  phoneNumber: string
  suspended: boolean
  userId: string
}

export interface IInternalManagerDetail {
  email: string
  id: string
  lastLoginDateTime: string
  name: string
  nickname: string
  phoneNumber: string
  remarks: string | null
  role: string
  suspended: boolean
  userId: string
}

export interface IInternalManagerCreate {
  email: string
  name: string
  nickname: string
  phoneNumber: string
  remarks: string
  role: string
}

export interface IInternalManagerUpdate {
  email: string
  name: string
  nickname: string
  phoneNumber: string
  remarks: string
  role: string
  suspended: boolean
}
