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
import {DETAIL_PATH, EXTERNAL_ORGANIZATION_PATH} from '~constants/route-paths'
import ExternalOrganizationInput from '~models/dto/external-organization/Input'
import ExternalOrganizationResource from '~models/dto/external-organization/Resource'
import {IInputHook} from '~types'
import {
  IBusinessLicenseUpdate,
  IExternalOrganizationUpdate,
  ServerErrorFormat,
} from '~types/dto'
import {ExternalOrganizationData} from '~types/form'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalOrganizationModify = (
  detailResource: ExternalOrganizationResource | null,
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
  const externalOrganizationInput = new ExternalOrganizationInput(
    detailResource,
  )
  const organizationId = detailResource?.id || ''
  const mutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IExternalOrganizationUpdate
  >(
    (input) =>
      fetcher(
        apiPath.externalCaregivingOrganization.identified.common(
          organizationId || '',
        ),
        {body: JSON.stringify(input), method: 'PUT'},
      ),
    {
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(
            errorMessages.externalOrganization?.[error.errorType] ||
              error.message,
          )
      },
      onSuccess: () => {
        if (businessLicenseFile) {
          uploadFileMutation.mutate(
            {businessLicenseFile, organizationId},
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['external-organization-list'], {
                  refetchType: 'all',
                })
                queryClient.invalidateQueries([organizationId])
                route.push(
                  `${EXTERNAL_ORGANIZATION_PATH}/${organizationId}${DETAIL_PATH}`,
                )
              },
            },
          )
        } else {
          queryClient.invalidateQueries(['external-organization-list'], {
            refetchType: 'all',
          })
          queryClient.invalidateQueries([organizationId])
          route.push(
            `${EXTERNAL_ORGANIZATION_PATH}/${organizationId}${DETAIL_PATH}`,
          )
        }
      },
    },
  )

  const handleOnSubmit: SubmitHandler<ExternalOrganizationData> = (
    data,
    event,
  ): void => {
    if (!organizationId) {
      // eslint-disable-next-line no-alert
      alert('협회 id를 읽을 수 없습니다')
    }

    externalOrganizationInput.data = data
    // eslint-disable-next-line no-alert
    if (confirm('변경된 사항을 적용하시겠습니까?')) {
      mutation.mutate(externalOrganizationInput.input)
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
    formData: externalOrganizationInput.data,
    isLoaded: externalOrganizationInput.isLoaded,
    onCancel: handleOnCancel,
    onSubmit: handleOnSubmit,
  }
}

export default useExternalOrganizationModify
