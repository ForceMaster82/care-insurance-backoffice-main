import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {COVERAGE_PATH} from '~constants/route-paths'
import CoverageCreateInput from '~models/dto/coverage/CreateInput'
import {IInputHook} from '~types'
import {ICoverageCreate, ServerErrorFormat} from '~types/dto'
import {CoverageCreateData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useCoverageRegister = (): IInputHook<CoverageCreateData> => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const coverageCreateInput = new CoverageCreateInput()
  const submitMutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    ICoverageCreate
  >(
    (input) =>
      fetcher(apiPath.coverage.global(), {
        body: JSON.stringify(input),
        method: 'POST',
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
        route.push(COVERAGE_PATH)
      },
    },
  )

  const handleOnSubmit: SubmitHandler<CoverageCreateData> = (
    data,
    event,
  ): void => {
    coverageCreateInput.data = data
    submitMutation.mutate(coverageCreateInput.input)
    event?.preventDefault()
  }

  const handleOnCancel = (): void => {
    route.back()
  }

  return {
    formData: coverageCreateInput.data,
    onCancel: handleOnCancel,
    onSubmit: handleOnSubmit,
  }
}

export default useCoverageRegister
