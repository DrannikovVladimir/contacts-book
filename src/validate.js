import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Имя должно быть больше 3 символов')
    .max(15, 'Имя должно быть меньше 15 символов')
    .required('Обязательное поле'),
  lastName: Yup.string()
    .min(3, 'Фамилия должна быть больше 3 символов')
    .max(15, 'Фамилия должна быть меньше 15 символов')
    .required('Обязательное поле'),
  phoneNumber: Yup.string()
    .required('Обязательное поле'),
});

export default validationSchema;
