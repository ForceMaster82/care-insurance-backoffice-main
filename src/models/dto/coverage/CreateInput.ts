import {DEFAULT_RENEWAL_TYPE} from '~constants/texts'
import {
  AnnualCoveredCaregivingCharge,
  ICoverageCreate,
  RenewalType,
} from '~types/dto'
import {CoverageCreateData} from '~types/form'
import {removeComma} from '~utils/formatter'

class CoverageCreateInput {
  name: string
  targetSubscriptionYear: number
  #renewalType: RenewalType
  dailyCharge: string

  constructor() {
    this.name = ''
    this.targetSubscriptionYear = new Date().getFullYear() + 1
    this.#renewalType = DEFAULT_RENEWAL_TYPE
    this.dailyCharge = ''
  }

  get data(): CoverageCreateData {
    return {
      dailyCharge: this.dailyCharge,
      name: this.name,
      targetSubscriptionYear: this.targetSubscriptionYear,
    }
  }

  set data(data: CoverageCreateData) {
    const {name, targetSubscriptionYear, dailyCharge} = data
    this.name = name
    this.targetSubscriptionYear = targetSubscriptionYear
    this.dailyCharge = dailyCharge
  }

  get input(): ICoverageCreate {
    const annualCoveredCaregivingCharges: AnnualCoveredCaregivingCharge[] = [
      {
        caregivingCharge: Number(removeComma(this.dailyCharge)),
        targetAccidentYear: this.targetSubscriptionYear,
      },
    ]
    return {
      annualCoveredCaregivingCharges,
      name: this.name,
      renewalType: this.#renewalType,
      targetSubscriptionYear: this.targetSubscriptionYear,
    }
  }
}

export default CoverageCreateInput
