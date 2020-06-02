const defaultErrors = {
  post: [],
}

class PostValidator {
  static validatePost(state, errors) {
    const { post } = state
    const key = Object.keys({ post })[0]
    if (post.length > 50) {
      errors[key].push("Title is too long.")
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
      this.validateStartEndDate(state, errors)
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

export default PostValidator
export { PostValidator, defaultErrors }
