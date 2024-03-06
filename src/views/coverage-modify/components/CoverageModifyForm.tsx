import {Box, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useRef} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import ChargeTable from './ChargeTable'
import CancelButton from '~components/Button/CancelButton'
import SubmitButton from '~components/Button/SubmitButton'
import FormContainer from '~components/Form/FormContainer'
import BasicInput from '~components/Input/BasicInput'
import {COVERAGE_RENEWAL_TYPE} from '~constants/texts'
import {coverageUpdateConstraints} from '~constraints/coverage'
import CardRow from '~components/Card/CardRow'
import CardItem from '~components/Card/CardItem'
import CardContainer from '~components/Card/CardContainer'
import {CoverageUpdateData} from '~types/form'

interface ICoverageModifyFormProps {
  formData: CoverageUpdateData
  onCancel?: () => void
  onSubmit: SubmitHandler<CoverageUpdateData>
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

const CoverageModifyForm = ({
  onCancel,
  onSubmit,
  formData,
}: ICoverageModifyFormProps): ReactElement => {
  const ref = useRef<HTMLFormElement>(null)
  const {
    handleSubmit,
    getValues,
    control,
    formState: {isValid},
  } = useForm<CoverageUpdateData>({
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
            <CardItem title="구분">
              <Typography>
                {COVERAGE_RENEWAL_TYPE[getValues('renewalType')]}
              </Typography>
            </CardItem>
            <CardItem required title="가입담보명">
              <BasicInput<CoverageUpdateData>
                constraints={coverageUpdateConstraints}
                control={control}
                fieldName="name"
              />
            </CardItem>
          </CardRow>
        </CardContainer>
      </FormContainer>
      <Box gap="xs">
        <Typography variant="subtitle1">적용연도별 일일 간병비 설정</Typography>
        <ChargeTable control={control} />
      </Box>
      <FormButtonSection
        isValid={isValid}
        onCancel={onCancel}
        onSubmit={handleOnClickSubmitButton}
      />
    </Box>
  )
}

export default CoverageModifyForm
