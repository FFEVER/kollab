class FormValidator {
  static validateTitle(state, errors) {
    const { title } = state
    const key = Object.keys({ title })[0]

    if (title === undefined || title.length < 1) {
      errors[key].push("Title cannot be blank.")
    }
    if (title.length > 50) {
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

  static validateTags(state, errors) {
    const { tags } = state
    const key = Object.keys({ tags })[0]

    if (tags.length > 3) {
      errors[key].push("Tags can have up to 3.")
    } else if (tags.length <= 0) {
      errors[key].push("Add at least 1 tag")
    }
  }

  static isValidatePass(errors) {
    for (let [key, value] of Object.entries(errors)) {
      if (value.length != 0) return false
    }
    return true
  }

  static validateAll(state) {
    let promise = new Promise((resolve, reject) => {
      const errors = {
        title: [],
        shortDesc: [],
        startDate: [],
        endDate: [],
        tags: [],
        categories: []
      }

      this.validateTitle(state, errors)
      this.validateShortDesc(state, errors)
      this.validateStartEndDate(state, errors)
      this.validateTags(state, errors)

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
