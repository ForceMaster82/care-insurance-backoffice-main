import {Box, ComboBox} from '@caredoc/ui-web'
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
import UploadInput from '~components/Input/UploadInput'
import {
  bankList,
  externalOrganizationTypeCategories,
  profitAllocationRatio,
} from '~constants/options'
import {organizationConstraints} from '~constraints/organization'
import {ExternalOrganizationData} from '~types/form'
import {formatBankNumber, formatPhoneNumberWithHyphen} from '~utils/formatter'

interface IOrganizationRegisterFormProps {
  formData: ExternalOrganizationData
  onCancel?: () => void
  onSubmit: SubmitHandler<ExternalOrganizationData>
  onUploadFile: (file: File | null) => void
  uploadedFile: File | null
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

const OrganizationRegisterForm = ({
  onCancel,
  onSubmit,
  formData,
  onUploadFile,
  uploadedFile,
}: IOrganizationRegisterFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: {isValid},
  } = useForm<ExternalOrganizationData>({
    defaultValues: formData,
    mode: 'all',
  })

  const handleOnUploadFile = (files: FileList | null): void => {
    if (files?.length) {
      const file = files[0]
      onUploadFile(file)
      setValue('businessLicenseFileName', file.name)
      setValue('businessLicenseFileUrl', URL.createObjectURL(file))
    }
  }

  const handleOnResetUploadedFile = (): void => {
    onUploadFile(null)
    setValue('businessLicenseFileName', '')
    setValue('businessLicenseFileUrl', '')
  }

  const handleOnClickSubmitButton = (): void => {
    ref.current?.requestSubmit()
  }

  return (
    <Box gap="sm">
      <FormContainer onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <CardContainer>
          <CardRow>
            <CardItem required title="구분">
              <ComboBox
                items={externalOrganizationTypeCategories}
                onSelect={(value): void => {
                  if (value === 'ORGANIZATION') {
                    setValue('profitAllocationRatio', 0)
                  }
                  setValue('externalCaregivingOrganizationType', value)
                }}
                value={watch('externalCaregivingOrganizationType')}
              />
            </CardItem>
            <CardItem required title="업체명">
              <BasicInput<ExternalOrganizationData>
                constraints={organizationConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="주소">
              <BasicInput<ExternalOrganizationData>
                constraints={organizationConstraints}
                control={control}
                fieldName="address"
              />
            </CardItem>
            <CardItem title="사업자등록증">
              <UploadInput
                fileName={watch('businessLicenseFileName')}
                onResetFile={handleOnResetUploadedFile}
                onUploadFile={handleOnUploadFile}
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="담당자명">
              <BasicInput<ExternalOrganizationData>
                constraints={organizationConstraints}
                control={control}
                fieldName="contractName"
              />
            </CardItem>
            <CardItem required title="연락처">
              <FormattingInput
                constraints={organizationConstraints}
                control={control}
                fieldName="phoneNumber"
                formatter={formatPhoneNumberWithHyphen}
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem title="은행명">
              <ComboBox
                items={bankList}
                onSelect={(value): void => setValue('accountInfo.bank', value)}
                value={watch('accountInfo.bank')}
              />
            </CardItem>
            <CardItem title="예금주">
              <BasicInput<ExternalOrganizationData>
                constraints={organizationConstraints}
                control={control}
                fieldName="accountInfo.accountHolder"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem title="계좌번호">
              <FormattingInput
                constraints={organizationConstraints}
                control={control}
                fieldName="accountInfo.accountNumber"
                formatter={formatBankNumber}
                placeholder="'-'를 포함하여 입력해 주세요"
              />
            </CardItem>
            <CardItem title="수익배분율">
              <ComboBox
                disabled={
                  watch('externalCaregivingOrganizationType') !== 'AFFILIATED'
                }
                items={profitAllocationRatio}
                onSelect={(value): void =>
                  setValue('profitAllocationRatio', value)
                }
                value={watch('profitAllocationRatio')}
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

export default OrganizationRegisterForm
