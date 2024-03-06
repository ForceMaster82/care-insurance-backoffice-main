import {
  ExternalOrganizationType,
  OrganizationType,
  RenewalType,
} from '~types/dto'

export const EMPTY_VALUE_TEXT = '-'

export const VALID_INPUT_MESSAGE = '정상적으로 입력되었습니다.'

export const ORGANIZATION_TYPE_NAME: Record<OrganizationType, string> = {
  AFFILIATED: '제휴사',
  INTERNAL: '케어닥',
  ORGANIZATION: '협회',
}

export const EXTERNAL_CAREGIVING_ORGANIZATION_TYPE: Record<
  ExternalOrganizationType,
  string
> = {
  AFFILIATED: '제휴사',
  ORGANIZATION: '협회',
}

export const COVERAGE_RENEWAL_TYPE: Record<RenewalType, string> = {
  TEN_YEAR: '10년형',
  THREE_YEAR: '3년형',
}

export const DEFAULT_RENEWAL_TYPE: RenewalType = 'TEN_YEAR'

export const COVERAGE_MAX_SUBSCRIPTION_YEAR = 2040
export const COVERAGE_MIN_SUBSCRIPTION_YEAR = 2024
