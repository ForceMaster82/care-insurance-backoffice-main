import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {COVERAGE_PATH, DETAIL_PATH} from '~constants/route-paths'
import CoverageResource from '~models/dto/coverage/Resource'
import CoverageUpdateInput from '~models/dto/coverage/UpdateInput'
import {IInputHook} from '~types'
import {ICoverageCreate, ServerErrorFormat} from '~types/dto'
import {CoverageUpdateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useCoverageModify = (
  detailResource: CoverageResource | null,
): IInputHook<CoverageUpdateData> => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const coverageUpdateInput = new CoverageUpdateInput(detailResource)
  const coverageId = detailResource?.id || ''

  const mutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    ICoverageCreate
  >(
    (input) =>
      fetcher(apiPath.coverage.identified.common(coverageId), {
        body: JSON.stringify(input),
        method: 'PUT',
      }),
    {
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(errorMessages.coverage?.[error.errorType] || error.message)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['coverage-list'], {
          refetchType: 'all',
        })
        queryClient.invalidateQueries(['coverage-detail', coverageId])
        route.push(`${COVERAGE_PATH}/${coverageId}${DETAIL_PATH}`)
      },
    },
  )

  const handleOnSubmit: SubmitHandler<CoverageUpdateData> = (
    data,
    event,
  ): void => {
    coverageUpdateInput.data = data
    // eslint-disable-next-line no-alert
    if (confirm('변경된 사항을 적용하시겠습니까?')) {
      mutation.mutate(coverageUpdateInput.input)
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
    formData: coverageUpdateInput.data,
    isLoaded: coverageUpdateInput.isLoaded,
    onCancel: handleOnCancel,
    onSubmit: handleOnSubmit,
  }
}

export default useCoverageModify
