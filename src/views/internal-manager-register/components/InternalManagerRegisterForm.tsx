import {Box} from '@caredoc/ui-web'
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
import {IInternalManagerCreate} from '~types/dto'
import {InternalManagerCreateData} from '~types/form'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'

interface IInternalManagerRegisterFormProps {
  formData: IInternalManagerCreate
  onCancel?: () => void
  onSubmit: SubmitHandler<IInternalManagerCreate>
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
        등록
      </SubmitButton>
    </Box>
  )
}

const InternalManagerRegisterForm = ({
  onCancel,
  onSubmit,
  formData,
}: IInternalManagerRegisterFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)

  const {
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<InternalManagerCreateData>({
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
              <BasicInput<InternalManagerCreateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="email"
              />
            </CardItem>
            <CardItem required title="닉네임">
              <BasicInput<InternalManagerCreateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="nickname"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="담당자명">
              <BasicInput<InternalManagerCreateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
            <CardItem required title="연락처">
              <FormattingInput<InternalManagerCreateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="phoneNumber"
                formatter={formatPhoneNumberWithHyphen}
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="주요업무">
              <BasicInput<InternalManagerCreateData>
                constraints={internalManagerConstraints}
                control={control}
                fieldName="role"
              />
            </CardItem>
            <CardItem title="메모">
              <BasicInput<InternalManagerCreateData>
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

export default InternalManagerRegisterForm
