import {useMutation} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import useLogin from '../login/use-login'
import useInternalManagerDetail from '../internal-manager/use-internal-manager-detail'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import PasswordUpdateInput from '~models/dto/password/UpdateInput'
import {IInputHook} from '~types'
import {IPasswordUpdate, ServerErrorFormat} from '~types/dto'
import {IPasswordUpdateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'
import {
  getAccessToken,
  getInternalCaregivingManagerIdFromToken,
  getUserIdFromToken,
} from '~utils/manage-token'

const usePasswordChange = (): IInputHook<IPasswordUpdateData> => {
  const route = useRouter()
  const passwordUpdateInput = new PasswordUpdateInput()
  const userId = getUserIdFromToken()

  const accessToken = getAccessToken()
  const internalManagerData = useInternalManagerDetail({
    id:
      (accessToken && getInternalCaregivingManagerIdFromToken(accessToken)) ||
      undefined,
  })

  const {loginAsync} = useLogin()
  const {mutate: changePassword} = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IPasswordUpdate
  >(
    (input) =>
      fetcher(apiPath.userPassword.identified.common(userId), {
        body: JSON.stringify(input),
        method: 'PUT',
      }),
    {
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(
            errorMessages.passwordChange?.[error.errorType] || error.message,
          )
      },
      onSuccess: async (_, {password}) => {
        if (internalManagerData) {
          await loginAsync({
            email: internalManagerData?.email,
            password,
            refreshToken: null,
          })
          route.back()
        }
      },
    },
  )

  const handleOnChangePassword: SubmitHandler<IPasswordUpdateData> = (
    data,
  ): void => {
    passwordUpdateInput.data = data
    const {currentPassword, password} = passwordUpdateInput.input
    changePassword({currentPassword, password})
  }

  const handleOnCancel = (): void => {
    route.back()
  }

  return {
    formData: passwordUpdateInput.data,
    onCancel: handleOnCancel,
    onSubmit: handleOnChangePassword,
  }
}

export default usePasswordChange
