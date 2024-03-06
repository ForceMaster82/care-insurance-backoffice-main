export const formatPhoneNumberWithHyphen = (text: string): string => {
  const phoneNumberWithHyphenMaxLength = 11
  const seoulPhoneNumberWithHyphenMaxLength = 10
  const isSeoul = text.startsWith('02')

  let formattedText = text.replace(/\D/g, '') // 숫자 이외의 문자 제거

  if (isSeoul) {
    if (formattedText.length > seoulPhoneNumberWithHyphenMaxLength) {
      // 최대 길이 초과인 경우
      formattedText = formattedText.slice(
        0,
        seoulPhoneNumberWithHyphenMaxLength,
      )
    }

    formattedText =
      formattedText.length === seoulPhoneNumberWithHyphenMaxLength
        ? formattedText
            .replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')
        : formattedText
            .replace(/^(\d{0,2})(\d{0,3})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')
  } else {
    if (formattedText.length > phoneNumberWithHyphenMaxLength) {
      // 최대 길이 초과인 경우
      formattedText = formattedText.slice(0, phoneNumberWithHyphenMaxLength)
    }

    formattedText =
      formattedText.length === phoneNumberWithHyphenMaxLength
        ? formattedText
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')
        : formattedText
            .replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')
  }

  return formattedText
}

export const formatBankNumber = (text: string): string => {
  return text.replace(/[^\d-]+/g, '')
}

export const formatAmountWithComma = (text: string): string =>
  text
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/^(0)([1-9])$/, (_, p1, p2) => `${p2}`)

export const formatNumber = (text: string): string => text.replace(/\D/g, '')

export const removeHyphen = (text: string): string => text.replaceAll('-', '')

export const removeComma = (text: string): string => text.replaceAll(',', '')
