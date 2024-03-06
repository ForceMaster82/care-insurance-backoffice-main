import {Box, Button, Input, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useEffect, useRef} from 'react'
import {SubmitHandler, useForm, useWatch} from 'react-hook-form'
import {VALID_INPUT_MESSAGE} from '~constants/texts'
import {passwordUpdateConstraints} from '~constraints/password'
import {IPasswordUpdateData} from '~types/form'
import {useCheckValidatedField} from '~utils/form'
interface IPasswordChangeFormProps {
  onCancel?: () => void
  onSubmit: SubmitHandler<IPasswordUpdateData>
  passwordUpdateInput: IPasswordUpdateData
}

const PasswordChangeForm = ({
  onCancel,
  onSubmit,
  passwordUpdateInput,
}: IPasswordChangeFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)
  const {
    register,
    formState: {errors, isValid},
    handleSubmit,
    getValues,
    trigger,
    control,
  } = useForm<IPasswordUpdateData>({
    defaultValues: passwordUpdateInput,
    mode: 'onChange',
  })
  const {checkIsValidatedField} =
    useCheckValidatedField<IPasswordUpdateData>(control)

  const newPassword = useWatch({control, name: 'newPassword'})

  const handleOnClickSubmitButton = (): void => {
    ref.current?.requestSubmit()
  }

  useEffect(() => {
    if (newPassword) {
      trigger('newPasswordCheck')
    }
  }, [newPassword, trigger])

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <Box gap="lg" py="lg">
        <Box gap="sm">
          <Box gap="xs">
            <Typography variant="body1">기존 비밀번호</Typography>
            <Input
              errors={errors.currentPassword?.message}
              hint={
                checkIsValidatedField('currentPassword')
                  ? VALID_INPUT_MESSAGE
                  : undefined
              }
              isValidated={checkIsValidatedField('currentPassword')}
              register={register(
                'currentPassword',
                passwordUpdateConstraints.currentPassword,
              )}
              size="lg"
              type="password"
            />
          </Box>
          <Box gap="xs">
            <Typography variant="body1">신규 비밀번호</Typography>
            <Input
              errors={errors.newPassword?.message}
              hint={
                checkIsValidatedField('newPassword')
                  ? VALID_INPUT_MESSAGE
                  : '8~20자리, 영문 대/소문자, 숫자, 특수문자 조합'
              }
              isValidated={checkIsValidatedField('newPassword')}
              register={register(
                'newPassword',
                passwordUpdateConstraints.newPassword,
              )}
              size="lg"
              type="password"
            />
          </Box>
          <Box gap="xs">
            <Typography variant="body1">비밀번호 확인</Typography>
            <Input
              errors={errors.newPasswordCheck?.message}
              hint={
                checkIsValidatedField('newPasswordCheck')
                  ? VALID_INPUT_MESSAGE
                  : '8~20자리, 영문 대/소문자, 숫자, 특수문자 조합'
              }
              isValidated={checkIsValidatedField('newPasswordCheck')}
              register={register('newPasswordCheck', {
                ...passwordUpdateConstraints.newPasswordCheck,
                validate: (value) => {
                  if (value !== getValues('newPassword')) {
                    return '비밀번호가 맞지 않습니다. 다시 확인해 주세요.'
                  }
                },
              })}
              size="lg"
              type="password"
            />
          </Box>
        </Box>
        <Box flexDirection="row" gap="xs">
          <Button
            color="fontSecondary"
            flex={1}
            onClick={onCancel}
            size="lg"
            variant="tertiary"
          >
            취소
          </Button>
          <Button
            color="primary"
            disabled={!isValid}
            flex={1}
            onClick={handleOnClickSubmitButton}
            size="lg"
            variant="primary"
          >
            완료
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default PasswordChangeForm
