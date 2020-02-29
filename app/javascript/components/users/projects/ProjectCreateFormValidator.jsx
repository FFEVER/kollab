class FormValidator {
  static validateTitle(state, errors) {
    const { title } = state
    const key = Object.keys({ title })[0]

    if (title === undefined || title.length < 1) {
      // Title is blank
      errors[key].push("cannot be blank.")
    }
    if (title.length > 50) {
      // Title has more than 50 letters
      errors[key].push("is too long.")
    }
  }

  static validateShortDesc(state, errors) {
    const { shortDesc } = state
    const key = Object.keys({ shortDesc })[0]

    if (shortDesc === undefined || shortDesc.length < 1) {
      // Short description is blank
      errors[key].push("cannot be blank.")
    }
    if (shortDesc.length > 150) {
      // Short description has more than 150 letters
      errors[key].push("is too long.")
    }
  }

  static validateStartEndDate(state, errors) {
    const { startDate, endDate } = state
    const key = Object.keys({ startDate })[0]

    var startDateObj = Date.parse(startDate)
    var endDateObj = Date.parse(endDate)

    if (!Number.isNaN(endDateObj)) {
      if (!Number.isNaN(startDateObj) && startDateObj - endDateObj > 0) {
        // Start date come after end date
        errors[key].push("must happen before end date.")
      }
      if (Number.isNaN(startDateObj)) {
        // Have end date but no start date
        errors[key].push("cannot be blank.")
      }
    }
  }

  static validateTags(state, errors) {
    const { tags } = state
    const key = Object.keys({ tags })[0]

    if (tags.length > 3) {
      // Tags more than 3
      errors[key].push("can have up to 3.")
    } else if (tags.length <= 0) {
      // Tags less than 1
      errors[key].push("cannot be blank.")
    }
  }

  static isValidatePass(errors) {
    for (let [key, value] of Object.entries(errors)) {
      if (value.length != 0) return false
    }
    return true
  }

  static validateAll(state) {
    var promise = new Promise((resolve, reject) => {
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
