
import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { RiArrowDownSLine } from 'react-icons/ri';

import chatlogo from "../assets/chatlogo.png"
import ChatbotResponse from './ChatbotResponse';
import "./Chatbot.css"


const Chatbot = () => {

  const [userInput1, setUserInput1] = useState('');
  const [iconstatus, seticonstatus] = useState(true);
  const [theme, settheme] = useState('dark')
  const [name, setname] = useState("Teaching Assistant");
  const [placeholder, setplaceholder] = useState('');
  const [userMessageColor, setuserMessageColor] = useState('blue');
  const [position, setposition] = useState('Right');
  const [chatbotIcon, setchatbotIcon] = useState(chatlogo);
  const [chatbotProfilePic, setchatbotProfilePic] = useState(chatlogo);
  const [chatBubbleButtonColor, setchatBubbleButtonColor] = useState();
  const [messages, setMessages] = useState([
    {
      text: '👋 Hi! I am Talent Academy AI, ask me anything about Talent Academy!',
      sender: 'Chatbot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const [questions, setquestions] = useState([

    "What is Talent Academy Ai",
  ]);

  const handleUserInput = async (userInputText) => {
    if (userInputText === "") return;

    const userMessage = {
      text: userInputText,
      sender: 'User',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    // Uncomment the following section to make the API call
    setTimeout(async () => {
      try {

        let res = await fetch('http://34.224.93.99:5000/support/', {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            query: userInputText
          })
          // let res=await fetch('http://localhost:3001/api/job');
        });

        const data = await res.json();

        console.log(data);
        const botResponse = {
          text: `${data.response}`,
          sender: 'Chatbot',
        };
        setMessages((prevMessages) => ([...prevMessages, botResponse]));
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleQuestionClick = (question) => {
    handleUserInput(question);
  };
  const handleClick = () => seticonstatus(!iconstatus)
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserInput(userInput1);
    setUserInput1('');

  };

  const reload = () => {
    setMessages([
      {
        text: '👋 Hi! I am Talent Academy AI, ask me anything about Talent Academy!',
        sender: 'Chatbot',
      },
    ]);
  };

  useEffect(() => {
    const bodyData = {
      "customerId": "123456789",
      "chatbotId": "initial_ea58f940-150e-4174-b62b-394a1675a900"
    };
    if (window.embeddedChatbotConfig) {
      bodyData.chatbotId = window.embeddedChatbotConfig.chatbotId;
    }
    const getData = async () => {
      let response = await fetch(`https://freight-service.azurewebsites.net/api/getChatbotUIDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        const initialMessage = res.initialMessage.split('\n');
        let temp = [];
        for (let x in initialMessage) {
          temp.push({
            text: initialMessage[x],
            sender: 'Chatbot'
          })
        }
        setMessages(temp);
        const suggestedMessages = res.suggestedMessages.split('\n');
        const temp1 = [];
        for (let x in suggestedMessages) {
          temp1.push(suggestedMessages[x]);
        }
        setquestions(temp1);
        setplaceholder(res.messagePlaceholder);
        settheme(res.theme);
        setname(res.chatbotDisplayName);
        setposition(res.chatBubbleButtonAlignment)
        setchatbotIcon(res.chatbotIcon);
        setchatbotProfilePic(res.chatbotProfilePic);
        setchatBubbleButtonColor(res.chatBubbleButtonColor);
        setuserMessageColor(res.userMessageColor);
      }
      else {
        console.log("Error in response");
      }
    }
    getData();

  }, [])



  return (
    <>
      <div className={`fixed ${iconstatus ? 'invisible' : ''}   z-[100]  right-0 top-4  flex flex-col w-[420px]  gap-5 ml-auto rounded-xl mr-7 `}>

        <div className={`flex flex-col  ${theme === 'dark' ? 'bg-black' : 'bg-white'} gap-4 rounded-xl ${!iconstatus ? 'transition-all transform translate-y-0 duration-500 ease-in-out opacity-1' : 'opacity-0 transform translate-y-full transition-all duration-500 ease-in-out'}`}>

          <div className=" rounded-[0.8rem] border border-solid border-lime-500/25  h-[530px] flex flex-col shadow-lg ">
            {/* Refresh Part */}
            <div className="refresh w-[98%] mx-auto mt-2 h-[8%] border-b border-solid border-lime-500/25 flex ">
              <div className='profile flex gap-[10px] items-center p-1'>
                <div className='p-[2px] border border-solid border-lime-500/25  rounded-[50px] bg-purple-200  mb-[5px]'>
                  <img src={chatbotProfilePic} alt='profile' className='w-[30px] h-[30px] bg-white rounded-full ' />
                </div>
                <span className='font-semibold'>{name}
                </span>
              </div>
              <div className='icon_div flex mt-auto mr-[10px] ml-auto mb-auto gap-[15px]'>
                <LuRefreshCcw className='icon cursor-pointer text-lg' onClick={reload} />
                <RxCross2 className='icon cursor-pointer text-lg' onClick={handleClick} />

              </div>

            </div>
            {/* Message Body Part */}
            <div className="Body h-[70%] m-[8px] overflow-auto " >


              {messages.map((message, ind) => (
                <div className={` z-100 ${message.sender === 'User' ? 'justify-end flex' : ''}`} key={ind}>
                  <div className={` m-[5px] p-[10px] min-w-[50px] max-w-[80%] text-left min-h-[20px] text-sm inline-block rounded-xl border-[2px] border-solid border-lime-500/25`} style={{
                    backgroundColor: message.sender === 'User' ? userMessageColor : '#E5E7EB',
                    color: message.sender === 'User' ? 'white' : 'black',
                  }} >
                    <ChatbotResponse
                      text={message.text}

                    />



                  </div>
                </div>
              ))}


              {isLoading && (
                <div className="typingIndicatorContainer">
                  <div className="typingIndicatorBubble">
                    <div className="typingIndicatorBubbleDot"></div>
                    <div className="typingIndicatorBubbleDot"></div>
                    <div className="typingIndicatorBubbleDot"></div>
                  </div>
                </div>
              )}



            </div>

            <div className='h-[15%] '>

              <div className='flex gap-1 rounded-xl overflow-y-auto '>
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="m-[5px] px-[8px] py-[2px] text-left h-[30px] text-sm inline-block rounded-xl  border-[2px] border-solid border-gray-300 bg-gray-200 hover:underline cursor-pointer whitespace-nowrap"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </div>


                ))}

                {/* Input field Area */}
              </div>

              <div className="text_field w-[98%] mx-auto mb-6  flex z-100">
                <input
                  type="text"
                  value={userInput1}
                  onChange={(e) => setUserInput1(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  placeholder={placeholder}
                  className='w-full outline-none resize-none overflow-hidden min-h-10 rounded-full p-3 border-[1px] border-solid focus:border-lime-700 border-lime-500/25 focus:ring-4 focus:ring-lime-500/10 focus:outline-none'
                />



                <IoMdSend className="arrow ml-[-32px] cursor-pointer font-normal mt-3 text-2xl text-lime-800" onClick={handleSubmit} />



              </div>
            </div>



          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-5 w-[60px] h-[60px] mr-5 mt-10 ${position === 'Right' ? 'right-0' : 'right-[370px'} z-[100] rounded-full cursor-pointer flex items-center `}
        onClick={() => seticonstatus(!iconstatus)}
        style={{ backgroundColor: chatBubbleButtonColor ? chatBubbleButtonColor : 'blue-500' }}>
        {iconstatus ? (
          <img src={chatbotIcon} alt="chatlogo" className={`checkmark mx-auto  mt-[-8px] w-[70%] rounded-full font-[60px] transition-transform duration-500 ease-in-out transform ${iconstatus && 'icon-enter'}`} />
        ) : (
          <RiArrowDownSLine
            className={`m-auto text-5xl text-white transform transition-transform duration-500 ease-in-out ${!iconstatus && 'icon-enter'}`}

          />
        )}
      </div>

    </>



  );
};

export default Chatbot;

