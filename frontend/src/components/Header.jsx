import logo from '../images/logo_vector.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />
      
      {!props.loggedIn && location.pathname === '/sign-up' && (
        <Link to="sign-in" className="header__action">
          Войти
        </Link>
      )}
      
      {!props.loggedIn && location.pathname === '/sign-in' && (
        <Link to="sign-up" className="header__action">
          Регистрация
        </Link>
      )}

      {props.loggedIn && (
        <div className="header__auth">
          <p className="header__email">{props.email}</p>
          <Link to="/sign-in" className="header__action" onClick={props.onSignOut}>
            Выйти
          </Link>        
        </div>
      )}
    </header>
  );
}

export default Header;