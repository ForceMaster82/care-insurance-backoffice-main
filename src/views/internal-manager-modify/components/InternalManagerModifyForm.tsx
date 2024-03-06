import {Box, Input, Radio, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useRef} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import FormContainer from '~components/Form/FormContainer'
import BasicInput from '~components/Input/BasicInput'
import FormattingInput from '~components/Input/FormattingInput'
import {internalManagerConstraints} from '~constraints/internal-manager'
import {InternalManagerUpdateData} from '~types/form'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'

interface IInternalManagerModifyFormProps {
  formData: InternalManagerUpdateData
  onCancel?: () => void
  onSubmit: SubmitHandler<InternalManagerUpdateData>
}
interface IFormButtonSectionProps {
  isValid: boolean
  onCancel?: () => void
  onSubmit: () => void
}

const FormButtonSection = ({
  onCancel,
  onSubmit,
  isValid,
}: IFormButtonSectionProps): ReactElement => {
  return (
    <Box
      alignItems="center"
      flexDirection="row"
      gap="xs"
      justifyContent="flex-end"
    >
      <CancelButton onClick={onCancel}>취소</CancelButton>
      <SubmitButton disabled={!isValid} onClick={onSubmit}>
        완료
      </SubmitButton>
    </Box>
  )
}

const InternalManagerModifyForm = ({
  onCancel,
  onSubmit,
  formData,
}: IInternalManagerModifyFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: {isValid},
  } = useForm<InternalManagerUpdateData>({
    defaultValues: formData,
    mode: 'all',
  })

  const handleOnClickSubmitButton = (): void => {
    ref.current?.requestSubmit()
  }

  return (
    <Box gap="sm">
      <FormContainer onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <CardContainer>
          <CardRow>
            <CardItem required title="아이디(이메일)">
              <BasicInput<InternalManagerUpdateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="email"
              />
            </CardItem>
            <CardItem required title="닉네임">
              <BasicInput<InternalManagerUpdateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="nickname"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="담당자명">
              <BasicInput<InternalManagerUpdateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
            <CardItem required title="연락처">
              <FormattingInput<InternalManagerUpdateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="phoneNumber"
                formatter={formatPhoneNumberWithHyphen}
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="주요업무">
              <BasicInput<InternalManagerUpdateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="role"
              />
            </CardItem>
            <CardItem title="최근 로그일 일시">
              <Input disabled value={formData.lastLoginDateTime} />
            </CardItem>
          </CardRow>
        </CardContainer>
        <CardContainer>
          <CardRow>
            <CardItem title="사용여부">
              <Box alignItems="flex-start" gap="xxs">
                <Radio
                  color="primary"
                  onClick={(): void => setValue('suspended', false)}
                  value={!watch('suspended')}
                >
                  <Typography variant="body3">사용</Typography>
                </Radio>
                <Radio
                  color="primary"
                  onClick={(): void => setValue('suspended', true)}
                  value={watch('suspended')}
                >
                  <Typography variant="body3">사용안함</Typography>
                </Radio>
              </Box>
            </CardItem>
            <CardItem title="메모">
              <BasicInput<InternalManagerUpdateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="remarks"
                isTextArea
              />
            </CardItem>
          </CardRow>
        </CardContainer>
      </FormContainer>
      <FormButtonSection
        isValid={isValid}
        onCancel={onCancel}
        onSubmit={handleOnClickSubmitButton}
      />
    </Box>
  )
}

export default InternalManagerModifyForm
