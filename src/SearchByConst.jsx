import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './CsvDisplay.css'; 

const SearchByConst = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    Papa.parse('https://raw.githubusercontent.com/jammusaikiran/Candidate-details/main/election_2024_data.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredSuggestions = data
        .filter((row) => row.constituency && row.constituency.toLowerCase().includes(query.toLowerCase()))
        .map((row) => row.constituency)
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    const filteredData = data.filter(
      (row) => row.constituency && row.constituency.toLowerCase() === suggestion.toLowerCase()
    );
    setResults(filteredData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredData = data.filter(
      (row) => row.constituency && row.constituency.toLowerCase() === searchQuery.toLowerCase()
    );
    setResults(filteredData);
  };

  return (
    <div className="csv-display">
      <h1>Search Constituency</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter constituency name"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {results.length > 0 && (
        <div className="table-container">
          <h2>Search Results</h2>
          <table>
            <thead>
              <tr>
                <th>Constituency</th>
                <th>State</th>
                <th>Image</th>
                <th>Status</th>
                <th>Vote</th>
                <th>Margin</th>
                <th>Candidate</th>
                <th>Party</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  <td>{row.constituency}</td>
                  <td>{row.state}</td>
                  <td><img src={row.Image} alt={row.Candidate} width="50" /></td>
                  <td>{row.status}</td>
                  <td>{row.Vote}</td>
                  <td>{row.Margin}</td>
                  <td>{row.Candidate}</td>
                  <td>{row.Party}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchByConst;