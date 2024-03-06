import jwtDecode, {JwtPayload} from 'jwt-decode'
import Cookies from 'js-cookie'
import {IToken} from '~types/dto'
import {TokenPayload} from '~types'

export const saveToken = (token: IToken) => {
  const {accessToken, refreshToken} = token
  saveAccessToken(accessToken)
  saveRefreshToken(refreshToken)
}

export const saveAccessToken = (token: string): void => {
  Cookies.set('accessToken', token, {
    secure: true,
  })
}

export const saveRefreshToken = (token: string): void => {
  Cookies.set('refreshToken', token, {
    secure: true,
  })
}

export const getAccessToken = (): string | undefined => {
  const accessToken = Cookies.get('accessToken')
  return accessToken
}

export const getRefreshToken = (): string | undefined => {
  const refreshToken = Cookies.get('refreshToken')
  return refreshToken
}

export const removeAccessToken = (): void => {
  Cookies.remove('accessToken')
}

export const removeRefreshToken = (): void => {
  Cookies.remove('refreshToken')
}

export const checkIsTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token)
  let isExpired = false
  if (decoded.exp) {
    const buffer = 60_000
    // eslint-disable-next-line no-magic-numbers
    isExpired = decoded.exp < (Date.now() + buffer) / 1000
  }
  return isExpired
}

export const getUserIdFromToken = (): string => {
  const accessToken = getAccessToken()
  if (accessToken) {
    const decoded = jwtDecode<TokenPayload>(accessToken)
    const userId = decoded.sub || ''
    return userId
  }
  return ''
}

export const getInternalCaregivingManagerIdFromToken = (
  accessToken: string,
): string | undefined => {
  const decoded = jwtDecode<TokenPayload>(accessToken)
  const internalCaregivingManagerId = decoded.internalCaregivingManagerId
  return internalCaregivingManagerId
}

export const checkIsNeedLogin = (): boolean => {
  const refreshToken = getRefreshToken()
  const isNeedLogin = !refreshToken || checkIsTokenExpired(refreshToken)
  return isNeedLogin
}

export const checkIsNeedRefreshAccessToken = (): boolean => {
  const accessToken = getAccessToken()
  const isNeedRefreshAccessToken =
    !accessToken || checkIsTokenExpired(accessToken)
  return isNeedRefreshAccessToken
}
