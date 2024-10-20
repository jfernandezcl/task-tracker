export const usersValidations = (data) => {
  const usersName = /^[a-z]{6,}$/ // Al menos tien que ser 6 letras minúsculas
  const usersPassword = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,}$ / // 8 caracteres, una mayúscula y un número

  if (!usersName.test(data.usersName)) {
    throw new Error('The username must be at least 6 lowercase letters.')
  }

  if (!usersPassword.test(data.usersPassword)) {
    throw new Error('The password must be at least 8 characters long, include a capital letter and at least one number.')
  }
}