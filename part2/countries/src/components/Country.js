import CountryWeather from "./CountryWeather.js";
const Country = ({ countries, searchCountry, handleShow }) => {
  if (searchCountry === "") {
    return <p>Enter a country to search</p>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShow(country.name.common)}>
                {" "}
                Show
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else if (countries.length === 1) {
    return (
      <>
        <h1>{countries[0].name.common}</h1>
        <p> Capital: {countries[0].capital}</p>
        <p> Area: {countries[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(countries[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        <CountryWeather
          capital={countries[0].capital}
          latitude={countries[0].capitalInfo.latlng[0]}
          longitude={countries[0].capitalInfo.latlng[1]}
        />
      </>
    );
  }
};
export default Country;
