import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import './CsvDisplay.css'; // Import the CSS file

const SearchByName = () => {
  const [csvData, setCsvData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/jammusaikiran/Candidate-details/main/election_2024_data.csv');
        const results = Papa.parse(response.data, { header: true });
        setCsvData(results.data);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const upperCaseQuery = searchQuery.toUpperCase();
    const candidate = csvData.find(row => row.Candidate && row.Candidate.toUpperCase() === upperCaseQuery);
    if (candidate) {
      setSearchResults([candidate]);
    } else {
      const candidatesInConstituency = csvData.filter(row => row.constituency && row.constituency.toUpperCase() === upperCaseQuery);
      setSearchResults(candidatesInConstituency);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSearchQuery(value);
    if (value) {
      const filteredSuggestions = csvData
        .filter(row => 
          (row.Candidate && row.Candidate.toUpperCase().includes(value)) || 
          (row.constituency && row.constituency.toUpperCase().includes(value))
        )
        .map(row => `${row.Candidate} (${row.constituency})`);
      
      const uniqueSuggestions = Array.from(new Set(filteredSuggestions));
      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedValue = suggestion.split(' (')[0].toUpperCase(); // Extract the candidate or constituency name
    setSearchQuery(selectedValue);
    setSuggestions([]);
    handleSearch();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="csv-display">
      <h1> Candidate Details</h1>
      {/* <Link to="/searchbyconst"><button className='searchbyconst'>SearchByConst</button></Link> */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Enter candidate name or constituency" 
          value={searchQuery}
          onChange={handleInputChange}
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

      {searchResults.length > 0 ? (
        <div className="table-container" style={{alignItems:'center'}}>
          <h2>Search Results</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(searchResults[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchResults.map((candidateDetails, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(candidateDetails).map(([key, value], index) => (
                    <td key={index}>
                      {key.toLowerCase() === 'image' ? (
                        <img src={value} alt="Candidate" />
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        searchQuery && <p>No results found</p>
      )}
    </div>
  );
};

export default SearchByName;