import logo from '../images/logo_vector.svg';
import { Switch, Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      <Switch>
        <Route exact path='/sign-up'>
          <Link to="sign-in" className="header__action">
            Войти
          </Link>
        </Route>
        <Route exact path='/sign-in'>
          <Link to="sign-up" className="header__action">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__auth">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__action" onClick={props.onSignOut}>
              Выйти
            </Link> 
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;