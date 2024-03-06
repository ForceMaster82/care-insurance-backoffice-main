import {useQuery} from '@tanstack/react-query'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {DEFAULT_PAGE_SIZE} from '~constants/pagination'
import InternalManagerListResource from '~models/dto/internal-manager/ListResource'
import {ResourceHook} from '~types'
import {
  IInternalManager,
  IPaginationResponse,
  ServerErrorFormat,
} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useInternalManagerList: ResourceHook<InternalManagerListResource> = ({
  ...params
}) => {
  const {pageNumber = 1, pageSize = DEFAULT_PAGE_SIZE, query} = params

  const {data} = useQuery<
    IResponse<IPaginationResponse<IInternalManager>>,
    ServerErrorFormat
  >(
    ['internal-manager-list', query, pageNumber, pageSize],
    () =>
      fetcher<IPaginationResponse<IInternalManager>>(
        apiPath.internalManager.global({
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
            errorMessages.internalManager?.[error.errorType] || error.message,
          )
      },
    },
  )
  if (!data) {
    return null
  }

  const resource = new InternalManagerListResource(data.body)
  return resource
}

export default useInternalManagerList
