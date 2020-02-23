class FormValidator {
  static validateTitle(title, errors) {
    if (title === undefined || title.length < 1) {
      errors["title"].push("cannot be blank.")
    }
    if (title.length > 50) {
      errors["title"].push("is too long.")
    }
  }

  static validateShortDesc(shortDesc, errors) {
    if (shortDesc === undefined || shortDesc.length < 1) {
      errors["shortDesc"].push("cannot be blank.")
    }
    if (shortDesc.length > 150) {
      errors["shortDesc"].push("is too long.")
    }
  }

  static validateStartEndDate(startDate, endDate, errors) {}

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
      const { title, shortDesc, startDate, endDate } = state

      this.validateTitle(title, errors)
      this.validateShortDesc(shortDesc, errors)
      this.validateStartEndDate(startDate, endDate, errors)

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
