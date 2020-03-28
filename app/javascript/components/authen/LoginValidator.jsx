const defaultErrors = {
  email: [],
  password: []
};

class LoginValidator {
  static validateEmail(state) {
    const { email } = state;
  }
  static validatePassword(state) {
    const { password } = state;
  }

  static isValidatePass(errors) {
    for (const value of Object.values(errors)) {
      if (value.length != 0) return false;
    }
    return true;
  }

  static clearErrors(errors) {
    for (const k of Object.keys(errors)) {
      errors[k] = [];
    }
  }

  static validateAll(state) {
    let promise = new Promise((resolve, reject) => {
      const errors = { ...defaultErrors };
      this.clearErrors(errors);
      this.validateEmail(state);
      this.validatePassword(state);

      if (this.isValidatePass(errors)) {
        resolve(errors);
      } else {
        reject(errors);
      }
    });
    return promise;
  }
}

export default LoginValidator;
export { LoginValidator, defaultErrors };
