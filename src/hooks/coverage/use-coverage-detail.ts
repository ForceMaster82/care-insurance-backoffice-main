import {useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import CoverageResource from '~models/dto/coverage/Resource'
import {ResourceHook} from '~types'
import {ICoverageDetail, ServerErrorFormat} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useCoverageDetail: ResourceHook<CoverageResource> = () => {
  const route = useRouter()
  const coverageId = (route.query?.id as string | undefined) || ''

  const {data} = useQuery<IResponse<ICoverageDetail>, ServerErrorFormat>(
    ['coverage-detail', coverageId],
    () =>
      fetcher<ICoverageDetail>(apiPath.coverage.identified.common(coverageId)),
    {
      enabled: Boolean(coverageId),
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
  const resource = new CoverageResource(data.body)
  return resource
}

export default useCoverageDetail
