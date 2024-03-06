import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {DETAIL_PATH, INTERNAL_MANAGER_PATH} from '~constants/route-paths'
import InternalManagerResource from '~models/dto/internal-manager/Resource'
import InternalManagerUpdateInput from '~models/dto/internal-manager/UpdateInput'
import {IInputHook} from '~types'
import {IInternalManagerUpdate, ServerErrorFormat} from '~types/dto'
import {InternalManagerUpdateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useInternalManagerModify = (
  detailResource: InternalManagerResource | null,
): IInputHook<InternalManagerUpdateData> => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const internalManagerUpdateInput = new InternalManagerUpdateInput(
    detailResource,
  )
  const managerId = detailResource?.id || ''

  const mutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IInternalManagerUpdate
  >(
    (input) =>
      fetcher(apiPath.internalManager.identified.common(managerId), {
        body: JSON.stringify(input),
        method: 'PUT',
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
        queryClient.invalidateQueries(['internal-manager-detail', managerId])
        route.push(`${INTERNAL_MANAGER_PATH}/${managerId}${DETAIL_PATH}`)
      },
    },
  )

  const handleOnSubmit: SubmitHandler<InternalManagerUpdateData> = (
    data,
    event,
  ): void => {
    internalManagerUpdateInput.data = data
    // eslint-disable-next-line no-alert
    if (confirm('변경된 사항을 적용하시겠습니까?')) {
      mutation.mutate(internalManagerUpdateInput.input)
    }
    event?.preventDefault()
  }

  const handleOnCancel = (): void => {
    // eslint-disable-next-line no-alert
    if (confirm('작성 중인 내용이 있습니다.\n취소하시겠습니까?')) {
      route.back()
    }
  }

  return {
    formData: internalManagerUpdateInput.data,
    isLoaded: internalManagerUpdateInput.isLoaded,
    onCancel: handleOnCancel,
    onSubmit: handleOnSubmit,
  }
}

export default useInternalManagerModify
