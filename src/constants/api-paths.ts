import querystring from 'query-string'
import {ExternalOrganizationType, QueryType} from '~types/dto'

interface IPaginationQuery extends Record<string, unknown> {
  'page-number': number
  'page-size': number
  query?: QueryType
}

const withEndpoint = (path?: string): string => {
  const BASE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}`
  return [BASE_ENDPOINT, path].join('/')
}

const withParamsUrl = (
  path: string,
  params?: Record<string, unknown>,
): string => {
  const url = [withEndpoint(path), querystring.stringify(params || {})]
    .filter((v) => Boolean(v))
    .join('?')
  return url
}

export const apiPath = {
  authentications: {
    global: (): string => withParamsUrl(`api/v1/authentications`),
  },
  coverage: {
    /** @description 가입담보 등록 @description 가입담보 목록조회 */
    global: (params?: IPaginationQuery): string =>
      withParamsUrl('api/v1/coverages', params),
    identified: {
      /** @description 가입담보 상세조회 @description 가입담보 수정 */
      common: (internalCaregivingManagerId: string): string =>
        withParamsUrl(`api/v1/coverages/${internalCaregivingManagerId}`),
    },
  },
  externalCaregivingOrganization: {
    /** @description 외부간병협회 목록 조회  @description 외부간병협회 등록 */
    global: (
      params?: IPaginationQuery & {
        'external-caregiving-organization-type'?: ExternalOrganizationType
      },
    ): string =>
      withParamsUrl('api/v1/external-caregiving-organizations', params),
    identified: {
      /** @description 외부간병협회의 사업자등록증 파일 저장 */
      businessLicense: (externalCaregivingOrganizationId: string): string =>
        withParamsUrl(
          `api/v1/external-caregiving-organizations/${externalCaregivingOrganizationId}/business-license`,
        ),
      /** @description 외부간병협회 상세 조회  @description 외부간병협회 수정 */
      common: (externalCaregivingOrganizationId: string): string =>
        withParamsUrl(
          `api/v1/external-caregiving-organizations/${externalCaregivingOrganizationId}`,
        ),
    },
  },
  externalManager: {
    /** @description 외부협회 계정 등록 @description 외부협회 계정 목록조회 @description 외부협회 계정 사용여부 수정 */
    global: (
      params?: IPaginationQuery & {
        'external-caregiving-organization-id'?: string
      },
    ): string => withParamsUrl('api/v1/external-caregiving-managers', params),
    identified: {
      /** @description 외부협회 계정 상세조회 @description 외부협회 계정 수정 */
      common: (externalCaregivingManagerId: string): string =>
        withParamsUrl(
          `api/v1/external-caregiving-managers/${externalCaregivingManagerId}`,
        ),
    },
  },
  internalManager: {
    /** @description 내부사용자 등록 @description 내부사용자 목록조회 @description 내부사용자 사용여부 수정 */
    global: (params?: IPaginationQuery): string =>
      withParamsUrl('api/v1/internal-caregiving-managers', params),
    identified: {
      /** @description 내부사용자 상세조회 @description 내부사용자 수정 */
      common: (coverageId: string): string =>
        withParamsUrl(`api/v1/internal-caregiving-managers/${coverageId}`),
    },
  },
  userPassword: {
    identified: {
      /** @description 사용자 패스워드 수정 */
      common: (userId: string): string =>
        withParamsUrl(`api/v1/users/${userId}/password`),
    },
  },
  users: {
    identified: {
      /** @description 사용자 세부정보 조회 */
      common: (userId: string): string =>
        withParamsUrl(`api/v1/users/${userId}`),
    },
  },
}
