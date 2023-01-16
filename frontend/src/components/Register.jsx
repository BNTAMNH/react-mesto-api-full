import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form action="submit" className="auth__form" onSubmit={handleSubmit}>
          <input 
            name="email"
            type="text"
            required 
            className="auth__input"
            placeholder="Email"
            onChange={handleEmail}
            value={email || ""}
          />
          <input 
            name="password"
            type="password"
            required 
            className="auth__input"
            placeholder="Пароль"
            onChange={handlePassword}
            value={password || ""}
          />
          <button className="auth__submit">Зарегистрироваться</button>
        </form>
        <p className="auth__question">
          Уже зарегистрированы?
          <Link to="sign-in" className="auth__link-login">Войти</Link>
        </p>
      </div>
    </div>
  )
}