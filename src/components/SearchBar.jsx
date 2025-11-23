import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchLocations = async (query) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=8&language=en&format=json`
      );
      const data = await response.json();
      setResults(data.results || []);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    searchLocations(value);
  };

  const handleSelect = (result) => {
    const name = result.admin1
      ? `${result.name}, ${result.admin1}`
      : result.name;
    setInput(name);
    setShowResults(false);
    onSearch(result.latitude, result.longitude, name);
  };

  const handleFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city..."
          value={input}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        {loading && <span className="search-loader">⟳</span>}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result, idx) => (
            <button
              key={idx}
              className="search-result-item"
              onClick={() => handleSelect(result)}
            >
              <span className="result-name">
                {result.admin1
                  ? `${result.name}, ${result.admin1}`
                  : result.name}
              </span>
              <span className="result-country">{result.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
