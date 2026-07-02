import "./Footer.css";
import { FiMail, FiMapPin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h3 className="footer__brand-name">Secare</h3>

          <p className="footer__description">
            Secare est une plateforme de réservation de services de coiffure en
            ligne, offrant aux clients la possibilité de trouver et de réserver
            des rendez-vous avec des coiffeurs professionnels.
          </p>
        </div>

        <div className="footer__column">
          <h4 className="footer__column-links">Navigation</h4>

          <a href="/" className="footer__link">
            Accueil
          </a>
          <a href="/search" className="footer__link">
            Coiffeurs
          </a>
          <a href="/login" className="footer__link">
            Réservations
          </a>
        </div>

        <div className="footer__column">
          <h4 className="footer__column-contact">Contact</h4>

          <p className="footer__contact-item">
            <FiMail />
            contact@secare.fr
          </p>

          <p className="footer__contact-item">
            <FiMapPin /> 123 Rue de la Paix, 75000 Paris
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Secare — Tous droits réservés.
      </div>
    </footer>
  );
}
export default Footer;
