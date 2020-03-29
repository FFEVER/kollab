const defaultErrors = {
  name: [],
  email: [],
  password: [],
  confirmPassword: []
}

class SignUpValidator {
  static validateName(state, errors) {
    const { name } = state;
    const key = Object.keys({ name })[0];
    if (name === undefined || name.length < 1) {
      errors[key].push("Name is reuiqred.");
    }
  }

  static validateEmail(state, errors) {
    const { email } = state
    const key = Object.keys({ email })[0]
    if (email === undefined || email.length < 1) {
      errors[key].push("E-mail is required.")
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
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
      errors[key].push("Password is too short")
    }
  }

  static validateConfirmPassword(state, errors) {
    const { password, confirmPassword } = state
    const key = Object.keys({ confirmPassword })[0]
    if (confirmPassword === undefined || confirmPassword.length < 1) {
      errors[key].push("Confirm Password is required.")
    }
    if (password !== confirmPassword) {
      errors[key].push("Passwords do not match")
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
      this.validateName(state, errors);
      this.validateEmail(state, errors);
      this.validateEmail(state, errors)
      this.validatePassword(state, errors)
      this.validateConfirmPassword(state, errors)

      if (this.isValidatePass(errors)) {
        resolve(errors)
      } else {
        reject(errors)
      }
    })
    return promise
  }
}

export default SignUpValidator
export { SignUpValidator, defaultErrors }
