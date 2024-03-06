import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {SubmitHandler} from 'react-hook-form'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {EXTERNAL_ORGANIZATION_PATH} from '~constants/route-paths'
import ExternalOrganizationInput from '~models/dto/external-organization/Input'
import {IInputHook} from '~types'
import {
  IBusinessLicenseUpdate,
  IExternalOrganizationUpdate,
  ServerErrorFormat,
} from '~types/dto'
import {ExternalOrganizationData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalOrganizationRegister = (
  businessLicenseFile: File | null,
  uploadFileMutation: UseMutationResult<
    IResponse<void>,
    ServerErrorFormat<unknown>,
    IBusinessLicenseUpdate,
    unknown
  >,
): IInputHook<ExternalOrganizationData> => {
  const route = useRouter()
  const queryClient = useQueryClient()
  const organizationCreateInput = new ExternalOrganizationInput()

  const submitMutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IExternalOrganizationUpdate
  >(
    (input) =>
      fetcher(apiPath.externalCaregivingOrganization.global(), {
        body: JSON.stringify(input),
        method: 'POST',
      }),
    {
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(
            errorMessages.externalOrganization?.[error.errorType] ||
              error.message,
          )
      },
      onSuccess: (data) => {
        if (businessLicenseFile) {
          const location = data.headers.get('Location') || ''
          const [, organizationId] = location.split(
            `${apiPath.externalCaregivingOrganization.global()}/`,
          )
          uploadFileMutation.mutate({businessLicenseFile, organizationId})
        }
        queryClient.invalidateQueries(['external-organization-list'], {
          refetchType: 'all',
        })
        route.push(EXTERNAL_ORGANIZATION_PATH)
      },
    },
  )

  const handleOnSubmit: SubmitHandler<ExternalOrganizationData> = (
    data,
    event,
  ): void => {
    organizationCreateInput.data = data
    submitMutation.mutate(organizationCreateInput.input)
    event?.preventDefault()
  }

  const handleOnCancel = (): void => {
    route.back()
  }

  return {
    formData: organizationCreateInput.data,
    onCancel: handleOnCancel,
    onSubmit: handleOnSubmit,
  }
}

export default useExternalOrganizationRegister
