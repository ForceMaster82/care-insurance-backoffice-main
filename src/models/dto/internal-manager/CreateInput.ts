import {IInternalManagerCreate} from '~types/dto'
import {InternalManagerCreateData} from '~types/form'
import {removeHyphen} from '~utils/formatter'

class InternalManagerCreateInput {
  email: string
  nickname: string
  name: string
  phoneNumber: string
  remarks: string
  role: string

  constructor() {
    this.email = ''
    this.nickname = ''
    this.name = ''
    this.phoneNumber = ''
    this.remarks = ''
    this.role = ''
  }

  get data(): InternalManagerCreateData {
    return {
      email: this.email,
      name: this.name,
      nickname: this.nickname,
      phoneNumber: this.phoneNumber,
      remarks: this.remarks,
      role: this.role,
    }
  }

  set data(data: InternalManagerCreateData) {
    const {email, nickname, name, phoneNumber, remarks, role} = data
    this.email = email
    this.nickname = nickname
    this.name = name
    this.phoneNumber = phoneNumber
    this.remarks = remarks
    this.role = role
  }

  get input(): IInternalManagerCreate {
    return {
      email: this.email,
      name: this.name,
      nickname: this.nickname,
      phoneNumber: removeHyphen(this.phoneNumber),
      remarks: this.remarks,
      role: this.role,
    }
  }
}

export default InternalManagerCreateInput
