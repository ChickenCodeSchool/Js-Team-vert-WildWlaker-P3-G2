import "./Search.css";
import { IoIosSearch } from "react-icons/io";

function Search() {
  return (
    <div className="search_bar">
      <IoIosSearch className="searchbar_icon" />
      <input
        type="text"
        placeholder="Rechercher un coiffeur, une ville..."
        className="searchbar_input"
      />
    </div>
  );
}

export default Search;
