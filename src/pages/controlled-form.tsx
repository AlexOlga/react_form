import React from 'react';
import Autocomplete from '../components/autocomplit/Autocomplete';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormFilds } from '../types';
import './controlled.css';

function ControlledForm() {
  const { register, handleSubmit } = useForm<IFormFilds>();
  const onSubmit: SubmitHandler<IFormFilds> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
      <label>
        First Name:
        <input {...register('name')} />
      </label>
      <label>
        Age:
        <input type="number" {...register('age')} />
      </label>
      <label>
        Email:
        <input type="email" {...register('email')} />
      </label>
      <label>
        Passwords:
        <input type="password" {...register('password')} />
      </label>
      <label>
        Gender Selection:
        <select {...register('gender')}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      </label>
      <label>
        Accept T&C
        <input type="checkbox" {...register('chek')}></input>
      </label>
      <label>
        Foto
        <input type="file" {...register('foto')}></input>
      </label>
      <label htmlFor="contry">Contry:</label>
      <Autocomplete />

      <input type="submit" />
    </form>
  );
}

export default ControlledForm;
