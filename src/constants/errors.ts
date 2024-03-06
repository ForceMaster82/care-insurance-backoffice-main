import {ServerErrorType} from '~types/dto'

type ErrorCategory =
  | 'login'
  | 'passwordChange'
  | 'externalOrganization'
  | 'externalManager'
  | 'internalManager'
  | 'coverage'

const errorMessages: Partial<
  Record<ErrorCategory, Partial<Record<ServerErrorType, string>>>
> = {
  coverage: {
    ACCIDENT_YEAR_ALREADY_REGISTERED: '중복 기준연도 항목이 존재합니다.',
    NAME_ALREADY_REGISTERED: '중복 가입담보명이 존재합니다.',
    REQUIRED_ITEMS_NOT_SUPPLIED: '입력되지 않은 필수 입력 항목이 있습니다.',
  },
  externalManager: {
    ALREADY_EXISTS_EXTERNAL_CAREGIVING_MANGER_EMAIL:
      '이미 존재하는 아이디(이메일)입니다.',
  },
  externalOrganization: {},
  internalManager: {
    ALREADY_EXISTS_USER_EMAIL_ADDRESS: '이미 존재하는 아이디(이메일)입니다.',
  },
  login: {
    EMAIL_VALIDATION_POLICY_VIOLATION:
      '아이디는 영문 대/소문자, 숫자, 특수문자를 조합하여 입력해야 합니다.',
    NOT_REGISTERED_EMAIL_ADDRESS: '존재하지 않는 아이디입니다',
    USER_SUSPENDED: '사용할 수 없는 계정입니다.',
    WRONG_CREDENTIAL:
      '잘못된 로그인 정보입니다. 아이디 또는 비밀번호를 확인해 주세요',
  },
  passwordChange: {
    WRONG_CREDENTIAL: '기존 비밀번호가 일치하지 않습니다.',
  },
}

export const LOCAL_SERVER_ERROR_TYPES = [
  'EMAIL_NOT_SUPPLIED',
  'EMAIL_VALIDATION_POLICY_VIOLATION',
  'PASSWORD_VALIDATION_POLICY_VIOLATION',
  'NOT_REGISTERED_EMAIL_ADDRESS',
  'PASSWORD_NOT_SUPPLIED',
  'WRONG_CREDENTIAL',
  'ILLEGAL_PAGE_REQUEST',
  'CREDENTIAL_NOT_SUPPLIED',
  'ILLEGAL_TOKEN_SUPPLIED',
  'NOT_AUTHORIZED',
  'TOKEN_EXPIRED',
  'USER_SUSPENDED',
  'REQUIRED_ITEMS_NOT_SUPPLIED',
  'DUPLICATED_ACCIDENT_YEAR',
  'ACCIDENT_YEAR_ALREADY_REGISTERED',
  'NAME_ALREADY_REGISTERED',
  'ALREADY_EXISTS_USER_EMAIL_ADDRESS',
  'ALREADY_EXISTS_EXTERNAL_CAREGIVING_MANGER_EMAIL',
] as const

export const GLOBAL_SERVER_ERROR_TYPES = [
  'REFRESH_TOKEN_ALREADY_USED',
  'PASSWORD_CHANGE_REQUIRED',
] as const

export default errorMessages
