const defaultErrors = {
  role: [],
  roleStatus: [],
}

class FormValidator {
  static validateStatus(state, errors) {
    const { roleStatus } = state
    const key = Object.keys({ roleStatus })[0]

    if (roleStatus === undefined || roleStatus.length < 1) {
      errors[key].push("Status cannot be blank.")
    }
  }

  static validateRole(state, errors) {
    const { role } = state
    const key = Object.keys({ role })[0]

    if (role === undefined || role.length < 1) {
      errors[key].push("Role cannot be blank.")
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
      this.validateStatus(state, errors)
      this.validateRole(state, errors)

      if (this.isValidatePass(errors)) {
        resolve(errors)
      } else {
        reject(errors)
      }
    })

    return promise
  }
}

export default FormValidator
export { FormValidator, defaultErrors }
