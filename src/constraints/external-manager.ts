import {Constraints} from '@caredoc/utils-web'
import {emailRegex, regexPhoneNumberWithHyphen} from '~constants/regex'
import {ExternalManagerCreateData} from '~types/form'

export const externalManagerConstraints: Constraints<ExternalManagerCreateData> =
  {
    email: {
      pattern: {
        message: '올바른 이메일 형식을 입력해 주세요',
        value: emailRegex,
      },
      required: {message: '아이디(이메일)을 입력해 주세요', value: true},
    },
    externalCaregivingOrganizationId: {
      required: {message: '제휴사를 선택해 주세요', value: true},
    },
    name: {
      required: {message: '담당자명을 입력해 주세요', value: true},
    },
    phoneNumber: {
      required: {message: '연락처를 입력해 주세요', value: true},
      validate: {
        value: (value) => {
          // eslint-disable-next-line no-magic-numbers
          if (value.length < 11 || value.length > 13) {
            return '9~11자리를 입력해 주세요 '
          }
          if (!regexPhoneNumberWithHyphen.test(value)) {
            return '올바른 형식으로 입력해 주세요'
          }
        },
      },
    },
  }
