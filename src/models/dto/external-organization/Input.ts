import ExternalOrganizationResource from './Resource'
import {
  ExternalOrganizationType,
  IAccountInfo,
  IExternalOrganizationUpdate,
} from '~types/dto'
import {ExternalOrganizationData} from '~types/form'
import {transformPercentToDecimal} from '~utils/transform'
import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {removeHyphen} from '~utils/formatter'

class ExternalOrganizationInput {
  accountInfo: IAccountInfo
  name: string
  externalCaregivingOrganizationType: ExternalOrganizationType
  address: string
  contractName: string
  phoneNumber: string
  profitAllocationRatio: number
  businessLicenseFileName: string
  businessLicenseFileUrl: string
  #isLoaded: boolean

  constructor(resource?: ExternalOrganizationResource | null) {
    this.accountInfo = {
      accountHolder:
        !resource || resource?.accountInfo.accountHolder === EMPTY_VALUE_TEXT
          ? ''
          : resource?.accountInfo.accountHolder,
      accountNumber:
        !resource || resource?.accountInfo.accountNumber === EMPTY_VALUE_TEXT
          ? ''
          : resource?.accountInfo.accountNumber,
      bank:
        !resource || resource?.accountInfo.bank === EMPTY_VALUE_TEXT
          ? ''
          : resource?.accountInfo.bank,
    }
    this.name = resource?.name || ''
    this.externalCaregivingOrganizationType =
      resource?.externalCaregivingOrganizationType || 'AFFILIATED'
    this.address = resource?.address || ''
    this.contractName = resource?.contractName || ''
    this.phoneNumber = resource?.phoneNumber || ''
    this.profitAllocationRatio = resource?.profitAllocationRatio
      ? transformPercentToDecimal(resource?.profitAllocationRatio)
      : 0
    this.businessLicenseFileName =
      !resource || resource?.businessLicenseFileName === EMPTY_VALUE_TEXT
        ? ''
        : resource.businessLicenseFileName
    this.businessLicenseFileUrl = resource?.businessLicenseFileUrl || ''
    this.#isLoaded = Boolean(resource)
  }

  get data(): ExternalOrganizationData {
    return {
      accountInfo: this.accountInfo,
      address: this.address,
      businessLicenseFileName: this.businessLicenseFileName,
      businessLicenseFileUrl: this.businessLicenseFileUrl,
      contractName: this.contractName,
      externalCaregivingOrganizationType:
        this.externalCaregivingOrganizationType,
      name: this.name,
      phoneNumber: this.phoneNumber,
      profitAllocationRatio: this.profitAllocationRatio,
    }
  }

  set data(data: ExternalOrganizationData) {
    const {
      accountInfo,
      address,
      businessLicenseFileName,
      businessLicenseFileUrl,
      contractName,
      externalCaregivingOrganizationType,
      name,
      phoneNumber,
      profitAllocationRatio,
    } = data
    this.accountInfo = accountInfo
    this.address = address
    this.businessLicenseFileName = businessLicenseFileName
    this.businessLicenseFileUrl = businessLicenseFileUrl
    this.contractName = contractName
    this.externalCaregivingOrganizationType = externalCaregivingOrganizationType
    this.name = name
    this.phoneNumber = phoneNumber
    this.profitAllocationRatio = profitAllocationRatio
  }

  get input(): IExternalOrganizationUpdate {
    return {
      accountInfo: {
        accountHolder: this.accountInfo.accountHolder || null,
        accountNumber: this.accountInfo.accountNumber || null,
        bank: this.accountInfo.bank || null,
      },
      address: this.address,
      businessLicenseFileName: this.businessLicenseFileName || null,
      businessLicenseFileUrl: this.businessLicenseFileUrl || null,
      contractName: this.contractName,
      externalCaregivingOrganizationType:
        this.externalCaregivingOrganizationType,
      name: this.name,
      phoneNumber: removeHyphen(this.phoneNumber),
      profitAllocationRatio:
        this.externalCaregivingOrganizationType === 'AFFILIATED'
          ? this.profitAllocationRatio
          : null,
    }
  }

  get isLoaded(): boolean {
    return this.#isLoaded
  }
}

export default ExternalOrganizationInput
