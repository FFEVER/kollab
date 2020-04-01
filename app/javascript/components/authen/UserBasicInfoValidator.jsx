const defaultErrors = {
  tagList: [],
  expertise: [],
  skills: []
};

class UserBasicInfoValidator {
  static validateFirstName(state, errors) {
    const { firstName } = state;
    const key = Object.keys({ firstName })[0];
    if (firstName === undefined || firstName.length < 1) {
      errors[key].push("First name is reuiqred.");
    }
  }

  static validateLastName(state, errors) {
    const { lastName } = state;
    const key = Object.keys({ lastName })[0];
    if (lastName === undefined || lastName.length < 1) {
      errors[key].push("Last name is required.");
    }
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
      this.validateFirstName(state, errors);
      this.validateLastName(state, errors);
      this.validateCheckedAgreeCondition(state, errors);

      if (this.isValidatePass(errors)) {
        resolve(errors);
      } else {
        reject(errors);
      }
    });
    return promise;
  }
}

export default UserBasicInfoValidator;
export { UserBasicInfoValidator, defaultErrors };
