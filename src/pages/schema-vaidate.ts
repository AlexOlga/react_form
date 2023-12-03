import * as yup from 'yup';
import { ERRORS_MESSAGE } from '../types';

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required(ERRORS_MESSAGE.required)
      .test(
        'is-first-letter-uppercased',
        'First letter must be uppercased',
        (value) => {
          if (value) return value[0] === value[0].toUpperCase();
          return false;
        }
      ),
    age: yup
      .number()
      .positive(ERRORS_MESSAGE.invalidAge)
      .integer(ERRORS_MESSAGE.invalidAge)
      .required(ERRORS_MESSAGE.required),
    email: yup
      .string()
      .email(ERRORS_MESSAGE.invalidEmail)
      .required(ERRORS_MESSAGE.required),
    password: yup
      .string()
      .required(ERRORS_MESSAGE.required)
      .matches(
        /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{4,}/,
        ERRORS_MESSAGE.invalidPassword
      ),
    dublePassword: yup
      .string()
      .oneOf([yup.ref('password')], ERRORS_MESSAGE.invalidDublePass)
      .required(ERRORS_MESSAGE.required),
    chek: yup
      .boolean()
      .required(ERRORS_MESSAGE.required)
      .oneOf([true], ERRORS_MESSAGE.invalideChek),
    gender: yup.string().required(ERRORS_MESSAGE.required),
  })
  .required();
