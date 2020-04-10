const defaultErrors = {
  tagList: [],
  expertise: "",
}

class UserBasicInfoValidator {
  static validateTagList(state, errors) {
    const { tagList } = state
    const key = Object.keys({ tagList })[0]

    if (tagList.length > 3) {
      errors[key].push("Tags can have up to 3.")
    } else if (tagList.length <= 0) {
      errors[key].push("Add at least 1 tag")
    }

    for (const { label, value } of tagList) {
      const length = value.length
      if (length > 25) {
        errors[key].push("A tag is too long (maximum 25 characters).")
        break
      }
      if (length <= 0) {
        errors[key].push("A tag is too short (minimum 1 character).")
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
      this.validateTagList(state, errors)

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
