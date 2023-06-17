import bcrypt from "bcrypt";

export const validatePassword = (hash: string, password: string) => {
  let data = bcrypt
    .compare(password, hash)
    .then(data => {
      return data;
    })
  return data;
};

module.exports = validatePassword;