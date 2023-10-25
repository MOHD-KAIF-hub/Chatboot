
// import React, { useState } from 'react';
// import './Chatbot.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faComments } from "@fortawesome/free-solid-svg-icons";
// import { v4 as uuidv4 } from 'uuid';
// import MessageBody from './components/MessageBody';
// import RefreshButton from './components/RefreshButton';
// import TextField from './components/TextField';


// const Chatbot = async() => {
//   const [userInput1, setUserInput1] = useState('');
//   const [messages, setMessages] = useState([
//     {
//       id: uuidv4(),
//       text: 'How can I help you',
//       sender: 'Chatbot',
//     },
//   ]);

//   const handleUserInput = (userInputText) => {
//     if (userInputText === "") return;
//     const userMessage = {
//       id: uuidv4(),
//       text: userInputText,
//       sender: 'User',
//     };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     // Write logic for OpenAI

//     let res = await fetch('http://localhost:5000/chat', 
//     {
//       method: 'POST',
//       headers: {
//         "Content-Type": 'application/json'                
//       },
//       body: JSON.stringify({
//         question: inputText          
//       })
//     }
//   )
      
//   const data = await res.json()  
//     const botResponse = {
//       id: uuidv4(),
//       text: `You said: ${userInputText}`,
//       sender: 'Chatbot',
//     };
//     setMessages((prevMessages) => [...prevMessages, botResponse]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleUserInput(userInput1);
//     setUserInput1('');
//   };

//   const reload = () => {
//     setMessages([
//       {
//         id: uuidv4(),
//         text: 'How can I help you',
//         sender: 'Chatbot',
//       },
//     ]);
//   };

//   return (
//     <div className="Main">
//       <h1>
//         Chatbot <FontAwesomeIcon icon={faComments} />
//       </h1>
//       <div className="Container">
//         <RefreshButton onClick={reload} />
//         <MessageBody messages={messages} />
//         <TextField
//           value={userInput1}
//           onChange={(e) => setUserInput1(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               handleSubmit(e);
//             }
//           }}
//           onClick={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState } from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import MessageBody from './components/MessageBody';
import RefreshButton from './components/RefreshButton';
import TextField from './components/TextField';

const Chatbot = () => {
  const [userInput1, setUserInput1] = useState('');
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: 'How can I help you',
      sender: 'Chatbot',
    },
  ]);

  const handleUserInput = async (userInputText) => {
    if (userInputText === "") return;


    const userMessage = {
      id: uuidv4(),
      text: userInputText,
      sender: 'User',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = {
      id: uuidv4(),
      text: `You said: ${userInputText}`,
      sender: 'Chatbot',
    };
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    // You can put your asynchronous logic here for ai data
  //   try {
  //     let res = await fetch('http://localhost:5000/chat', {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": 'application/json'
  //       },
  //       body: JSON.stringify({
  //         question: userInputText
  //       })
  //     });

  //     const data = await res.json();
  //     // Handle the response data as needed

  //     const userMessage = {
  //       id: uuidv4(),
  //       text: userInputText,
  //       sender: 'User',
  //     };
  //     setMessages((prevMessages) => [...prevMessages, userMessage]);

  //     const botResponse = {
  //       id: uuidv4(),
  //       text: `${data}`,
  //       sender: 'Chatbot',
  //     };
  //     setMessages((prevMessages) => [...prevMessages, botResponse]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserInput(userInput1);
    setUserInput1('');
  };

  const reload = () => {
    setMessages([
      {
        id: uuidv4(),
        text: 'How can I help you',
        sender: 'Chatbot',
      },
    ]);
  };

  return (
    <div className="Main">
      <h1>
        Chatbot <FontAwesomeIcon icon={faComments} />
      </h1>
      <div className="Container">
        <RefreshButton onClick={reload} />
        <MessageBody messages={messages} />
        <TextField
          value={userInput1}
          onChange={(e) => setUserInput1(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Chatbot;



