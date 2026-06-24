import "./CustomerNavbar.css";
import { useState } from "react";
import {
  FiBell,
  FiCalendar,
  FiHome,
  FiPlus,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { NavLink } from "react-router";
import useNotifications from "../../../hooks/useNotifications";

const CUSTOMER_ID = Number(localStorage.getItem("customer_id") ?? "2");

function CustomerNavBar() {
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotifications(CUSTOMER_ID);
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      {showPanel && (
        <div className="notif-panel">
          <div className="notif-panel__header">
            <h3 className="notif-panel__title">Notifications</h3>
            <div className="notif-panel__actions">
              {unreadCount > 0 && (
                <button
                  type="button"
                  className="notif-panel__mark-all"
                  onClick={markAllRead}
                >
                  Tout lire
                </button>
              )}
              <button
                type="button"
                className="notif-panel__close"
                onClick={() => setShowPanel(false)}
                aria-label="Fermer les notifications"
              >
                <FiX />
              </button>
            </div>
          </div>

          <ul className="notif-panel__list">
            {notifications.length === 0 ? (
              <li className="notif-panel__empty">Aucune notification</li>
            ) : (
              notifications.map((n) => (
                <li
                  key={n.id_notification}
                  className={`notif-panel__item ${n.is_read ? "" : "notif-panel__item--unread"}`}
                >
                  <p className="notif-panel__message">{n.message}</p>
                  <span className="notif-panel__date">
                    {new Date(n.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {!n.is_read && (
                    <button
                      type="button"
                      className="notif-panel__read-btn"
                      onClick={() => markRead(n.id_notification)}
                    >
                      Marquer comme lu
                    </button>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <nav className="navbar">
        <div className="navbar__container">
          <NavLink
            to="/"
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

          <button
            type="button"
            className={`navbar__item navbar__item--bell ${showPanel ? "navbar__item--active" : ""}`}
            onClick={() => setShowPanel((v) => !v)}
            aria-label="Notifications"
          >
            <div className="navbar__bell-wrapper">
              <FiBell className="navbar__icon" />
              {unreadCount > 0 && (
                <span className="navbar__badge">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span>Alertes</span>
          </button>

          <NavLink
            to="profile"
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
