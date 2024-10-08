import React from 'react';
import './Cube.css'; // Make sure to adjust the path if necessary
import { useNavigate } from 'react-router-dom';

const Work = () => {
  const navigate = useNavigate();

  return (
    <div className="square-container">
      <div className="square-item loksabha2024" onClick={() => navigate('/partieslist')}>Know More About Parties</div>
      <div className="square-item constituencies" onClick={() => navigate('/searchbyconst')}>Constituencies</div>
      <div className="square-item candidates" onClick={() => navigate('/searchbyname')}>Candidates Details</div>
      <div
        className="square-item voter-registration"
        onClick={() => navigate('/sentimentanalysis')}>
        Sentimental Analysis of LokSabha2024 Elections
      </div>
      <div className="square-item election-updates" onClick={() => navigate('/upload')}>Party Symbol Recognition</div>
    </div>
  );
};

export default Work;
