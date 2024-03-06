import {useQuery} from '@tanstack/react-query'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import InternalManagerResource from '~models/dto/internal-manager/Resource'
import {ResourceHook} from '~types'
import {IInternalManagerDetail, ServerErrorFormat} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useInternalManagerDetail: ResourceHook<InternalManagerResource> = (
  props,
) => {
  const managerId = props?.id || ''

  const {data} = useQuery<IResponse<IInternalManagerDetail>, ServerErrorFormat>(
    ['internal-manager-detail', managerId],
    () =>
      fetcher<IInternalManagerDetail>(
        apiPath.internalManager.identified.common(managerId),
      ),
    {
      enabled: Boolean(managerId),
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

  const resource = new InternalManagerResource(data.body)
  return resource
}

export default useInternalManagerDetail
