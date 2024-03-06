import {Box, ComboBox, InfoBox, Typography} from '@caredoc/ui-web'
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
import {coverageTargetSubscriptionYearOptions} from '~constants/options'
import {COVERAGE_RENEWAL_TYPE, DEFAULT_RENEWAL_TYPE} from '~constants/texts'
import {coverageConstraints} from '~constraints/coverage'
import {CoverageCreateData} from '~types/form'
import {formatAmountWithComma} from '~utils/formatter'

interface ICoverageRegisterFormProps {
  formData: CoverageCreateData
  onCancel?: () => void
  onSubmit: SubmitHandler<CoverageCreateData>
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

const CoverageRegisterForm = ({
  onCancel,
  onSubmit,
  formData,
}: ICoverageRegisterFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)

  const {
    handleSubmit,
    control,
    formState: {isValid},
  } = useForm<CoverageCreateData>({
    defaultValues: formData,
    mode: 'all',
  })

  const handleOnClickSubmitButton = (): void => {
    ref.current?.requestSubmit()
  }

  const {field: externalCaregivingOrganizationIdField} = useController({
    control,
    name: 'targetSubscriptionYear',
    rules: coverageConstraints.targetSubscriptionYear,
  })

  return (
    <Box gap="sm">
      <FormContainer onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <CardContainer>
          <InfoBox size="md" state="info">
            3년형 가입담보의 일일 간병비 신규 추가는 수정을 통해 진행하셔야
            합니다.
          </InfoBox>
          <CardRow>
            <CardItem title="구분">
              <Typography>
                {COVERAGE_RENEWAL_TYPE[DEFAULT_RENEWAL_TYPE]}
              </Typography>
            </CardItem>
            <CardItem required title="가입담보명">
              <BasicInput<CoverageCreateData>
                constraints={coverageConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
          </CardRow>
          <CardRow>
            <CardItem required title="기준연도">
              <ComboBox
                items={coverageTargetSubscriptionYearOptions}
                onSelect={(value): void =>
                  externalCaregivingOrganizationIdField.onChange(value)
                }
                value={externalCaregivingOrganizationIdField.value}
              />
            </CardItem>
            <CardItem required title="일일 간병비">
              <Box alignItems="center" flexDirection="row" gap="xxs">
                <FormattingInput<CoverageCreateData>
                  constraints={coverageConstraints}
                  control={control}
                  fieldName="dailyCharge"
                  formatter={formatAmountWithComma}
                  style={{width: '100%'}}
                />
                원
              </Box>
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

export default CoverageRegisterForm
