import "./BarberParametre.css";

function BarberParametre() {
  return (
    <main className="barberParametre">
      <div className="barberParametre__header">
        <h1>Paramètres</h1>

        <p>Gérez votre compte et contactez notre équipe si besoin.</p>
      </div>

      <section className="barberParametre__support">
        <div className="barberParametre__supportContent">
          <h2>Support</h2>

          <p>
            Une question ou un problème ? Notre équipe est disponible pour vous
            aider.
          </p>

          <button
            type="button"
            className="barberParametre__supportButton"
            onClick={() => {
              window.location.href = "mailto:contact@secare.com";
            }}
          >
            Contacter le support
          </button>
        </div>
      </section>

      <section className="barberParametre__danger">
        <span className="barberParametre__badge">Zone sensible</span>

        <h2>Supprimer mon compte</h2>

        <p>Cette action est définitive et supprimera toutes vos données.</p>

        <ul>
          <li>Informations personnelles</li>
          <li>Disponibilités</li>
          <li>Service</li>
          <li>Réservations</li>
          <li>Avis et commentaires</li>
        </ul>

        <button type="button" className="barberParametre__deleteButton">
          Supprimer mon compte
        </button>
      </section>
    </main>
  );
}

export default BarberParametre;
