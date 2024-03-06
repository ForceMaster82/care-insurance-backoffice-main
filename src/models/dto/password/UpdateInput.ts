import {IPasswordUpdate} from '~types/dto'
import {IPasswordUpdateData} from '~types/form'

class PasswordUpdateInput {
  currentPassword: string
  newPassword: string
  newPasswordCheck: string

  constructor() {
    this.currentPassword = ''
    this.newPassword = ''
    this.newPasswordCheck = ''
  }

  get data(): IPasswordUpdateData {
    return {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      newPasswordCheck: this.newPasswordCheck,
    }
  }

  set data(data: IPasswordUpdateData) {
    const {currentPassword, newPassword, newPasswordCheck} = data
    this.currentPassword = currentPassword
    this.newPassword = newPassword
    this.newPasswordCheck = newPasswordCheck
  }

  get input(): IPasswordUpdate {
    return {
      currentPassword: this.currentPassword,
      password: this.newPassword,
    }
  }
}

export default PasswordUpdateInput
