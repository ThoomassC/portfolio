import { IconArrowUpRight } from "@tabler/icons-react";
const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-content">
      <div>
        <span className="footer-name" aria-hidden="true">
          THOMAS CARON.
        </span>
        <p>© {new Date().getFullYear()} Thomas Caron · Conçu et développé avec soin.</p>
      </div>
      <div className="footer-links">
        <a href="#accessibilite">Accessibilité</a>
        <a href="#contenu-principal">
          Retour en haut
          <IconArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);
export default Footer;
