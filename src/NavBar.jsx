import React, { useState } from 'react';
import './NavBar.css';
import Loader from './Loader';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    const userMessage = userInput;
    setUserInput(''); // Clear input field
    setChatHistory([
      ...chatHistory,
      { type: 'user', message: userMessage },
    ]);

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/chat', {  // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userMessage }),
      });

      const data = await response.json();
      const botMessage = data.response;

      setChatHistory([
        ...chatHistory,
        { type: 'user', message: userMessage },
        { type: 'bot', message: botMessage },
        
      ]);
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([
        ...chatHistory,
        { type: 'user', message: userMessage },
        { type: 'bot', message: 'Sorry, something went wrong. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/">P-LLM</a>
          </div>
          <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <a href="/" className="nav-item">Home</a>
            <a href="/about" className="nav-item">About</a>
            <a href="/services" className="nav-item">Services</a>
            <a href="/contact" className="nav-item">Contact</a>
            {/* <a href="/c" className="chat-button" onClick={toggleChat}>Chat bot</a> */}
          </div>
          <button className="chat-button" onClick={toggleChat}>Chat with us</button>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="navbar-toggle-icon"></span>
            <span className="navbar-toggle-icon"></span>
            <span className="navbar-toggle-icon"></span>
          </div>
        </div>

      </nav>
      
      {isChatOpen && (
        <div id="chat-container">
          <h1>Chatbot</h1>
          <button onClick={handleCloseChat}>Close Chat</button> 
          <div id="chat-history">
            {chatHistory.map((entry, index) => (
              <div key={index} className={`${entry.type}-message`}>
                {entry.message}
              </div>
            ))}
          </div>
          <form id="chat-form" onSubmit={sendMessage}>
            <input
              type="text"
              id="user-input"
              placeholder="Enter your message"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>Send</button>
          </form>
          {loading && (
            
            <div className='chatbot-loader'></div>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;
