import {
  SubmitHandler,
  useForm,
  useController,
  Controller,
} from 'react-hook-form';
import { ERRORS_MESSAGE, IFormData } from '../types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import './controlled.css';
import { useAppDispatch } from '../store/hooks';
import { setData } from '../store/dataFormSlice';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../components/autocomplit/Autocomplete';

function ControlledForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //
  const schema = yup
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
      gender: yup.string().required(ERRORS_MESSAGE.required),
      dublePassword: yup
        .string()
        .oneOf([yup.ref('password')], ERRORS_MESSAGE.invalidDublePass)
        .required(ERRORS_MESSAGE.required),
      chek: yup
        .boolean()
        .required(ERRORS_MESSAGE.required)
        .oneOf([true], ERRORS_MESSAGE.invalideChek),
      country: yup.string().required(ERRORS_MESSAGE.required),
    })
    .required();

  //
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
    reset,
  } = useForm<IFormData>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const { field } = useController({
    control,
    name: 'gender',
    defaultValue: '', // Set the default value of the select field
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(data);
    // файл
    if (data.foto) {
      const reader = new FileReader();
      reader.readAsDataURL(data.foto[0]);
      reader.onload = () => {
        const base64Data = reader.result as string;

        const newData = {
          name: data.name,
          age: data.age,
          email: data.email,
          password: data.password,
          gender: data.gender,
          country: data.country,
          chek: data.chek,
          foto: base64Data,
        };
        dispatch(setData(newData));
      };
    } else {
      const newData = {
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        country: data.country,
        chek: data.chek,
        foto: null,
      };
      dispatch(setData(newData));
    }

    reset();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
      <label>
        First Name:
        <input {...register('name')} placeholder="Enter your name" />
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.name && (
          <div className="errors-text">{errors.name.message}</div>
        )}
      </div>
      <label>
        Age:
        <input
          type="number"
          {...register('age')}
          placeholder="Enter your age"
        />
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.age && <div className="errors-text">{errors.age.message}</div>}
      </div>
      <label>
        Email:
        <input type="email" {...register('email')} placeholder="Email" />
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.email && (
          <div className="errors-text">{errors.email.message}</div>
        )}
      </div>
      <label>
        Passwords:
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
        />
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.password && (
          <div className="errors-text">{errors.password.message}</div>
        )}
      </div>
      <label>
        Password confirmation:
        <input
          type="password"
          {...register('dublePassword')}
          placeholder="Password"
        />
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.dublePassword && (
          <div className="errors-text">{errors.dublePassword.message}</div>
        )}
      </div>

      <label>
        Gender Selection:
        <select {...field}>
          <option value=""></option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.gender && (
          <div className="errors-text">{errors.gender.message}</div>
        )}
      </div>
      <label>
        Accept T&C
        <input type="checkbox" {...register('chek')}></input>
      </label>
      <div className="errors-wrapper">
        {' '}
        {errors.chek && (
          <div className="errors-text">{errors.chek.message}</div>
        )}
      </div>
      <label>
        Foto:
        <input
          type="file"
          accept="image/*"
          {...(register('foto'), { require: true })}
        ></input>
        {errors.foto && (
          <div className="errors-text">{errors.foto.message}</div>
        )}
      </label>
      <Controller
        control={control}
        name={'country'}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <Autocomplete getForm={onChange} />
            {error && <div className="errors-text">{error.message}</div>}
          </>
        )}
      />
      <input type="submit" disabled={!isValid} />
    </form>
  );
}

export default ControlledForm;
