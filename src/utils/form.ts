import {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  useFormState,
  useWatch,
} from 'react-hook-form'

interface IUseCheckValidatedField<TFieldValues extends FieldValues> {
  checkIsValidatedField: (fieldName: FieldPath<TFieldValues>) => boolean
  errors: FieldErrors<TFieldValues>
}

export const useCheckValidatedField = <TFieldValues extends FieldValues>(
  control: Control<TFieldValues>,
): IUseCheckValidatedField<TFieldValues> => {
  const {errors, dirtyFields} = useFormState({control})
  const fieldValues = useWatch({control})

  const checkIsValidatedField = (
    fieldName: FieldPath<TFieldValues>,
  ): boolean => {
    const isValidated =
      // dirtyFields[fieldName] &&
      Boolean(fieldValues[fieldName]) && !errors[fieldName]
    return isValidated
  }

  return {checkIsValidatedField, errors}
}
