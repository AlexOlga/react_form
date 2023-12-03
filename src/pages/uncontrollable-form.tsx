import { useRef, useState } from 'react';
import * as yup from 'yup';
import { useAppDispatch } from '../store/hooks';
import { schema } from './schema-vaidate';
import Autocomplete from '../components/autocomplit/Autocomplete';
import { ERRORS_MESSAGE, IFormData, MAX_IMAGE_SIZE } from '../types';
import { setData } from '../store/dataFormSlice';
import { useNavigate } from 'react-router-dom';
interface StringDictionary {
  [index: string]: string;
}
function UncontrollableForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [country, setCountry] = useState('');
  const [foto, setFoto] = useState<FileList>();
  const [errorSize, setErrorSize] = useState<string | null>(null);
  const [errors, setErrors] = useState<StringDictionary>();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dublePasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const chekRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: IFormData = {
      name: nameRef.current?.value ? nameRef.current?.value : '',
      age: ageRef.current?.value ? parseInt(ageRef.current?.value) : 0,
      email: emailRef.current?.value ? emailRef.current?.value : '',
      password: passwordRef.current?.value ? passwordRef.current?.value : '',
      dublePassword: passwordRef.current?.value
        ? passwordRef.current?.value
        : '',
      gender: genderRef.current?.value ? genderRef.current?.value : '',
      country: country,
      chek: chekRef.current?.value ? Boolean(chekRef.current?.value) : false,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      // проверяем файл
      let base64Data: string;
      // проверяем файл
      if (!foto || foto[0].size > MAX_IMAGE_SIZE) {
        setErrorSize(ERRORS_MESSAGE.invalidFoto);
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(foto[0]);
        reader.onload = () => {
          base64Data = reader.result as string;
          const newData = {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            country: country,
            chek: formData.chek,
            foto: base64Data,
          };
          dispatch(setData(newData));
          navigate('/');
          setErrorSize(null);
        };
      }
    } catch (err) {
      const newErrors: StringDictionary = {};
      err.inner.forEach((e: yup.ValidationError) => {
        if (e.path) newErrors[e.path] = e.message;
        setErrors(newErrors);
      });
    }
    console.log(errors);
  };

  function handelFile(e: React.ChangeEvent<HTMLInputElement>) {
    const curFiles = e.target.files as FileList;
    if (curFiles) setFoto(curFiles);
  }

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <label>
        First Name:
        <input name="name" ref={nameRef} placeholder="Enter your name" />
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.name && (
            <div className="errors-text">{errors.name}</div>
          )}
        </div>
      }
      <label>
        Age:
        <input type="number" ref={ageRef} placeholder="Enter your age" />
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.age && (
            <div className="errors-text">{errors.age}</div>
          )}
        </div>
      }
      <label>
        Email:
        <input type="email" ref={emailRef} placeholder="Email" />
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.email && (
            <div className="errors-text">{errors.email}</div>
          )}
        </div>
      }
      <label>
        Passwords:
        <input type="password" ref={passwordRef} placeholder="Password" />
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.password && (
            <div className="errors-text">{errors.password}</div>
          )}
        </div>
      }
      <label>
        Password confirmation:
        <input type="password" ref={dublePasswordRef} placeholder="Password" />
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.dublePassword && (
            <div className="errors-text">{errors.dublePassword}</div>
          )}
        </div>
      }

      <label>
        Gender Selection:
        <select ref={genderRef}>
          <option value=""></option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.gender && (
            <div className="errors-text">{errors.gender}</div>
          )}
        </div>
      }
      <label>
        Accept T&C
        <input type="checkbox" ref={chekRef}></input>
      </label>
      {
        <div className="errors-wrapper">
          {' '}
          {errors && errors.chek && (
            <div className="errors-text">{errors.chek}</div>
          )}
        </div>
      }
      <label>
        Foto:
        <input type="file" accept="image/*" onChange={handelFile}></input>
        {errorSize && <div className="errors-text">{errorSize}</div>}
      </label>
      <Autocomplete getForm={setCountry} />
      <input type="submit" />
    </form>
  );
}

export default UncontrollableForm;
