import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {DETAIL_PATH, EXTERNAL_MANAGER_PATH} from '~constants/route-paths'
import {ExternalManagerResource} from '~models/dto/\bexternal-manager/Resource'
import ExternalManagerUpdateInput from '~models/dto/\bexternal-manager/UpdateInput'
import {IInputHook} from '~types'
import {IExternalManagerUpdate, ServerErrorFormat} from '~types/dto'
import {ExternalManagerUpdateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalManagerModify = (
  detailResource: ExternalManagerResource | null,
): IInputHook<ExternalManagerUpdateData> => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const externalManagerUpdateInput = new ExternalManagerUpdateInput(
    detailResource,
  )
  const managerId = detailResource?.id || ''

  const mutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IExternalManagerUpdate
  >(
    (input) =>
      fetcher(apiPath.externalManager.identified.common(managerId), {
        body: JSON.stringify(input),
        method: 'PUT',
      }),
    {
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(
            errorMessages.externalManager?.[error.errorType] || error.message,
          )
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['external-manager-list'], {
          refetchType: 'all',
        })
        queryClient.invalidateQueries(['external-manager-detail', managerId])
        route.push(`${EXTERNAL_MANAGER_PATH}/${managerId}${DETAIL_PATH}`)
      },
    },
  )

  const handleOnSubmit: SubmitHandler<ExternalManagerUpdateData> = (
    data,
    event,
  ): void => {
    externalManagerUpdateInput.data = data
    // eslint-disable-next-line no-alert
    if (confirm('변경된 사항을 적용하시겠습니까?')) {
      mutation.mutate(externalManagerUpdateInput.input)
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
    formData: externalManagerUpdateInput.data,
    isLoaded: externalManagerUpdateInput.isLoaded,
    onCancel: handleOnCancel,
    onSubmit: handleOnSubmit,
  }
}

export default useExternalManagerModify
