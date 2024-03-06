import {
  AnnualCoveredCaregivingCharge,
  ICoverageDetail,
  RenewalType,
} from '~types/dto'

class CoverageResource {
  id: string
  lastModifiedDateTime: string
  name: string
  renewalType: RenewalType
  targetSubscriptionYear: string
  annualCoveredCaregivingCharges: AnnualCoveredCaregivingCharge[]

  constructor(data: ICoverageDetail) {
    const {
      annualCoveredCaregivingCharges,
      id,
      lastModifiedDateTime,
      name,
      renewalType,
      targetSubscriptionYear,
    } = data
    this.id = id
    this.lastModifiedDateTime = lastModifiedDateTime
    this.name = name
    this.renewalType = renewalType
    this.targetSubscriptionYear = targetSubscriptionYear.toString()
    this.annualCoveredCaregivingCharges = annualCoveredCaregivingCharges
  }
}

export default CoverageResource
