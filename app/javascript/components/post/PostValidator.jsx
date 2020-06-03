const defaultErrors = {
  body: [],
}

class PostValidator {
  static validatePost(state, errors) {
    const { body } = state
    const key = Object.keys({ body })[0]
    if (body.length > 500) {
      errors[key].push("Post is too long.")
    }
    if (body.length === 0) {
      errors[key].push("Post is too short.")
    }
  }

  static isValidatePass(errors) {
    for (const value of Object.values(errors)) {
      if (value.length !== 0) return false
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
      this.validatePost(state, errors)

      if (this.isValidatePass(errors)) {
        resolve(errors)
      } else {
        reject(errors)
      }
    })

    return promise
  }
}

export { PostValidator, defaultErrors }
