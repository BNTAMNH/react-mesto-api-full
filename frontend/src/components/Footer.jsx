function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
      <footer className="footer">
        <p className="footer__copyright">&copy; {currentYear} Mesto Russia</p>
      </footer>
  );
}

export default Footer;