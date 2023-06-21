import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Country from "./components/Country";
function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchCountry = (event) => {
    console.log(filteredCountries);
    setSearchCountry(event.target.value);
  };
  const handleShow = (countryName) => {
    setSearchCountry(countryName);
  };
  const fetchCountry = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  };
  useEffect(fetchCountry, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );
  return (
    <div>
      <Search
        searchCountry={searchCountry}
        handleSearchCountry={handleSearchCountry}
      />
      <Country
        countries={filteredCountries}
        searchCountry={searchCountry}
        handleShow={handleShow}
      />
    </div>
  );
}

export default App;
