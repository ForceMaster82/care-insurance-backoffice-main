import InternalManagerResource from './Resource'
import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {IInternalManagerUpdate} from '~types/dto'
import {InternalManagerUpdateData} from '~types/form'
import {removeHyphen} from '~utils/formatter'

class InternalManagerUpdateInput {
  email: string
  name: string
  nickname: string
  phoneNumber: string
  suspended: boolean
  role: string
  remarks: string
  lastLoginDateTime: string
  #isLoaded: boolean

  constructor(resource: InternalManagerResource | null) {
    this.email = resource?.email || ''
    this.name = resource?.name || ''
    this.nickname = resource?.nickname || ''
    this.phoneNumber = resource?.phoneNumber || ''
    this.suspended = resource?.suspended || false
    this.role = resource?.role || ''
    this.remarks =
      !resource || resource?.remarks === EMPTY_VALUE_TEXT
        ? ''
        : resource.remarks
    this.lastLoginDateTime = resource?.lastLoginDateTime || ''
    this.#isLoaded = Boolean(resource)
  }

  get data(): InternalManagerUpdateData {
    return {
      email: this.email,
      lastLoginDateTime: this.lastLoginDateTime,
      name: this.name,
      nickname: this.nickname,
      phoneNumber: this.phoneNumber,
      remarks: this.remarks,
      role: this.role,
      suspended: this.suspended,
    }
  }

  set data(data: InternalManagerUpdateData) {
    const {
      email,
      name,
      phoneNumber,
      remarks,
      suspended,
      lastLoginDateTime,
      nickname,
      role,
    } = data
    this.email = email
    this.name = name
    this.nickname = nickname
    this.phoneNumber = phoneNumber
    this.suspended = suspended
    this.role = role
    this.remarks = remarks
    this.lastLoginDateTime = lastLoginDateTime
  }

  get input(): IInternalManagerUpdate {
    return {
      email: this.email,
      name: this.name,
      nickname: this.nickname,
      phoneNumber: removeHyphen(this.phoneNumber),
      remarks: this.remarks,
      role: this.role,
      suspended: this.suspended,
    }
  }

  get isLoaded(): boolean {
    return this.#isLoaded
  }
}

export default InternalManagerUpdateInput
