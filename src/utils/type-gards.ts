import {
  GLOBAL_SERVER_ERROR_TYPES,
  LOCAL_SERVER_ERROR_TYPES,
} from '../constants/errors'

function generateUnionTypeChecker<UnionType extends string>(
  ...values: UnionType[]
) {
  return function (value: unknown): UnionType | false {
    if (typeof value !== 'string') {
      return false
    }
    return values.includes(value as UnionType) ? (value as UnionType) : false
  }
}

export const isStringTypeGard = (value: any): value is string => {
  return typeof value === 'string'
}

export const isGlobalServerErrorType = generateUnionTypeChecker(
  ...GLOBAL_SERVER_ERROR_TYPES,
)

export const isLocalServerErrorType = generateUnionTypeChecker(
  ...LOCAL_SERVER_ERROR_TYPES,
)
