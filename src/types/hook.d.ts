import {ErrorResponse} from './fetch'

export type APIReturn<K> = {
  data?: K
  loading: boolean
}

export type CreateAPIReturn<T> = APIReturn<T> & {
  create: () => Promise<void>
}

export type UpdateAPIReturn<T> = APIReturn<T> & {
  update: () => Promise<void>
}

export type FetchAPIReturn<T> = APIReturn<T> & {
  refetch: () => Promise<void>
}

export type GetAPIReturn<T> = APIReturn<T> & {
  refetch: () => Promise<void>
}

export type DeleteAPIReturn<T> = APIReturn<T> & {
  delete: (id: string) => Promise<void>
}

export type APIProps<T = Record<string, unknown>> = {
  headers?: Record<string, unknown>
  onFail?: (error?: ErrorResponse) => void
  onSuccess?: (data: T, location: string, link: string) => void
}

export type UseCreateAPI = <T = unknown>(
  path: string,
  body: T,
  options?: APIProps<T>,
) => CreateAPIReturn<T>

export type UseUpdateAPI = <T = unknown>(
  path: string,
  body: T,
  options?: APIProps<T>,
) => UpdateAPIReturn<T>

export type UseGetAPI = <T = unknown>(
  path: string,
  params?: Record<string, any>,
  options?: APIProps<T>,
) => GetAPIReturn<T>

export type UseDeleteAPI = <T = unknown>(
  path: string,
  options?: APIProps,
) => DeleteAPIReturn<T>
