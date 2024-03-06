import {UseMutateAsyncFunction, useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import LoginInput from '~models/dto/login/Input'
import {IInputHook} from '~types'
import {ILogin, IToken, ServerErrorFormat} from '~types/dto'
import {LoginData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'
import {
  getInternalCaregivingManagerIdFromToken,
  saveToken,
} from '~utils/manage-token'

interface IProps {
  onSuccess?: (data: IResponse<IToken>, variables: ILogin) => void
}

type UseLogin = IInputHook<LoginData> & {
  loginAsync: UseMutateAsyncFunction<
    IResponse<IToken>,
    ServerErrorFormat<unknown>,
    ILogin
  >
}

const useLogin = (props?: IProps): UseLogin => {
  const {onSuccess} = props || {}
  const [serverError, setServerError] = useState<ServerErrorFormat>()
  const loginInput = new LoginInput()
  const {mutate: login, mutateAsync} = useMutation<
    IResponse<IToken>,
    ServerErrorFormat,
    ILogin
  >(
    (input) =>
      fetcher<IToken>(
        apiPath.authentications.global(),
        {
          body: JSON.stringify(input),
          method: 'POST',
        },
        false,
      ),
    {
      onError: (error) => {
        setServerError(error)

        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(errorMessages.login?.[error.errorType] || error.message)
      },
      onSuccess: (data, variables) => {
        const {accessToken, refreshToken} = data.body
        const internalManagerId =
          getInternalCaregivingManagerIdFromToken(accessToken)
        if (internalManagerId) {
          saveToken({accessToken, refreshToken})
          onSuccess?.(data, variables)
        } else {
          // eslint-disable-next-line no-alert
          alert('관리자 계정만 로그인할 수 있습니다')
        }
      },
    },
  )

  const handleOnLogin: SubmitHandler<LoginData> = (data, event): void => {
    loginInput.data = data
    const {email, password, refreshToken} = loginInput.input
    login({email, password, refreshToken})
  }

  return {
    formData: loginInput.data,
    loginAsync: mutateAsync,
    onSubmit: handleOnLogin,
    serverError,
  }
}

export default useLogin
