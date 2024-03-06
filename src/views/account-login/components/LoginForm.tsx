import {Box, Button, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useEffect, useRef} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import BasicInput from '~components/Input/BasicInput'
import {loginConstraints} from '~constraints/login'
import {ServerErrorFormat} from '~types/dto'
import {LoginData} from '~types/form'

interface ILoginFormProps {
  formData: LoginData
  onSubmit: SubmitHandler<LoginData>
  serverError?: ServerErrorFormat
}

const LoginForm = ({
  onSubmit,
  formData,
  serverError,
}: ILoginFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)

  const {formState, handleSubmit, control, setFocus} = useForm<LoginData>({
    defaultValues: formData,
    mode: 'onChange',
  })
  const {isValid} = formState

  const handleOnClickSubmitButton = (): void => {
    ref.current?.requestSubmit()
  }

  useEffect(() => {
    switch (serverError?.errorType) {
      case 'EMAIL_NOT_SUPPLIED':
      case 'EMAIL_VALIDATION_POLICY_VIOLATION':
      case 'NOT_REGISTERED_EMAIL_ADDRESS':
        setFocus('email')
        break
      case 'WRONG_CREDENTIAL':
      case 'PASSWORD_VALIDATION_POLICY_VIOLATION':
        setFocus('password')
        break
    }
  }, [serverError, setFocus])

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <Box gap="lg" py="lg">
        <Box gap="sm">
          <Box gap="xs">
            <Typography variant="body1">아이디(이메일)</Typography>
            <BasicInput<LoginData>
              constraints={loginConstraints}
              control={control}
              fieldName="email"
              onEnterSubmit={handleOnClickSubmitButton}
              placeholder="아이디(이메일)을 입력해 주세요"
              size="lg"
            />
          </Box>
          <Box gap="xs">
            <Typography variant="body1">비밀번호</Typography>
            <BasicInput<LoginData>
              constraints={loginConstraints}
              control={control}
              fieldName="password"
              onEnterSubmit={handleOnClickSubmitButton}
              placeholder="비밀번호를 입력해 주세요"
              size="lg"
              type="password"
            />
          </Box>
        </Box>
        <Button
          color="primary"
          disabled={!isValid}
          onClick={handleOnClickSubmitButton}
          size="lg"
        >
          로그인
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
