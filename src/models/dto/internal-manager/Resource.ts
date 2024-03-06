import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {IInternalManagerDetail} from '~types/dto'
import {formatDate} from '~utils/date'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'

class InternalManagerResource {
  email: string
  id: string
  lastLoginDateTime: string
  name: string
  nickname: string
  phoneNumber: string
  remarks: string
  role: string
  suspended: boolean
  userId: string

  constructor(data: IInternalManagerDetail) {
    const {
      email,
      id,
      lastLoginDateTime,
      name,
      phoneNumber,
      remarks,
      suspended,
      nickname,
      role,
      userId,
    } = data

    this.id = id
    this.email = email
    this.lastLoginDateTime = formatDate(lastLoginDateTime, 'yyyy-MM-dd hh:mm')
    this.name = name
    this.phoneNumber = formatPhoneNumberWithHyphen(phoneNumber)
    this.remarks = remarks || EMPTY_VALUE_TEXT
    this.suspended = suspended
    this.nickname = nickname
    this.role = role
    this.userId = userId
  }
}

export default InternalManagerResource
