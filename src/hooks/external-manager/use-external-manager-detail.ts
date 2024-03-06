import {useQuery} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {isLocalServerErrorType} from '../../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {ExternalManagerResource} from '~models/dto/\bexternal-manager/Resource'
import {ResourceHook} from '~types'
import {IExternalManagerDetail, ServerErrorFormat} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

const useExternalManagerDetail: ResourceHook<ExternalManagerResource> = () => {
  const route = useRouter()
  const managerId = (route.query?.id as string | undefined) || ''

  const {data} = useQuery<IResponse<IExternalManagerDetail>, ServerErrorFormat>(
    ['external-manager-detail', managerId],
    () =>
      fetcher<IExternalManagerDetail>(
        apiPath.externalManager.identified.common(managerId),
      ),
    {
      enabled: Boolean(managerId),
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

  const resource = new ExternalManagerResource(data.body)
  return resource
}

export default useExternalManagerDetail
