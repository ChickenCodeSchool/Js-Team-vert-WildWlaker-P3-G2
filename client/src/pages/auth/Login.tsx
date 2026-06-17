import { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiScissors,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router";

import "./Login.css";

type Tab = "connexion" | "inscription";

const Login = () => {
  const [activeTab, setActiveTab] = useState<Tab>("connexion");
  const [isPro, setIsPro] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isPro) {
      navigate("/barber/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleRegister = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <div className="login__header">
        <FiScissors className="login__icon" />
        <h1 className="login__brand">SECARE</h1>
        <span className="login__tagline">Votre coiffeur à domicile</span>
      </div>

      <div className="login__tabs">
        <button
          type="button"
          className={`login__tab${activeTab === "connexion" ? " login__tab--active" : ""}`}
          onClick={() => setActiveTab("connexion")}
        >
          Connexion
        </button>
        <button
          type="button"
          className={`login__tab${activeTab === "inscription" ? " login__tab--active" : ""}`}
          onClick={() => setActiveTab("inscription")}
        >
          Inscription
        </button>
      </div>

      {activeTab === "connexion" && (
        <div className="login__form">
          <div className="login__input-wrapper">
            <FiMail className="login__input-icon" />
            <input
              className="login__input"
              type="text"
              placeholder="Email ou téléphone"
            />
          </div>

          <div className="login__input-wrapper">
            <FiLock className="login__input-icon" />
            <input
              className="login__input"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
            />
            <button
              type="button"
              className="login__eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <span className="login__forgot">Mot de passe oublié ?</span>

          <button
            type="button"
            className={`login__pro-toggle${isPro ? " login__pro-toggle--active" : ""}`}
            onClick={() => setIsPro(!isPro)}
          >
            {isPro ? "Espace professionnel" : "Vous êtes un professionnel ?"}
          </button>

          <button className="login__btn" type="button" onClick={handleLogin}>
            Se connecter
          </button>
        </div>
      )}

      {activeTab === "inscription" && (
        <div className="login__form">
          <div className="login__input-wrapper">
            <FiUser className="login__input-icon" />
            <input className="login__input" type="text" placeholder="Prénom" />
          </div>

          <div className="login__input-wrapper">
            <FiUser className="login__input-icon" />
            <input className="login__input" type="text" placeholder="Nom" />
          </div>

          <div className="login__input-wrapper">
            <FiMail className="login__input-icon" />
            <input className="login__input" type="text" placeholder="Email" />
          </div>

          <div className="login__input-wrapper">
            <FiLock className="login__input-icon" />
            <input
              className="login__input"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
            />
            <button
              type="button"
              className="login__eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <div className="login__input-wrapper">
            <FiLock className="login__input-icon" />
            <input
              className="login__input"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
            />
            <button
              type="button"
              className="login__eye-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <button className="login__btn" type="button" onClick={handleRegister}>
            S'inscrire
          </button>
        </div>
      )}

      <div className="login__divider">
        <span className="login__divider-text">ou continuer avec</span>
      </div>

      <div className="login__social">
        <button className="login__social-btn" type="button">
          <svg
            className="login__google-icon"
            viewBox="0 0 48 48"
            aria-label="Google"
          >
            <title>Google</title>
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;
