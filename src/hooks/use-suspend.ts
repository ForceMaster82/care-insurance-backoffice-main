import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useState} from 'react'
import {isLocalServerErrorType} from '../utils/type-gards'
import {apiPath} from '~constants/api-paths'
import errorMessages from '~constants/errors'
import {IManagerSuspendUpdate, ServerErrorFormat} from '~types/dto'
import {fetcher, IResponse} from '~utils/fetch'

export interface IUseSuspendReturnType {
  getIsChecked: (id: string) => boolean
  isDisabledUpdate: boolean
  onCheckSuspend: (id: string, suspended: boolean) => void
  onClickUpdateSuspend: () => void
}

const useSuspend = (
  managerType: 'external' | 'internal',
): IUseSuspendReturnType => {
  const queryClient = useQueryClient()

  const [suspendTargetMap, setSuspendTargetMap] = useState<
    Map<string, boolean>
  >(new Map())

  const suspendApiPath =
    managerType === 'external'
      ? apiPath.externalManager.global()
      : apiPath.internalManager.global()

  const mutation = useMutation<
    IResponse<void>,
    ServerErrorFormat,
    IManagerSuspendUpdate[]
  >(
    (input) =>
      fetcher(suspendApiPath, {body: JSON.stringify(input), method: 'PATCH'}),
    {
      onError: (error) => {
        isLocalServerErrorType(error.errorType) &&
          // eslint-disable-next-line no-alert
          alert(
            errorMessages[`${managerType}Manager`]?.[error.errorType] ||
              error.message,
          )
      },
    },
  )

  const getIsChecked = (id: string): boolean => suspendTargetMap.has(id)

  const handleOnCheckSuspend = (id: string, suspended: boolean): void => {
    const setMap = (key: string, value: boolean): void => {
      setSuspendTargetMap((prev) => new Map(prev).set(key, value))
    }

    const deleteMap = (key: string): void => {
      setSuspendTargetMap((prev) => {
        const newState = new Map(prev)
        newState.delete(key)
        return newState
      })
    }

    if (getIsChecked(id)) {
      deleteMap(id)
    } else {
      setMap(id, !suspended)
    }
  }

  const suspendTarget: IManagerSuspendUpdate[] = [...suspendTargetMap].map(
    ([id, suspended]) => ({id, suspended}),
  )
  /** api 연결 */
  const handleOnClickUpdateSuspend = (): void => {
    /** 업데이트 */
    mutation.mutate(suspendTarget, {
      onSuccess: () => {
        const clearMap = (): void => {
          setSuspendTargetMap((prev) => {
            const newState = new Map(prev)
            newState.clear()
            return newState
          })
        }
        clearMap()
        queryClient.invalidateQueries([`${managerType}-manager-list`])
        // eslint-disable-next-line no-alert
        alert('사용여부 변경 처리가 완료되었습니다.')
      },
    })
  }

  return {
    getIsChecked,
    isDisabledUpdate: suspendTargetMap.size === 0,
    onCheckSuspend: handleOnCheckSuspend,
    onClickUpdateSuspend: handleOnClickUpdateSuspend,
  }
}

export default useSuspend
