const defaultErrors = {
  name: [],
  userExpertises: [],
  skills: [],
  description: [],
  status: [],
}

class EditRoleValidator {
  static validateName(state, errors) {
    const { name } = state
    const key = Object.keys({ name })[0]

    if (name === undefined || name.length < 1) {
      errors[key].push("Name is required.")
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

  static validateDescription(state, errors) {
    const { description } = state
    const key = Object.keys({ description })[0]

    if (description === undefined || description.length < 1) {
      errors[key].push("Description is required.")
    }
  }

  static validateStatus(state, errors) {
    const { status } = state
    const key = Object.keys({ status })[0]

    if (status === undefined || status.length < 1) {
      errors[key].push("Status is required.")
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
      this.validateName(state, errors)
      this.validateExpertises(state, errors)
      this.validateSkills(state, errors)
      this.validateDescription(state, errors)
      this.validateStatus(state, errors)

      if (this.isValidatePass(errors)) {
        resolve(errors)
      } else {
        reject(errors)
      }
    })
    return promise
  }
}

export default EditRoleValidator
export { EditRoleValidator, defaultErrors }
