import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form'
import React, {ChangeEvent, ReactElement} from 'react'
import {Input} from '@caredoc/ui-web'
import {IBasicInputProps} from './BasicInput'
import {BASIC_INPUT_MAX_LENGTH, BASIC_TEXTAREA_MAX_LENGTH} from '~constants'
import {VALID_INPUT_MESSAGE} from '~constants/texts'
import {useCheckValidatedField} from '~utils/form'
import {isStringTypeGard} from '~utils/type-gards'

interface renderParameters<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TFieldName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}

interface IFormattingInputProps<TFieldValues extends FieldValues>
  extends IBasicInputProps<TFieldValues> {
  defaultValue?: string
  formatter: (text: string) => string
}

const FormattingInput = <TFieldValues extends FieldValues>({
  control,
  fieldName,
  formatter,
  maxLength,
  isTextArea = false,
  constraints,
  hint,
  defaultValue = '',
  ...rest
}: IFormattingInputProps<TFieldValues>): ReactElement => {
  const {checkIsValidatedField, errors} =
    useCheckValidatedField<TFieldValues>(control)

  const isValidated = checkIsValidatedField(fieldName)
  const errorMessage = errors[fieldName]?.message

  const _maxLength =
    maxLength ||
    (isTextArea ? BASIC_TEXTAREA_MAX_LENGTH : BASIC_INPUT_MAX_LENGTH)

  const renderControlledComponent = ({
    field,
  }: renderParameters<TFieldValues, Path<TFieldValues>>): ReactElement => {
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const targetValue = event.target?.value
      if (targetValue.length > _maxLength) {
        return
      }
      field.onChange(targetValue ? formatter(targetValue) : defaultValue)
    }
    const customFiled: ControllerRenderProps<
      TFieldValues,
      Path<TFieldValues>
    > = {
      ...field,
      onChange,
    }

    return (
      <Input
        errors={isStringTypeGard(errorMessage) ? errorMessage : undefined}
        forcedInput={!isTextArea}
        hideMaxLengthText={!isTextArea}
        hint={isValidated ? VALID_INPUT_MESSAGE : hint}
        isValidated={isValidated}
        maxLength={_maxLength}
        {...customFiled}
        {...rest}
      />
    )
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      render={renderControlledComponent}
      rules={constraints[fieldName]}
    />
  )
}

export default FormattingInput
