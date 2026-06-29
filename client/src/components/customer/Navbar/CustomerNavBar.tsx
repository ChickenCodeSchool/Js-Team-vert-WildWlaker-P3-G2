import "./CustomerNavbar.css";
import {
  FiCalendar,
  FiHome,
  FiPlus,
  FiSearch,
  FiUser,
  FiScissors,
} from "react-icons/fi";
// FiSearch gardé pour la navbar mobile
import { NavLink, Link } from "react-router";

function CustomerNavBar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const userInitials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : null;

  return (
    <>
      {/* ── Navbar desktop (top) ── */}
      <nav className="navbar-desktop">
        <div className="navbar-desktop__inner">
          <Link to="/" className="navbar-desktop__brand">
            <div className="navbar-desktop__logo-icon">
              <FiScissors />
            </div>
            <span className="navbar-desktop__brand-name">Secare</span>
          </Link>

          <div className="navbar-desktop__links">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "navbar-desktop__link navbar-desktop__link--active"
                  : "navbar-desktop__link"
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive
                  ? "navbar-desktop__link navbar-desktop__link--active"
                  : "navbar-desktop__link"
              }
            >
              Coiffeurs
            </NavLink>
            <span className="navbar-desktop__link">Services</span>
            <NavLink
              to={user ? `/reservations/${user.id}` : "/login"}
              className={({ isActive }) =>
                isActive
                  ? "navbar-desktop__link navbar-desktop__link--active"
                  : "navbar-desktop__link"
              }
            >
              Réservations
            </NavLink>
          </div>

          <div className="navbar-desktop__actions">
            <Link to="/booking" className="navbar-desktop__btn">
              Réserver
            </Link>
            {userInitials ? (
              <div className="navbar-desktop__avatar">{userInitials}</div>
            ) : (
              <Link to="/login" className="navbar-desktop__login">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ── Navbar mobile (bottom) ── */}
      <nav className="navbar">
        <div className="navbar__container">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "navbar__item navbar__item--active" : "navbar__item"
            }
          >
            <FiHome className="navbar__icon" />
            <span>Accueil</span>
          </NavLink>

          <NavLink
            to="search"
            className={({ isActive }) =>
              isActive ? "navbar__item navbar__item--active" : "navbar__item"
            }
          >
            <FiSearch className="navbar__icon" />
            <span>Recherche</span>
          </NavLink>

          <NavLink
            to="booking"
            className={({ isActive }) =>
              isActive
                ? "navbar__center navbar__item--active"
                : "navbar__center"
            }
          >
            <div className="navbar__center-button">
              <FiPlus />
            </div>
            <span className="navbar__center-label">Réserver</span>
          </NavLink>

          <NavLink
            to="reservations"
            className={({ isActive }) =>
              isActive ? "navbar__item navbar__item--active" : "navbar__item"
            }
          >
            <FiCalendar className="navbar__icon" />
            <span>Reservations</span>
          </NavLink>

          <NavLink
            to={user ? `/profile/${user.id}` : "/login"}
            className={({ isActive }) =>
              isActive ? "navbar__item navbar__item--active" : "navbar__item"
            }
          >
            <FiUser className="navbar__icon" />
            <span>Profil</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default CustomerNavBar;
