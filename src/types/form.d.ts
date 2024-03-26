import ExternalManagerCreateInput from '~models/dto/\bexternal-manager/CreateInput'
import ExternalManagerUpdateInput from '~models/dto/\bexternal-manager/UpdateInput'
import CoverageCreateInput from '~models/dto/coverage/CreateInput'
import CoverageUpdateInput from '~models/dto/coverage/UpdateInput'
import InternalManagerCreateInput from '~models/dto/internal-manager/CreateInput'
import InternalManagerUpdateInput from '~models/dto/internal-manager/UpdateInput'
import LoginInput from '~models/dto/login/Input'
import ExternalOrganizationInput from '~models/dto/external-organization/Input'
import ExternalOrganizationListResource from '~models/dto/external-organization/ListResource'

export type LoginData = Pick<LoginInput, 'email' | 'password'>

export interface IPasswordUpdateData {
  currentPassword: string
  newPassword: string
  newPasswordCheck: string
}

export type ExternalOrganizationData = Omit<
  ExternalOrganizationInput,
  'data' | 'input' | 'isLoaded'
>

/** 가입담보 관리 */

export interface IAnnualCoveredCaregivingChargeData {
  caregivingCharge: string
  targetAccidentYear: number
}

export type CoverageCreateData = Pick<
  CoverageCreateInput,
  'name' | 'targetSubscriptionYear' | 'dailyCharge' | 'renewalType'
>

export type CoverageUpdateData = Pick<
  CoverageUpdateInput,
  'name' | 'renewalType' | 'baseYearCharge' | 'applicationYearCharges'
>

/** 제휴사 계정 관리 */
export type ExternalManagerData = ExternalOrganizationListResource & {
  name: string
}

export type ExternalManagerCreateData = Omit<
  ExternalManagerCreateInput,
  'data' | 'input'
>

export type ExternalManagerUpdateData = Omit<
  ExternalManagerUpdateInput,
  'data' | 'input' | 'isLoaded'
>

/** 관리자 계정 관리 */
export type InternalManagerCreateData = Omit<
  InternalManagerCreateInput,
  'data' | 'input'
>

export type InternalManagerUpdateData = Omit<
  InternalManagerUpdateInput,
  'data' | 'input' | 'isLoaded'
>
