import React, { useState, useEffect } from 'react';
import './NationalParties.css';

const NationalParties = () => {
  const [showList, setShowList] = useState(false);
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);

  useEffect(() => {
    fetch('/data/parties.json')
      .then(response => response.json())
      .then(data => setParties(data))
      .catch(error => console.error('Error fetching the party data:', error));
  }, []);

  const handleButtonClick = () => {
    setShowList(!showList);
    setSelectedParty(null); // Reset selected party when toggling list
  };

  const handlePartyClick = (party) => {
    setSelectedParty(party);
  };

  return (
    <div className="container">
      {/* Left Column */}
      <div className="leftColumn">
        <button className="button" onClick={handleButtonClick}>
          List of National Parties
        </button>
        {showList && (
          <ul className="list">
            {parties.map((party) => (
              <li
                key={party.name}
                className="listItem"
                onClick={() => handlePartyClick(party)}
              >
                {party.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Right Column */}
      <div className="rightColumn">
        {selectedParty && (
          <div className="partyDetails">
            <h2 className="partyName">{selectedParty.name}</h2>
            <p className="partyDescription">{selectedParty.details}</p>
            <img
              src={selectedParty.symbol}
              alt={`${selectedParty.name} symbol`}
              className="partyImage"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalParties;
