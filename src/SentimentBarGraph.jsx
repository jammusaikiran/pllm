import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import Loader from './Loader';
import './Cube.css';

const Container = styled.div`
  width: 80%; /* Adjust the width as needed */
  margin: 0 auto;
  height:30px;
  padding-top:2px; /* Center the container */
`;

const Form = styled.form`
  margin-bottom: 20px;
  width:500px;
  height:30px;
  text-align:centre;

`;

const Input = styled.input`
  width: 50px; /* Decreased the width */
  padding-bottom: 15px; /* Adjusted the padding */
  
  margin-top: 20px;
 
`;

// const 

const SentimentBarGraph = () => {
  const [tweetInput, setTweetInput] = useState('');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((event) => {
    setTweetInput(event.target.value);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!tweetInput) return;

    try {
      setIsLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/add_tweets', {
        tweets: [tweetInput],
      });

      if (response.status === 200) {
        fetchChartData();
        setTweetInput('');
        console.log("Successfully added");
      }
    } catch (error) {
      console.error('Error adding tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchChartData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://127.0.0.1:5000/get_sentiment_data');
      setChartData(response.data); // Assuming response.data is an array of objects with keys: name, positive, neutral, negative
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          value={tweetInput}
          onChange={handleInputChange}
          placeholder="Enter your tweet"
        />
        <button type="submit" style={{height:30,marginTop:20}}>Add Tweet</button>
      </Form>

      {isLoading ? (
        <Loader />
      ) : (
        <ResponsiveContainer width="100%" height={400}> {/* Adjust the height as needed */}
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" fill="#75C1C1" barSize={20} />
            <Bar dataKey="neutral" fill="#999" barSize={20} />
            <Bar dataKey="negative" fill="#FF6384" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default SentimentBarGraph;
