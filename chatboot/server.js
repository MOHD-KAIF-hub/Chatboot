// const express =  require('express')
// const app = express();
// const { Configuration, OpenAIApi } = require("openai");
// const openai = new OpenAIApi(new Configuration({
//     // replace your-api-key with your API key from ChatGPT
//     apiKey: 'your-api-key'
// }));
// app.post('/chat', async (req, res)=> {   
//     try {
//       const resp = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//           messages: [
//             { role: "user", content: req.body.question}
//           ]  
//       })           
          
//       res.status(200).json({message: resp.data.choices[0].message.content})
//     } catch(e) {
//         res.status(400).json({message: e.message})
//     }
//   })

// app.use(express.static('public'))

// app.listen(5000, ()=> {
//     console.log("Server is active")
// })


// const express = require('express');
// const app = express();
// const OpenAIApi = require('openai');
// const Key=process.env.Key;

// const openai = new OpenAIApi.OpenAI({ key: 'Key' });

// app.post('/chat', async (req, res) => {
//   try {
//     const resp = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: req.body.question },
//       ],
//     });

//     res.status(200).json({ message: resp.data.choices[0].message.content });
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// });

// app.use(express.static('public'));

// app.listen(5000, () => {
//   console.log("Server is active");
// });


const express = require('express');
const app = express();
const { OpenAIApi } = require("openai");
const apiKey = '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';



app.listen(5000, () => {
    console.log("Server is active");
});


const axios = require('axios');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Your ChatGPT API key
// const apiKey = 'YOUR_API_KEY';

// API endpoint
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Rate limiter
const rateLimiter = new RateLimiterMemory({
  points: 1, // Number of points to consume per request
  duration: 1, // Time window in seconds
});

// Function to send a message to the chatbot
async function sendMessage(message) {
  try {
    await rateLimiter.consume('sendMessage', 1); // Rate limit the requests
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a chatbot',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const chatbotResponse = response.data.choices[0].message.content;
    return chatbotResponse;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle rate limit exceeded - implement exponential backoff and retry
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      return sendMessage(message); // Retry the request
    } else {
      console.error('Error sending message to the chatbot:', error);
      return 'Error';
    }
  }
}

// Example usage
(async () => {
  const userMessage = 'Hello, chatbot. Tell me a joke.';
  console.log(userMessage);
  const response = await sendMessage(userMessage);
  console.log('Chatbot:', response);
})();