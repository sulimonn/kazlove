// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
  if (count < 2) return { label: 'Слабо', color: 'error.main' };
  if (count < 3) return { label: 'Средне', color: 'warning.main' };
  if (count < 4) return { label: 'Нормально', color: 'warning.dark' };
  if (count < 5) return { label: 'Хорошо', color: 'success.main' };
  if (count < 6) return { label: 'Отлично', color: 'success.dark' };
  return { label: 'Слабо', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
export const maskEmail = (email) => {
  const [localPart, domain] = email.split('@');
  const maskedLocal = localPart.slice(0, 3) + '*****'; // Mask part of the local part
  return `${maskedLocal}@${domain}`;
};
