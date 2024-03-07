import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {EXTERNAL_MANAGER_PATH} from '~constants/route-paths'
import ExternalManagerCreateInput from '~models/dto/_external-manager/CreateInput'
import {IInputHook} from '~types'
import {IExternalManagerCreate, ServerErrorFormat} from '~types/dto'
import {ExternalManagerCreateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalManagerRegister =
  (): IInputHook<ExternalManagerCreateData> => {
    const route = useRouter()
    const queryClient = useQueryClient()
    const externalManagerCreateInput = new ExternalManagerCreateInput()
    const submitMutation = useMutation<
      IResponse<void>,
      ServerErrorFormat,
      IExternalManagerCreate
    >(
      (input) =>
        fetcher(apiPath.externalManager.global(), {
          body: JSON.stringify(input),
          method: 'POST',
        }),
      {
        onError: (error) => {
          isLocalServerErrorType(error.errorType) &&
            // eslint-disable-next-line no-alert
            alert(
              errorMessages.externalManager?.[error.errorType] || error.message,
            )
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(['external-manager-list'], {
            refetchType: 'all',
          })
          route.push(EXTERNAL_MANAGER_PATH)
        },
      },
    )

    const handleOnSubmit: SubmitHandler<ExternalManagerCreateData> = (
      data,
      event,
    ): void => {
      externalManagerCreateInput.data = data
      submitMutation.mutate(externalManagerCreateInput.input)
      event?.preventDefault()
    }

    const handleOnCancel = (): void => {
      route.back()
    }

    return {
      formData: externalManagerCreateInput.data,
      onCancel: handleOnCancel,
      onSubmit: handleOnSubmit,
    }
  }

export default useExternalManagerRegister
