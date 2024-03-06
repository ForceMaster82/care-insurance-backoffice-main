import {ILogin} from '~types/dto'
import {LoginData} from '~types/form'

class LoginInput {
  #email: string
  #password: string

  constructor() {
    this.#email = ''
    this.#password = ''
  }

  get email(): string {
    return this.#email
  }

  get password(): string {
    return this.#password
  }

  get data(): LoginData {
    return {
      email: this.#email,
      password: this.#password,
    }
  }

  set data(data: LoginData) {
    const {email, password} = data
    this.#email = email
    this.#password = password
  }

  get input(): ILogin {
    return {
      email: this.#email || null,
      password: this.#password || null,
      refreshToken: null,
    }
  }
}

export default LoginInput
