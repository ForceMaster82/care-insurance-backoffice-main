import {type IInput, Input} from '@caredoc/ui-web'
import {Constraints} from '@caredoc/utils-web'
import React, {KeyboardEvent, ReactElement, useState} from 'react'
import {Control, FieldValues, Path, useWatch} from 'react-hook-form'
import {BASIC_INPUT_MAX_LENGTH, BASIC_TEXTAREA_MAX_LENGTH} from '~constants'
import {VALID_INPUT_MESSAGE} from '~constants/texts'
import {useCheckValidatedField} from '~utils/form'
import {isStringTypeGard} from '~utils/type-gards'

export interface IBasicInputProps<TFieldValues extends FieldValues>
  extends Omit<
    IInput,
    | 'forcedInput'
    | 'hideMaxLengthText'
    | 'register'
    | 'isValidated'
    | 'errors'
    | 'value'
  > {
  constraints: Constraints<TFieldValues>
  control: Control<TFieldValues>
  fieldName: Path<TFieldValues>
  isTextArea?: boolean
  onEnterSubmit?: () => void
}

const BasicInput = <TFieldValues extends FieldValues>({
  hint,
  constraints,
  fieldName,
  control,
  maxLength,
  onTextChange,
  isTextArea,
  onEnterSubmit,
  ...rest
}: IBasicInputProps<TFieldValues>): ReactElement => {
  const defaultValue = useWatch({control, name: fieldName})
  const _maxLength =
    maxLength ||
    (isTextArea ? BASIC_TEXTAREA_MAX_LENGTH : BASIC_INPUT_MAX_LENGTH)

  /** value를 따로관리해서 넣어주지않으면 현재 ui-web/input상으로는 maxLength계산불가 */
  const [value, setValue] = useState<string>(defaultValue.slice(0, _maxLength))

  const {register} = control

  const {checkIsValidatedField, errors} =
    useCheckValidatedField<TFieldValues>(control)

  const isValidated = checkIsValidatedField(fieldName)
  const errorMessage = errors[fieldName]?.message

  const handleOnTextChange = (text: string): void => {
    setValue(text)
    onTextChange?.(text)
  }

  const handleOnKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onEnterSubmit?.()
    }
  }

  return (
    <Input
      errors={isStringTypeGard(errorMessage) ? errorMessage : undefined}
      forcedInput={!isTextArea}
      hideMaxLengthText={!isTextArea}
      hint={isValidated ? VALID_INPUT_MESSAGE : hint}
      isValidated={isValidated}
      maxLength={_maxLength}
      onKeyPress={handleOnKeyPress}
      onTextChange={handleOnTextChange}
      register={register(fieldName, constraints[fieldName])}
      value={value}
      {...rest}
    />
  )
}

export default BasicInput
