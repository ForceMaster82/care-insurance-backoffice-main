import {Constraints} from '@caredoc/utils-web'
import {regexPhoneNumberWithHyphen} from '~constants/regex'
import {ExternalOrganizationData} from '~types/form'

export const organizationConstraints: Constraints<ExternalOrganizationData> = {
  address: {
    required: {message: '주소를 입력해 주세요', value: true},
  },
  contractName: {
    required: {message: '담당자명을 입력해 주세요', value: true},
  },
  name: {
    required: {message: '업체명을 입력해 주세요', value: true},
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
