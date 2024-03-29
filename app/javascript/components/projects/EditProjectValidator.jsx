const defaultErrors = {
  title: [],
  shortDesc: [],
  longDesc: [],
  startDate: [],
  endDate: [],
  tagList: [],
  expertises: [],
  status: [],
}

class FormValidator {
  static validateTitle(state, errors) {
    const { title } = state
    const key = Object.keys({ title })[0]

    if (title === undefined || title.length < 1) {
      errors[key].push("Title cannot be blank.")
    }
    if (title.length > 100) {
      errors[key].push("Title is too long.")
    }
  }

  static validateShortDesc(state, errors) {
    const { shortDesc } = state
    const key = Object.keys({ shortDesc })[0]

    if (shortDesc === undefined || shortDesc.length < 1) {
      errors[key].push("Short description cannot be blank.")
    }
    if (shortDesc.length > 150) {
      errors[key].push("Short description is too long.")
    }
  }

  static validateLongDesc(state, errors) {
    const { longDesc } = state
    const key = Object.keys({ longDesc })[0]

    if (longDesc.length > 3000) {
      errors[key].push("The description is too long.")
    }
  }

  static validateStartEndDate(state, errors) {
    const { startDate, endDate } = state
    const key = Object.keys({ startDate })[0]

    let startDateObj = Date.parse(startDate)
    let endDateObj = Date.parse(endDate)

    if (!Number.isNaN(endDateObj)) {
      if (!Number.isNaN(startDateObj) && startDateObj - endDateObj > 0) {
        errors[key].push("Start date must be before end date.")
      }
      if (Number.isNaN(startDateObj)) {
        errors[key].push("Start date cannot be blank.")
      }
    }
  }

  static validateExpertises(state, errors) {
    const { expertises } = state
    const key = Object.keys({ expertises })[0]

    if (expertises.length > 3) {
      errors[key].push("Expertises may have up to 3.")
    } else if (expertises.length <= 0) {
      errors[key].push("Add at least 1 expertise")
    }
  }

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

  static validateStatus(state, errors) {
    const { status } = state
    const key = Object.keys({ status })[0]

    // if (shortDesc === undefined || shortDesc.length < 1) {
    //   errors[key].push("Short description cannot be blank.")
    // }
    if (status === undefined || status.length < 1) {
      errors[key].push("Please select your project status.")
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
      this.validateTitle(state, errors)
      this.validateShortDesc(state, errors)
      this.validateLongDesc(state, errors)
      this.validateStartEndDate(state, errors)
      this.validateTagList(state, errors)
      this.validateExpertises(state, errors)
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

export default FormValidator
export { FormValidator, defaultErrors }
