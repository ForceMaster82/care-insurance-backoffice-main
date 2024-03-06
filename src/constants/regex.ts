export const regexOnlyNumber = /^\d*$/

export const regexPhoneNumberWithHyphen =
  /^(01[016-9]|02|0[3-9]\d)-(\d{3,4})-(\d{3,4})$/

export const regexCellPhoneNumber = /^01([016-9|])(\d{3,4})(\d{4})$/

export const regexResidentNumberWithHyphen =
  /^\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[,12]\d|3[,01])-[1-8]\d{6}$/

export const regexDateWithDot =
  /^\d{4}\.(?:[1-9]|0[1-9]|1[0-2])\.(?:[1-9]|0[1-9]|[12]\d|3[01])$/

export const insurancePasswordRegex =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&*@^_\-])[\w!#$%&*@^\-]{8,20}$/

export const emailRegex = /^[\w.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/
