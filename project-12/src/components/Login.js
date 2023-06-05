import React from 'react';


const Login = (props) => {

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
    props.onLogin(email, pass);
  }

  return (
    <main className="account">
      <h1 className="account__title">Вход</h1>
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
        <button type="submit" className="accoun__btn">Войти</button>
      </form>
    </main>
  )
}

export default Login;

