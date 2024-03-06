import {Constraints} from '@caredoc/utils-web'
import {emailRegex, insurancePasswordRegex} from '~constants/regex'
import {LoginData} from '~types/form'

export const loginConstraints: Constraints<LoginData> = {
  email: {
    pattern: {
      message: '올바른 이메일 형식을 입력해 주세요',
      value: emailRegex,
    },
    required: {message: '아이디(이메일)을 입력해 주세요', value: true},
  },
  password: {
    pattern: {
      message:
        '비밀번호는 8~20자리, 영문 대/소문자, 숫자, 특수문자 !@#$%^&*-_ 조합입니다.',
      value: insurancePasswordRegex,
    },
    required: {message: '비밀번호를 입력해 주세요', value: true},
  },
}
