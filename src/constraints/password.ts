import {Constraints} from '@caredoc/utils-web'
import {insurancePasswordRegex} from '~constants/regex'
import {IPasswordUpdateData} from '~types/form'
export const passwordUpdateConstraints: Constraints<IPasswordUpdateData> = {
  currentPassword: {
    pattern: {
      message:
        '비밀번호는 8~20자리, 영문 대/소문자, 숫자, 특수문자 !@#$%^&*-_ 조합입니다.',
      value: insurancePasswordRegex,
    },
    required: {message: '기존 비밀번호를 입력해 주세요', value: true},
  },
  newPassword: {
    pattern: {
      message:
        '비밀번호는 8~20자리, 영문 대/소문자, 숫자, 특수문자 !@#$%^&*-_ 조합으로 생성해 주세요.',
      value: insurancePasswordRegex,
    },
    required: {message: '신규 비밀번호를 입력해 주세요', value: true},
  },
  newPasswordCheck: {
    required: {message: '신규 비밀번호를 입력해 주세요', value: true},
  },
}
