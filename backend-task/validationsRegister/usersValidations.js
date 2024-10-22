export const usersValidations = (data) => {
  const usersName = /^[a-zA-Z]{4,}$/;
  const usersPassword = /^.{4,}$/;
  if (!usersName.test(data.userName)) {
    throw new Error('The username must be at least 6 lowercase letters.')
  }

  if (!usersPassword.test(data.userPassword)) {
    throw new Error('The password must be at least 8 characters long, include a capital letter and at least one number.')
  }
}