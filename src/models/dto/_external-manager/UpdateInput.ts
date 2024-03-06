import {ExternalManagerResource} from './Resource'
import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {IExternalManagerUpdate} from '~types/dto'
import {ExternalManagerUpdateData} from '~types/form'
import {removeHyphen} from '~utils/formatter'

class ExternalManagerUpdateInput {
  email: string
  externalCaregivingOrganizationId: string
  name: string
  phoneNumber: string
  remarks: string
  suspended: boolean
  lastLoginDateTime: string
  #isLoaded: boolean

  constructor(resource: ExternalManagerResource | null) {
    this.email = resource?.email || ''
    this.externalCaregivingOrganizationId =
      resource?.externalCaregivingOrganizationId || ''
    this.name = resource?.name || ''
    this.phoneNumber = resource?.phoneNumber || ''
    this.remarks =
      !resource || resource?.remarks === EMPTY_VALUE_TEXT
        ? ''
        : resource.remarks
    this.suspended = resource?.suspended || false
    this.lastLoginDateTime = resource?.lastLoginDateTime || ''
    this.#isLoaded = Boolean(resource)
  }

  get data(): ExternalManagerUpdateData {
    return {
      email: this.email,
      externalCaregivingOrganizationId: this.externalCaregivingOrganizationId,
      lastLoginDateTime: this.lastLoginDateTime,
      name: this.name,
      phoneNumber: this.phoneNumber,
      remarks: this.remarks,
      suspended: this.suspended,
    }
  }

  set data(data: ExternalManagerUpdateData) {
    const {
      email,
      externalCaregivingOrganizationId,
      name,
      phoneNumber,
      remarks,
      suspended,
      lastLoginDateTime,
    } = data
    this.email = email
    this.externalCaregivingOrganizationId = externalCaregivingOrganizationId
    this.name = name
    this.phoneNumber = phoneNumber
    this.remarks = remarks
    this.suspended = suspended
    this.lastLoginDateTime = lastLoginDateTime
  }

  get input(): IExternalManagerUpdate {
    return {
      email: this.email,
      externalCaregivingOrganizationId: this.externalCaregivingOrganizationId,
      name: this.name,
      phoneNumber: removeHyphen(this.phoneNumber),
      remarks: this.remarks,
      suspended: this.suspended,
    }
  }

  get isLoaded(): boolean {
    return this.#isLoaded
  }
}

export default ExternalManagerUpdateInput
