import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {INTERNAL_MANAGER_PATH} from '~constants/route-paths'
import InternalManagerCreateInput from '~models/dto/internal-manager/CreateInput'
import {IInputHook} from '~types'
import {IInternalManagerCreate, ServerErrorFormat} from '~types/dto'
import {InternalManagerCreateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useInternalManagerRegister =
  (): IInputHook<InternalManagerCreateData> => {
    const route = useRouter()
    const queryClient = useQueryClient()
    const internalManagerCreateInput = new InternalManagerCreateInput()
    const submitMutation = useMutation<
      IResponse<void>,
      ServerErrorFormat,
      IInternalManagerCreate
    >(
      (input) =>
        fetcher(apiPath.internalManager.global(), {
          body: JSON.stringify(input),
          method: 'POST',
        }),
      {
        onError: (error) => {
          isLocalServerErrorType(error.errorType) &&
            // eslint-disable-next-line no-alert
            alert(
              errorMessages.internalManager?.[error.errorType] || error.message,
            )
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['internal-manager-list'], {
            refetchType: 'all',
          })
          route.push(INTERNAL_MANAGER_PATH)
        },
      },
    )

    const handleOnSubmit: SubmitHandler<InternalManagerCreateData> = (
      data,
      event,
    ): void => {
      internalManagerCreateInput.data = data
      submitMutation.mutate(internalManagerCreateInput.input)
      event?.preventDefault()
    }

    const handleOnCancel = (): void => {
      route.back()
    }

    return {
      formData: internalManagerCreateInput.data,
      onCancel: handleOnCancel,
      onSubmit: handleOnSubmit,
    }
  }

export default useInternalManagerRegister
