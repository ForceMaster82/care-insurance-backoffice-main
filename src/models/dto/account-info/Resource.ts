import {EMPTY_VALUE_TEXT} from '~constants/texts'
import {IAccountInfo} from '~types/dto'

class AccountInfoResource {
  #accountHolder: string

  #accountNumber: string

  #bank: string

  constructor(data?: IAccountInfo) {
    this.#accountHolder = data?.accountHolder || EMPTY_VALUE_TEXT
    this.#accountNumber = data?.accountNumber || EMPTY_VALUE_TEXT
    this.#bank = data?.bank || EMPTY_VALUE_TEXT
  }

  get accountHolder(): string {
    return this.#accountHolder
  }

  get accountNumber(): string {
    return this.#accountNumber
  }

  get bank(): string {
    return this.#bank
  }
}

export default AccountInfoResource
