const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-content">
      <p>© {new Date().getFullYear()} Thomas Caron</p>
      <div className="footer-links">
        <a href="#accessibilite">Accessibilité</a>
        <a href="#contenu-principal">Retour en haut de page</a>
      </div>
    </div>
  </footer>
);

export default Footer;
