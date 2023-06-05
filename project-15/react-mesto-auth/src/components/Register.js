import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = (props) => {

  // делаем управляемые поля ввода
  // переменным состояния нужно задать начальное начение, иначе неуправляемый компонент
  const [email, setEmail] = React.useState(' ');
  const [pass, setPass] = React.useState(' ');

  // обработчик изменения в input
  const handleChangeInput = (evt) => {
    if (evt.target.name === 'email') setEmail(evt.target.value)
    else setPass(evt.target.value);
  }
  // обработчик сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onReg(email, pass);
  }

  return (

    <main className="account">
      <h1 className="account__title">Регистрация</h1>
      <form
        className="account__form"
        onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="account__input"
          placeholder="Email"
          onChange={handleChangeInput} />
        <input
          type="password"
          name="password"
          className="account__input"
          placeholder="Пароль"
          onChange={handleChangeInput} />
        <button type="submit" className="accoun__btn">Зарегистрироваться</button>
      </form>
      <div className="account__alter">
        <span>Уже зарегистрированы?</span>
        <Link to="/sign-in" className="account__link">Войти</Link>
      </div>
    </main>

  )
}

export default Register;








