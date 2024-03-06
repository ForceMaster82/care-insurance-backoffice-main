/* eslint-disable no-magic-numbers */
import {RequestCookies} from 'next/dist/server/web/spec-extension/cookies'
import {NextRequest, NextResponse} from 'next/server'
import {EXTERNAL_ORGANIZATION_PATH, LOGIN_PATH} from '~constants/route-paths'
import {fetchRefresh} from '~utils/fetch'
import {checkIsTokenExpired} from '~utils/manage-token'
interface CheckTokenStatusReturnType {
  accessToken?: string
  isNeedLogin: boolean
  isNeedRefresh: boolean
  refreshToken?: string
}
const checkTokenStatus = (
  cookies: RequestCookies,
): CheckTokenStatusReturnType => {
  const accessToken = cookies.get('accessToken')?.value
  const refreshToken = cookies.get('refreshToken')?.value
  const isNeedLogin = !refreshToken || checkIsTokenExpired(refreshToken)
  const isNeedRefresh = !accessToken || checkIsTokenExpired(accessToken)
  return {accessToken, isNeedLogin, isNeedRefresh, refreshToken}
}

export async function middleware(
  request: NextRequest,
): Promise<NextResponse | undefined> {
  const {refreshToken, isNeedLogin, isNeedRefresh} = checkTokenStatus(
    request.cookies,
  )
  const isLoginPage = request.nextUrl.pathname.startsWith(LOGIN_PATH)

  /** refresh token이 유효하지 않아 로그인이 필요한 경우 */
  if (isNeedLogin) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    }
    /** refresh token 유효 */
  } else {
    /** 로그인 페이지 진입 리다이렉트 */
    if (isLoginPage) {
      return NextResponse.redirect(
        new URL(EXTERNAL_ORGANIZATION_PATH, request.url),
      )
    }
    /** access token 유효하지 않아 갱신필요*/
    if (isNeedRefresh) {
      try {
        const response = NextResponse.next()

        if (refreshToken) {
          const newToken = await fetchRefresh(refreshToken)
          response.cookies.set('accessToken', newToken.accessToken)
          response.cookies.set('refreshToken', newToken.refreshToken)
        }

        return response
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }
  }
}

export const config = {
  matcher: [
    /*
     * match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon).*)',
  ],
}
