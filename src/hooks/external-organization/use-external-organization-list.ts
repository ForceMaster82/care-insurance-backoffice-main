import {useQuery} from '@tanstack/react-query'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {DEFAULT_PAGE_SIZE} from '~constants/pagination'
import ExternalOrganizationListResource from '~models/dto/external-organization/ListResource'
import {ResourceHook} from '~types'
import {
  ExternalOrganizationType,
  IExternalOrganization,
  IPaginationResponse,
  ServerErrorFormat,
} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalOrganizationList: ResourceHook<
  ExternalOrganizationListResource,
  {externalOrganizationType?: ExternalOrganizationType}
> = ({...params}) => {
  const {
    pageNumber = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    query,
    externalOrganizationType,
  } = params

  const {data} = useQuery<
    IResponse<IPaginationResponse<IExternalOrganization>>,
    ServerErrorFormat
  >(
    ['external-organization-list', query, pageNumber, pageSize],
    () =>
      fetcher<IPaginationResponse<IExternalOrganization>>(
        apiPath.externalCaregivingOrganization.global({
          'external-caregiving-organization-type': externalOrganizationType,
          'page-number': pageNumber,
          'page-size': pageSize,
          query,
        }),
      ),
    {
      keepPreviousData: true,
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

  const resource = new ExternalOrganizationListResource(data.body)
  return resource
}

export default useExternalOrganizationList
