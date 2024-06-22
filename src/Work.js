// Work.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Cube.css';// Make sure to adjust the path if necessary

const Work = () => {
  return (
    <div className="square-container">
      <div className="square-item loksabha2024">Loksabha Elections 2024 Analysis</div>
      <Link to='/searchbyconst'><div className="square-item constituencies">Constituencies</div></Link>
      <Link to="/searchbyname"><div className="square-item candidates">Candidates Details</div></Link>
      <Link to="/sentimentanalysis"><div
        className="square-item voter-registration">
        Sentimental Analysis of LokSabha2024 Elections
      </div></Link>
      <div className="square-item election-updates">Election Updates</div>
    </div>
  );
};

export default Work;
