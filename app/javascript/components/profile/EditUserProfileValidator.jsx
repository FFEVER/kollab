const defaultErrors = {
  faculty: [],
  year: [],
  email: [],
  phone: [],
  socials: [],
  userExpertises: [],
  skills: [],
}

class EditUserProfileValidator {
  static validateFaculty(state, errors) {
    const { faculty } = state
    const key = Object.keys({ faculty })[0]

    if (faculty === undefined || faculty.length < 1) {
      errors[key].push("Faculty is required.")
    }
  }

  static validateYear(state, errors) {
    const { year } = state
    const key = Object.keys({ year })[0]

    if (year === undefined || year.length < 1) {
      errors[key].push("Year is required.")
    }
  }

  static validateEmail(state, errors) {
    const { email } = state
    const key = Object.keys({ email })[0]

    if (email === undefined || email.length < 1) {
      errors[key].push("E-mail is required.")
    } else if (email.indexOf("@") == -1 && email.indexOf(".") == -1) {
      errors[key].push("Invalid form of email")
    }
  }

  static validatePhone(state, errors) {
    const { phone } = state
    const key = Object.keys({ phone })[0]

    if (phone === undefined || phone.length < 1) {
      errors[key].push("Phone number is required.")
    }
  }

  static validateSocials(state, errors) {
    const { socials } = state
    const key = Object.keys({ email })[0]

    if (socials === undefined || socials.length < 1) {
      errors[key].push("Social link is required.")
    }
  }

  static validateExpertises(state, errors) {
    const { userExpertises } = state
    const key = Object.keys({ userExpertises })[0]
    if (userExpertises.length > 3) {
      errors[key].push("Expertise may have up to 3.")
    } else if (userExpertises.length <= 0) {
      errors[key].push("Add at least 1 expertise")
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
      this.validateEmail(state, errors)
      this.validateYear(state, errors)
      this.validateFaculty(state, errors)
      this.validateExpertises(state, errors)
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

export default EditUserProfileValidator
export { EditUserProfileValidator, defaultErrors }
