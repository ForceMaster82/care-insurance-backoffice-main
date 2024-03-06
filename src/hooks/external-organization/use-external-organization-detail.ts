import {useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import ExternalOrganizationResource from '~models/dto/external-organization/Resource'
import {ResourceHook} from '~types'
import {IExternalOrganizationDetail, ServerErrorFormat} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalOrganizationDetail: ResourceHook<
  ExternalOrganizationResource
> = () => {
  const route = useRouter()
  const organizationId = (route.query?.id as string | undefined) || ''

  const {data} = useQuery<
    IResponse<IExternalOrganizationDetail>,
    ServerErrorFormat
  >(
    ['external-organization-detail', organizationId],
    () =>
      fetcher<IExternalOrganizationDetail>(
        apiPath.externalCaregivingOrganization.identified.common(
          organizationId,
        ),
      ),
    {
      enabled: Boolean(organizationId),
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(
            errorMessages.externalOrganization?.[error.errorType] ||
              error.message,
          )
      },
    },
  )
  if (!data) {
    return null
  }

  const resource = new ExternalOrganizationResource(data.body)
  return resource
}

export default useExternalOrganizationDetail
