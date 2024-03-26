import {Constraints} from '@caredoc/utils-web'
import {CoverageCreateData, CoverageUpdateData} from '~types/form'

export const coverageConstraints: Constraints<CoverageCreateData> = {
  renewalType: {
    required: {message: '담보유형을 선택해 주세요', value: true},
  },
  dailyCharge: {
    required: {message: '일일 간병비를 입력해 주세요', value: true},
  },
  name: {
    required: {message: '가입담보명을 입력해 주세요', value: true},
  },
  targetSubscriptionYear: {
    required: {message: '기준연도를 입력해 주세요', value: true},
  },
}

export const coverageUpdateConstraints: Constraints<CoverageUpdateData> = {
  name: {
    required: {message: '가입담보명을 입력해 주세요', value: true},
  },
}
