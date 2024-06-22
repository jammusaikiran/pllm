import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SearchByName from './SearchByName';
import SearchByConst from './SearchByConst';
import SentimentBarGraph from './SentimentBarGraph';
function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <NavBar openChat={openChat} /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/searchbyname" element={<SearchByName />} />
          <Route path="/searchbyconst" element={<SearchByConst />} />
          <Route path="/sentimentanalysis" element={<SentimentBarGraph/>}/>

        </Routes>
        {/* Add your Chatbot component here if necessary */}
      </div>
    </Router>
  );
}

export default App;