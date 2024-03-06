import {QueryClientConfig} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {isServerError} from '../utils/fetch'
import {PASSWORD_CHANGE_PATH} from '../constants/route-paths'
import {GlobalServerErrorType} from '../types/dto'
import {isGlobalServerErrorType} from '../utils/type-gards'

const useQueryClientConfig = (): QueryClientConfig => {
  const router = useRouter()

  const handleOnServerError = (
    errorType: GlobalServerErrorType,
    defaultErrorMessage: string,
  ): void => {
    switch (errorType) {
      case 'PASSWORD_CHANGE_REQUIRED':
        // eslint-disable-next-line no-alert
        alert(defaultErrorMessage)
        router.push(PASSWORD_CHANGE_PATH)
        break
    }
  }

  const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
      /** 컴포넌트 내부에서 각자 정의된 onError에 overwrite되므로 global error handling은 onSettled에 정의한다 */
      mutations: {
        onSettled(data, error): void {
          if (error && isServerError(error)) {
            const errorType = isGlobalServerErrorType(error.errorType)
            errorType && handleOnServerError(errorType, error.message)
          }
        },
      },
      queries: {
        onSettled(data, error): void {
          if (error && isServerError(error)) {
            const errorType = isGlobalServerErrorType(error.errorType)
            errorType && handleOnServerError(errorType, error.message)
          }
        },
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error && isServerError(error)) {
            const errorType = isGlobalServerErrorType(error.errorType)
            if (
              errorType === 'REFRESH_TOKEN_ALREADY_USED' &&
              failureCount < 2
            ) {
              return true
            }
          }
          return false
        },
      },
    },
  }

  return queryClientConfig
}

export default useQueryClientConfig
