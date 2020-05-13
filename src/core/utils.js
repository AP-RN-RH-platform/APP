export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};
export const passwordValidationValidator = (password, passwordValidation) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';
  if (!password || password !== passwordValidation) return 'Password are not the same';
  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
export const FistnameValidator = name => {
  if (!firstname || firstname.length <= 0) return 'FirstName cannot be empty.';

  return '';
};
export const LastnameValidator = name => {
  if (!lastname || lastname.length <= 0) return 'FirstName cannot be empty.';

  return '';
};
