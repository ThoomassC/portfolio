import { IconArrowUp } from "@tabler/icons-react";

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-content">
      <p>© {new Date().getFullYear()} Thomas Caron · Développé à la main et avec IA.</p>
      <div className="footer-links">
        <span>Rouen</span>
        <a href="#contenu-principal">
          Retour en haut
          <IconArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  </footer>
);
export default Footer;
