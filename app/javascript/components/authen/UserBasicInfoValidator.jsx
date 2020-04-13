const defaultErrors = {
  faculty: "",
  year: "",
  expertise: "",
  skills: [],
}

class UserBasicInfoValidator {
  static validateFaculty(state, errors) {
    const { faculty } = state
    const key = Object.keys({ faculty })[0]
    if (faculty === undefined || faculty.length < 1) {
      errors[key].push("Please select your faculty.")
    }
  }

  static validateYear(state, errors) {
    const { year } = state
    const key = Object.keys({ year })[0]
    if (year === undefined || year.length < 1) {
      errors[key].push("Please select your year.")
    }
  }

  static validateExpertise(state, errors) {
    const { expertise } = state
    const key = Object.keys({ expertise })[0]
    if (expertise === undefined || expertise.length < 1) {
      errors[key].push("Please select your expertise.")
    }
  }

  static validateSkills(state, errors) {
    const { skills } = state
    const key = Object.keys({ skills })[0]

    if (skills.length > 3) {
      errors[key].push("Skills may have up to 3.")
    } else if (skills.length <= 0) {
      errors[key].push("Add at least 1 skill")
    }

    for (const { label, value } of skills) {
      const length = value.length
      if (length > 25) {
        errors[key].push("A skill is too long (maximum 25 characters).")
        break
      }
      if (length <= 0) {
        errors[key].push("A skill is too short (minimum 1 character).")
        break
      }
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
      this.validateFaculty(state, errors)
      this.validateYear(state, errors)
      this.validateExpertise(state, errors)
      this.validateSkills(state, errors)

      if (this.isValidatePass(errors)) {
        resolve(errors)
      } else {
        reject(errors)
      }
    })
    return promise
  }
}

export default UserBasicInfoValidator
export { UserBasicInfoValidator, defaultErrors }
