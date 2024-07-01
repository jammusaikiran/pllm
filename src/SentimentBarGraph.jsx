import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import Loader from './Loader';
import './Cube.css';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #007BFF;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PieContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const PieChartWrapper = styled.div`
  width: 45%;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #333;
`;

const PartyInFavor = styled.h3`
  text-align: center;
  color: #28a745;
  margin-top: 20px;
`;

const SentimentBarGraph = () => {
  const [tweetInput, setTweetInput] = useState('');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [positivePieData, setPositivePieData] = useState([]);
  const [negativePieData, setNegativePieData] = useState([]);
  const [partyInFavour, setPartyInFavour] = useState('');

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
      const data = response.data;
      setChartData(data);

      const positivePieData = data.map(party => ({
        name: party.name,
        value: party.positive,
      }));

      const negativePieData = data.map(party => ({
        name: party.name,
        value: party.negative,
      }));

      setPositivePieData(positivePieData);
      setNegativePieData(negativePieData);

      const partyInFavour = data.reduce((favParty, currentParty) =>
        (currentParty.positive > favParty.positive ? currentParty : favParty), { positive: 0 }).name;

      setPartyInFavour(partyInFavour);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF'];

  return (
    <Container>
      <Title>Sentiment Analysis</Title>
      <Form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          value={tweetInput}
          onChange={handleInputChange}
          placeholder="Enter your tweet"
        />
        <Button type="submit">Add Tweet</Button>
      </Form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={400}>
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

          <PieContainer>
            <PieChartWrapper>
              <SectionTitle>Positive Sentiments</SectionTitle>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={positivePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {positivePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </PieChartWrapper>
            <PieChartWrapper>
              <SectionTitle>Negative Sentiments</SectionTitle>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={negativePieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {negativePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </PieChartWrapper>
          </PieContainer>

          <PartyInFavor>Party in Favor: {partyInFavour}</PartyInFavor>
        </>
      )}
    </Container>
  );
};

export default SentimentBarGraph;
