import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {IExternalManagerDetail} from '~types/dto'
import {formatDate} from '~utils/date'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'

export class ExternalManagerResource {
  id: string
  externalCaregivingOrganizationId: string
  email: string
  lastLoginDateTime: string
  name: string
  phoneNumber: string
  remarks: string
  suspended: boolean

  constructor(data: IExternalManagerDetail) {
    const {
      email,
      externalCaregivingOrganizationId,
      id,
      lastLoginDateTime,
      name,
      phoneNumber,
      remarks,
      suspended,
    } = data

    this.id = id
    this.externalCaregivingOrganizationId = externalCaregivingOrganizationId
    this.email = email
    this.lastLoginDateTime = formatDate(lastLoginDateTime, 'yyyy-MM-dd hh:mm')
    this.name = name
    this.phoneNumber = formatPhoneNumberWithHyphen(phoneNumber)
    this.remarks = remarks || EMPTY_VALUE_TEXT
    this.suspended = suspended
  }
}
