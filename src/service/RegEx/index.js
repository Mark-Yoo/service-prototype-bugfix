export const emailRegex = new RegExp(
  '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
);

export const passwordRegex = new RegExp(
  '^(?=.*d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$',
);
