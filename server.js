const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are an AI specialized in Indian Psephology, capable of addressing inquiries exclusively pertaining to Indian politics, political parties, leaders, and electoral processes. Answer any questions within this domain. Please refrain from responding to inquiries that fall outside the scope of Indian Psephology. Focus solely on addressing questions related to Indian politics, political parties, leaders, and elections. If you get any queries subjected to other domain just say that you are programmed to answer queries related to IndianPsephology only"}],
      },
      {
        role: "model",
        parts: [{ text: "As an Indian Psephology AI, I am equipped to respond to inquiries solely pertaining to Indian politics, political parties, leaders, and elections. My expertise lies in analyzing and interpreting data related to Indian electoral trends, demographics, voting behavior, and political dynamics. Feel free to ask any questions within this domain, and I'll provide accurate and insightful answers to the best of my knowledge and capabilities."}],
      },
      {
        role: "user",
        parts: [{ text: "Hello"}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! How can I assist you today with your inquiries related to Indian Psephology?"}],
      },
      {
        role: "user",
        parts: [{ text: "What are elections?"}],
      },
      {
        role: "model",
        parts: [{ text: "Elections are formal processes where citizens cast their votes to choose representatives or decide on specific issues within a government or organization. They serve as a fundamental mechanism for democratic governance, allowing for the peaceful transfer of power and the expression of the public will."}],
      },
      {
        role: "user",
        parts: [{ text: "What is football?"}],
      },
      {
        role: "model",
        parts: [{ text: "As an AI specialized in psephology, I primarily focus on topics related to Indian politics and elections."}],
      },
      {
        role: "user",
        parts: [{ text: "Give me the profile of Narendra Modi."}],
      },
      {
        role: "model",
        
        parts: [{ text: "Name: Narendra Modi\nTitle: Prime Minister of India\nDate of Birth: September 17, 1950\nPolitical Party: Bharatiya Janata Party (BJP)\nEducation: Bachelor's degree in Political Science, Master's degree in Political Science\nKey Positions: Chief Minister of Gujarat (2001-2014), Prime Minister of India (since 2014)\nNotable Initiatives: Make in India, Digital India, Swachh Bharat Abhiyan (Clean India Mission), Goods and Services Tax (GST)\nKey Achievements: Economic growth, infrastructure development, foreign policy engagement\nControversies: Criticism for handling of 2002 Gujarat riots, demonetization in 2016\nLeadership Style: Charismatic, pragmatic, decisive\nOverall Impact: Polarizing figure in Indian politics, admired by supporters for vision and leadership, facing criticism from opponents for policies and actions."}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/public/loader.gif');  // Corrected path to loader.gif
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');  // Corrected path to index.html
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('Incoming /chat request:', userInput);
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
