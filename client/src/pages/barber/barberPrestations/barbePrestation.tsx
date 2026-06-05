import usePrestations from "../../../hooks/usePrestations";
import "./barberPrestation.css";

function BarberPrestation() {
  const prestations = usePrestations();

  return (
    <div className="barber-prestation">
      <h2 className="barber-prestation__title">Mes prestations</h2>
      <ul className="barber-prestation__list">
        {prestations.map((p) => (
          <li className="barber-prestation__item" key={p.Id_prestation}>
            <span className="barber-prestation__name">{p.name}</span>
            <span className="barber-prestation__duration">
              {p.duration_minutes} min
            </span>
            <span className="barber-prestation__price">{p.price} €</span>
            <button type="button" className="barber-prestation__edit-btn">
              ✏️
            </button>
            <button type="button" className="barber-prestation__delete-btn">
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <h2 className="barber-prestation__form-title">Ajouter une prestation</h2>
      <form className="barber-prestation__form">
        <label className="barber-prestation__label" htmlFor="name">
          Nom de la prestation{" "}
        </label>
        <input
          id="name"
          className="barber-prestation__input"
          type="text"
          placeholder="Ex : Coupe + Soin"
        />

        <label className="barber-prestation__label" htmlFor="duration">
          Durée (minutes)
        </label>
        <input
          id="duration"
          className="barber-prestation__input"
          type="number"
          placeholder="Ex : 30"
        />

        <label className="barber-prestation__label" htmlFor="price">
          Prix (€)
        </label>
        <input
          id="price"
          className="barber-prestation__input"
          type="number"
          placeholder="Ex : 25"
        />

        <div className="barber-prestation__actions">
          <button type="button" className="barber-prestation__cancel-btn">
            Annuler
          </button>
          <button type="submit" className="barber-prestation__submit-btn">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default BarberPrestation;