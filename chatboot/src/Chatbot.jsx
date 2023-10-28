
import React, { useState } from 'react';
import './Chatbot.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments,faRobot } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import MessageBody from './components/MessageBody';
import RefreshButton from './components/RefreshButton';
import TextField from './components/TextField';

const Chatbot = () => {
  const [userInput1, setUserInput1] = useState('');
  const [iconstaus,seticonstatus]=useState(true);
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      text: 'How can I help you?',
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
      text: `${userInputText}`,
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
        text: 'How can I help you?',
        sender: 'Chatbot',
      },
    ]);
  };
  const CloseChatbot=()=>{
    seticonstatus(!iconstaus);
  }

  return (
    <>
     {iconstaus===true?<div className='iconstatus' onClick={()=>{
      seticonstatus(!iconstaus);
     }}>
     <FontAwesomeIcon className='robot' icon={faRobot} />
              
     </div>:<div className="Main">
      <h1>
        Chatbot <FontAwesomeIcon icon={faComments} />
      </h1>
      <div className="Container">
      {/* Refresh Part */}
        <RefreshButton refresh={reload} close={CloseChatbot}/>
        {/* Message Body Part */}
        <MessageBody messages={messages} />
        {/* Input field Area */}
        <TextField
          value={userInput1}
          onChange={(e) => {
            setUserInput1(e.target.value);
            }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          onClick={handleSubmit}

        />
      </div>
    </div>
  }
    </>

    
  );
};

export default Chatbot;



