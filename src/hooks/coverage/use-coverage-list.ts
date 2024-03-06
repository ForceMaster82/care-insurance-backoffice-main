import {useQuery} from '@tanstack/react-query'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {COVERAGE_PAGE_SIZE} from '~constants/pagination'
import CoverageListResource from '~models/dto/coverage/ListResource'
import {ResourceHook} from '~types'
import {ICoverage, IPaginationResponse, ServerErrorFormat} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useCoverageList: ResourceHook<CoverageListResource> = ({...params}) => {
  const {pageNumber = 1, pageSize = COVERAGE_PAGE_SIZE, query} = params
  const {data} = useQuery<
    IResponse<IPaginationResponse<ICoverage>>,
    ServerErrorFormat
  >(
    ['coverage-list', query, pageNumber, pageSize],
    () =>
      fetcher<IPaginationResponse<ICoverage>>(
        apiPath.coverage.global({
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
          alert(errorMessages.coverage?.[error.errorType] || error.message)
      },
    },
  )
  if (!data) {
    return null
  }

  const resource = new CoverageListResource(data.body)
  return resource
}

export default useCoverageList
