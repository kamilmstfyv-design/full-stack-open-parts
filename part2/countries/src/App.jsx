import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setInformation(response.data));
  }, []);
  const filteredList = information.filter((list) =>
    list.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const onshowClick = (countrieName) => {
    setSearch(countrieName);
  };

  const resultofSearch = () => {
    if (filteredList.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredList.length <= 10 && filteredList.length > 1) {
      return (
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {filteredList.map((list) => (
            <li key={list.name.common}>
              {list.name.common}{" "}
              <button onClick={() => onshowClick(list.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      );
    } else if (filteredList.length === 1) {
      return (
        <>
          <h1>{filteredList[0].name.common}</h1>
          <p>Capital {filteredList[0].capital}</p>
          <p>
            <strong>Languages</strong>
          </p>
          <ul>
            {Object.values(filteredList[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={filteredList[0].flags.png}
            alt={filteredList[0].flags.alt || "Country flag"}
            style={{ width: "150px", marginTop: "15px" }}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
        />
      </p>
      {resultofSearch()}
    </div>
  );
};

export default App;
