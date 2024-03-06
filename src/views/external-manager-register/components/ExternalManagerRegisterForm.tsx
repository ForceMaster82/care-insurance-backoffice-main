import {Box, ComboBox, type IComboBoxItemData} from '@caredoc/ui-web'
import React, {ReactElement, useRef} from 'react'
import {SubmitHandler, useController, useForm} from 'react-hook-form'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'
import CardContainer from '~components/Card/CardContainer'
import CardItem from '~components/Card/CardItem'
import CardRow from '~components/Card/CardRow'
import FormContainer from '~components/Form/FormContainer'
import BasicInput from '~components/Input/BasicInput'
import FormattingInput from '~components/Input/FormattingInput'
import {externalManagerConstraints} from '~constraints/external-manager'
import {ExternalManagerCreateData} from '~types/form'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'

interface IExternalManagerRegisterFormProps {
  externalOrganizationListOptions: IComboBoxItemData<string>[]
  formData: ExternalManagerCreateData
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalManagerCreateData>
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

const ExternalManagerRegisterForm = ({
  onCancel,
  onSubmit,
  formData,
  externalOrganizationListOptions,
}: IExternalManagerRegisterFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)

  const {
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<ExternalManagerCreateData>({
    defaultValues: formData,
    mode: 'all',
  })

  const {field: externalCaregivingOrganizationIdField} = useController({
    control,
    name: 'externalCaregivingOrganizationId',
    rules: externalManagerConstraints.externalCaregivingOrganizationId,
  })

  const handleOnClickSubmitButton = (): void => {
    ref.current?.requestSubmit()
  }

  return (
    <Box gap="sm">
      <FormContainer onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <CardContainer>
          <CardRow>
            <CardItem required title="제휴사">
              <ComboBox
                items={externalOrganizationListOptions}
                onSelect={(value): void => {
                  externalCaregivingOrganizationIdField.onChange(value)
                }}
                value={externalCaregivingOrganizationIdField.value}
              />
            </CardItem>
            <CardItem required title="아이디(이메일)">
              <BasicInput<ExternalManagerCreateData>
                constraints={externalManagerConstraints}
                control={control}
                fieldName="email"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="담당자명">
              <BasicInput<ExternalManagerCreateData>
                constraints={externalManagerConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
            <CardItem required title="연락처">
              <FormattingInput<ExternalManagerCreateData>
                constraints={externalManagerConstraints}
                control={control}
                fieldName="phoneNumber"
                formatter={formatPhoneNumberWithHyphen}
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem title="메모">
              <BasicInput<ExternalManagerCreateData>
                constraints={externalManagerConstraints}
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

export default ExternalManagerRegisterForm
