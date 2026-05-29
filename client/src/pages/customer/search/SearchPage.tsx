import "./SearchPage.css";
import BarberCard from "../../../components/customer/Services/BarberCard/BarberCard";

function SearchPage() {
  const barbers = [
    {
      id: 1,
      name: "The Barber Shop",
      rating: 4.8,
      reviews: 156,
      city: "75002 Paris",
      distance: "1,2 km",
      image: "/images/Afro.jpg",
    },

    {
      id: 2,
      name: "Le Barbier Paris",
      rating: 4.5,
      reviews: 84,
      city: "75011 Paris",
      distance: "1,6 km",
      image: "/images/coiffeforall.jpg",
    },
  ];

  return (
    <main className="Search">
      {barbers.map((barber) => (
        <BarberCard key={barber.id} barber={barber} />
      ))}
      ;
    </main>
  );
}

export default SearchPage;
