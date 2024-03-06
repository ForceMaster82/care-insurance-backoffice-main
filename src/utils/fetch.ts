import {
  checkIsNeedRefreshAccessToken,
  getAccessToken,
  getRefreshToken,
  saveToken,
} from './manage-token'
import {apiPath} from '~constants/api-paths'
import {IToken, ServerErrorFormat} from '~types/dto'

const parseResponse = (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('Content-Type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  if (contentType?.includes('text')) {
    return response.text()
  }

  if (contentType?.includes('form-data')) {
    return response.formData()
  }

  return response.blob()
}

export interface IResponse<T> {
  body: T
  headers: Headers
}
export const fetcher = async <T>(
  path: string,
  input?: RequestInit & {method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'},
  isNeedAuth = true,
): Promise<IResponse<T>> => {
  const isNeedRefreshAccessToken = checkIsNeedRefreshAccessToken()
  if (isNeedAuth && isNeedRefreshAccessToken) {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      const newToken = await fetchRefresh(refreshToken)

      saveToken(newToken)
    }
  }
  const accessToken = getAccessToken()
  const options = {
    authorization: isNeedAuth &&
      accessToken && {
        Authorization: `Bearer ${accessToken}`,
      },
  }
  const response = await fetch(path, {
    ...input,
    headers: {
      'Content-type': 'application/json',
      ...input?.headers,
      ...options?.authorization,
    },
    method: input?.method || 'GET',
  })

  if (!response.ok) {
    const errorResponse: ServerErrorFormat = await response.json()
    throw errorResponse
  }
  const body = (await parseResponse(response)) as T
  const headers = response.headers
  return {body, headers}
}

export const fetchRefresh = async (refreshToken: string): Promise<IToken> => {
  const fetchBody = JSON.stringify({refreshToken})

  const response = await fetch(apiPath.authentications.global(), {
    body: fetchBody,
    headers: {'Content-type': 'application/json'},
    method: 'POST',
  })

  if (!response.ok) {
    const errorResponse: ServerErrorFormat = await response.json()
    throw errorResponse
  }

  const updatedNewToken: IToken = await response.json()
  return updatedNewToken
}

/**  content-type에 자동으로 binary boundary가 들어가도록 content-type 설정x */
export const fetchBinary = async <T>(
  path: string,
  input?: RequestInit,
  isNeedAuth = true,
): Promise<IResponse<T>> => {
  const isNeedRefreshAccessToken = checkIsNeedRefreshAccessToken()
  if (isNeedAuth && isNeedRefreshAccessToken) {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      const newToken = await fetchRefresh(refreshToken)

      saveToken(newToken)
    }
  }
  const accessToken = getAccessToken()
  const options = {
    authorization: isNeedAuth &&
      accessToken && {
        Authorization: `Bearer ${accessToken}`,
      },
  }
  const response = await fetch(path, {
    ...input,
    headers: {
      ...input?.headers,
      ...options?.authorization,
    },
    method: input?.method || 'GET',
  })

  if (!response.ok) {
    const errorResponse: ServerErrorFormat = await response.json()
    throw errorResponse
  }
  const body = (await parseResponse(response)) as T
  const headers = response.headers
  return {body, headers}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isServerError = (error: any): error is ServerErrorFormat => {
  return typeof error?.message !== undefined && typeof error.type !== undefined
}
