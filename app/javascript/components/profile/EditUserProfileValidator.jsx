const defaultErrors = {
  email: [],
  phone: [],
}

class EditUserProfileValidator {
  static validateEmail(state, errors) {
    const { email } = state
    const key = Object.keys({ email })[0]

    if (email === undefined || email.length < 1) {
      errors[key].push("E-mail is required.")
    }

    if (email.indexOf("@") == -1 && email.indexOf(".") == -1) {
      errors[key].push("Invalid form of email")
    }
  }
  static validatePassword(state, errors) {
    const { password } = state
    const key = Object.keys({ password })[0]

    if (password === undefined || password.length < 1) {
      errors[key].push("Password is required.")
    }
    if (password.length < 6) {
      errors[key].push("Invalid password")
    }
  }

  static isValidatePass(errors) {
    for (const value of Object.values(errors)) {
      if (value.length != 0) return false
    }
    return true
  }

  static clearErrors(errors) {
    for (const k of Object.keys(errors)) {
      errors[k] = []
    }
  }

  static validateAll(state) {
    let promise = new Promise((resolve, reject) => {
      const errors = { ...defaultErrors }
      this.clearErrors(errors)
      this.validateEmail(state, errors)
      this.validatePassword(state, errors)

      if (this.isValidatePass(errors)) {
        resolve(errors)
      } else {
        reject(errors)
      }
    })
    return promise
  }
}

export default EditUserProfileValidator
export { EditUserProfileValidator, defaultErrors }
