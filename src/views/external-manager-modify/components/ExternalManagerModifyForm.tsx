import {
  Box,
  ComboBox,
  type IComboBoxItemData,
  Input,
  Radio,
  Typography,
} from '@caredoc/ui-web'
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
import {externalManagerConstraints} from '~constraints/external-manager'
import {ExternalManagerUpdateData} from '~types/form'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'

interface IExternalManagerModifyFormProps {
  externalOrganizationListOptions: IComboBoxItemData<string>[]
  formData: ExternalManagerUpdateData
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalManagerUpdateData>
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

const ExternalManagerModifyForm = ({
  onCancel,
  onSubmit,
  formData,
  externalOrganizationListOptions,
}: IExternalManagerModifyFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: {isValid},
  } = useForm<ExternalManagerUpdateData>({
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
            <CardItem required title="제휴사">
              <ComboBox
                items={externalOrganizationListOptions}
                onSelect={(value): void => {
                  setValue('externalCaregivingOrganizationId', value)
                }}
                value={watch('externalCaregivingOrganizationId')}
              />
            </CardItem>
            <CardItem required title="아이디(이메일)">
              <BasicInput<ExternalManagerUpdateData>
                constraints={externalManagerConstraints}
                control={control}
                fieldName="email"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="담당자명">
              <BasicInput<ExternalManagerUpdateData>
                constraints={externalManagerConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
            <CardItem required title="연락처">
              <FormattingInput<ExternalManagerUpdateData>
                constraints={externalManagerConstraints}
                control={control}
                fieldName="phoneNumber"
                formatter={formatPhoneNumberWithHyphen}
              />
            </CardItem>
          </CardRow>
          <CardRow>
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
              <BasicInput<ExternalManagerUpdateData>
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

export default ExternalManagerModifyForm
