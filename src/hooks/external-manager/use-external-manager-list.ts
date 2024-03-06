import {useQuery} from '@tanstack/react-query'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {DEFAULT_PAGE_SIZE} from '~constants/pagination'
import ExternalManagerListResource from '~models/dto/\bexternal-manager/ListResource'
import {ResourceHook} from '~types'
import {
  IExternalManager,
  IPaginationResponse,
  ServerErrorFormat,
} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalManagerList: ResourceHook<ExternalManagerListResource> = ({
  ...params
}) => {
  const {
    pageNumber = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    query,
    id: organizationId,
  } = params

  const {data} = useQuery<
    IResponse<IPaginationResponse<IExternalManager>>,
    ServerErrorFormat
  >(
    ['external-manager-list', query, pageNumber, pageSize, organizationId],
    () =>
      fetcher<IPaginationResponse<IExternalManager>>(
        apiPath.externalManager.global({
          'external-caregiving-organization-id': organizationId,
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
            errorMessages.externalManager?.[error.errorType] || error.message,
          )
      },
    },
  )
  if (!data) {
    return null
  }

  const resource = new ExternalManagerListResource(data.body)
  return resource
}

export default useExternalManagerList
