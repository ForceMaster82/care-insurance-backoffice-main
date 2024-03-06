import {IExternalManagerCreate} from '~types/dto'
import {ExternalManagerCreateData} from '~types/form'
import {removeHyphen} from '~utils/formatter'

class ExternalManagerCreateInput {
  email: string
  externalCaregivingOrganizationId: string
  name: string
  phoneNumber: string
  remarks: string

  constructor() {
    this.email = ''
    this.externalCaregivingOrganizationId = ''
    this.name = ''
    this.phoneNumber = ''
    this.remarks = ''
  }

  get data(): ExternalManagerCreateData {
    return {
      email: this.email,
      externalCaregivingOrganizationId: this.externalCaregivingOrganizationId,
      name: this.name,
      phoneNumber: this.phoneNumber,
      remarks: this.remarks,
    }
  }

  set data(data: ExternalManagerCreateData) {
    const {
      email,
      externalCaregivingOrganizationId,
      name,
      phoneNumber,
      remarks,
    } = data
    this.email = email
    this.externalCaregivingOrganizationId = externalCaregivingOrganizationId
    this.name = name
    this.phoneNumber = phoneNumber
    this.remarks = remarks
  }

  get input(): IExternalManagerCreate {
    return {
      email: this.email,
      externalCaregivingOrganizationId: this.externalCaregivingOrganizationId,
      name: this.name,
      phoneNumber: removeHyphen(this.phoneNumber),
      remarks: this.remarks,
    }
  }
}

export default ExternalManagerCreateInput
