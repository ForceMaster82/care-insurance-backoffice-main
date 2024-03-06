import CoverageResource from './Resource'
import {
  COVERAGE_MAX_SUBSCRIPTION_YEAR,
  DEFAULT_RENEWAL_TYPE,
} from '~constants/texts'
import {
  AnnualCoveredCaregivingCharge,
  ICoverageCreate,
  RenewalType,
} from '~types/dto'
import {
  CoverageUpdateData,
  IAnnualCoveredCaregivingChargeData,
} from '~types/form'
import {formatAmountWithComma, removeComma} from '~utils/formatter'

class CoverageUpdateInput {
  name: string
  #targetSubscriptionYear: number
  renewalType: RenewalType
  #annualCoveredCaregivingCharges: AnnualCoveredCaregivingCharge[]
  #isLoaded: boolean

  constructor(resource: CoverageResource | null) {
    this.name = resource?.name || ''
    this.#targetSubscriptionYear = resource
      ? Number(resource.targetSubscriptionYear)
      : 0
    this.renewalType = resource?.renewalType || DEFAULT_RENEWAL_TYPE
    this.#annualCoveredCaregivingCharges = resource
      ? resource.annualCoveredCaregivingCharges
      : []
    this.#isLoaded = Boolean(resource)
  }

  get annualCoveredCaregivingCharges(): AnnualCoveredCaregivingCharge[] {
    return this.#annualCoveredCaregivingCharges
  }

  get targetSubscriptionYear(): number {
    return this.#targetSubscriptionYear
  }

  get applicationYearCharges(): IAnnualCoveredCaregivingChargeData[] {
    /** 수정 폼을 위해 chare가 0인 적용연도들을 추가하는 함수 */
    const addCaregivingChargesUntilLastYear = (
      chargeArray: AnnualCoveredCaregivingCharge[],
    ): AnnualCoveredCaregivingCharge[] => {
      const chargeArrayExcludeTargetAccidentYear = chargeArray.filter(
        (arr) => arr.targetAccidentYear !== this.#targetSubscriptionYear,
      )

      const currentYearArraySet = new Set(
        chargeArrayExcludeTargetAccidentYear.map((v) => v.targetAccidentYear),
      )

      const lastYear = COVERAGE_MAX_SUBSCRIPTION_YEAR
      // eslint-disable-next-line no-magic-numbers
      const yearInterval = this.renewalType === 'TEN_YEAR' ? 1 : 3
      const emptyChargeArray: AnnualCoveredCaregivingCharge[] = []

      for (
        let year = this.#targetSubscriptionYear + yearInterval;
        year <= lastYear;
        year += yearInterval
      ) {
        if (!currentYearArraySet.has(year)) {
          emptyChargeArray.push({
            caregivingCharge: 0,
            targetAccidentYear: year,
          })
        }
      }

      const annualCoveredCaregivingCharges = [
        ...chargeArrayExcludeTargetAccidentYear,
        ...emptyChargeArray,
      ]

      const sortedAnnualCoveredCaregivingCharges =
        annualCoveredCaregivingCharges.sort(
          (a, b) => a.targetAccidentYear - b.targetAccidentYear,
        )

      return sortedAnnualCoveredCaregivingCharges
    }

    const annualCoveredCaregivingCharges = addCaregivingChargesUntilLastYear(
      this.#annualCoveredCaregivingCharges,
    )

    return annualCoveredCaregivingCharges.map(
      ({caregivingCharge, targetAccidentYear}) => ({
        caregivingCharge: formatAmountWithComma(caregivingCharge.toString()),
        targetAccidentYear,
      }),
    )
  }

  get baseYearCharge(): IAnnualCoveredCaregivingChargeData {
    const targetChargeData = this.#annualCoveredCaregivingCharges.find(
      (data) => data.targetAccidentYear === this.#targetSubscriptionYear,
    )

    return {
      caregivingCharge: targetChargeData
        ? formatAmountWithComma(targetChargeData.caregivingCharge.toString())
        : '0',
      targetAccidentYear: targetChargeData
        ? targetChargeData.targetAccidentYear
        : this.#targetSubscriptionYear,
    }
  }

  get data(): CoverageUpdateData {
    return {
      applicationYearCharges: this.applicationYearCharges,
      baseYearCharge: this.baseYearCharge,
      name: this.name,
      renewalType: this.renewalType,
    }
  }

  set data(data: CoverageUpdateData) {
    const {name, renewalType, applicationYearCharges, baseYearCharge} = data
    const annualCoveredCaregivingCharges = [
      baseYearCharge,
      ...applicationYearCharges,
    ]
      .map(({caregivingCharge, targetAccidentYear}) => ({
        caregivingCharge: Number(removeComma(caregivingCharge)),
        targetAccidentYear,
      }))
      .sort((a, b) => b.targetAccidentYear - a.targetAccidentYear)

    this.name = name
    this.renewalType = renewalType
    this.#annualCoveredCaregivingCharges = annualCoveredCaregivingCharges
  }

  get input(): ICoverageCreate {
    return {
      annualCoveredCaregivingCharges: this.#annualCoveredCaregivingCharges,
      name: this.name,
      renewalType: this.renewalType,
      targetSubscriptionYear: this.targetSubscriptionYear,
    }
  }

  get isLoaded(): boolean {
    return this.#isLoaded
  }
}

export default CoverageUpdateInput
