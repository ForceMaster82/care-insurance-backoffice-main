import AccountInfoResource from '../account-info/Resource'
import {ExternalOrganizationType, IExternalOrganizationDetail} from '~types/dto'
import {formatPhoneNumberWithHyphen} from '~utils/formatter'
import {transformDecimalToPercent} from '~utils/transform'
import {EMPTY_VALUE_TEXT} from '~constants/texts'

class ExternalOrganizationResource {
  id: string
  accountInfo: AccountInfoResource
  name: string
  externalCaregivingOrganizationType: ExternalOrganizationType
  address: string
  contractName: string
  phoneNumber: string
  profitAllocationRatio: string
  businessLicenseFileName: string
  businessLicenseFileUrl: string

  constructor(data: IExternalOrganizationDetail) {
    const {
      id,
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

    this.id = id
    this.accountInfo = new AccountInfoResource(accountInfo)
    this.name = name
    this.externalCaregivingOrganizationType = externalCaregivingOrganizationType
    this.address = address
    this.contractName = contractName
    this.phoneNumber = formatPhoneNumberWithHyphen(phoneNumber)
    this.profitAllocationRatio = transformDecimalToPercent(
      profitAllocationRatio || 0,
    )
    this.businessLicenseFileName = businessLicenseFileName || EMPTY_VALUE_TEXT
    this.businessLicenseFileUrl = businessLicenseFileUrl || ''
  }
}

export default ExternalOrganizationResource
