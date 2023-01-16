import { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form action="submit" className="auth__form" onSubmit={handleSubmit}>
          <input 
            type="text"
            name="email"
            required
            className="auth__input"
            placeholder="Email"
            value={email || ""}
            onChange={handleEmail}
          />
          <input 
            type="password"
            name="password"
            required
            className="auth__input"
            placeholder="Пароль"
            value={password || ""}
            onChange={handlePassword}
          />
          <button className="auth__submit">Войти</button>
        </form>
      </div>
    </div>
  )
}