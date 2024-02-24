
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark, faCircleArrowRight,faArrowsRotate,faAngleDown } from "@fortawesome/free-solid-svg-icons";
import chatlogo from "../assets/chatlogo.png"
import ChatbotResponse from './ChatbotResponse';
import "./Chatbot.css"


const Chatbot = () => {
  const [userInput1, setUserInput1] = useState('');
  const [iconstatus,seticonstatus]=useState(true);
  const [messages, setMessages] = useState([
    {
      text: '👋 Hi! I am Talent Academy AI, ask me anything about Talent Academy!',
      sender: 'Chatbot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
  
    "What is Talent Academy Ai",
  ];

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
  },2000);
  };

  const handleQuestionClick = (question) => {
    handleUserInput(question);
  };
const handleClick=()=>seticonstatus(!iconstatus)
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
 
 

  return (
    <>
     <div className={`fixed ${iconstatus?'invisible':''}   z-[100]  right-0 top-4  flex flex-col w-[420px] gap-5 ml-auto rounded-xl mr-7  `}>

     <div className={`flex flex-col bg-white gap-4 rounded-xl ${!iconstatus ? 'transition-all transform translate-y-0 duration-500 ease-in-out opacity-1' : 'opacity-0 transform translate-y-full transition-all duration-500 ease-in-out'}`}>

     
     <div className=" rounded-[0.8rem] border border-solid border-gray-300 h-[530px] flex flex-col shadow-lg ">
     {/* Refresh Part */}
     <div className="refresh w-[98%] mx-auto mt-2 h-[8%] border-b border-solid border-gray-300 flex ">
       <div className='profile flex gap-[10px] items-center p-1'>
       <div className='p-[2px] border border-solid border-gray-300 rounded-[50px] bg-purple-200  mb-[5px]'>
         <img src={chatlogo} alt='profile' className='w-[30px] h-[30px] bg-white rounded-full '/> 
        </div>
         <span className='font-semibold'>Talent Academy</span>
       </div>
              <div className='icon_div flex mt-auto mr-[10px] ml-auto mb-auto gap-[15px]'>
                <FontAwesomeIcon key="2" className='icon cursor-pointer' icon={faArrowsRotate} onClick={reload} />
                <FontAwesomeIcon key="1" className='icon cursor-pointer' icon={faXmark} onClick={handleClick} />

              </div>       
   
   </div>
       {/* Message Body Part */}
   <div className="Body h-[70%] m-[8px] overflow-auto " >


{messages.map((message,ind) => (
 <div className={` z-100 ${message.sender === 'User' ? 'justify-end flex' : ''}`} key={ind}>
   <div className={` ${message.sender === 'User' ? ' bg-blue-700 text-white' : 'bg-gray-200'} m-[5px] p-[10px] min-w-[50px] max-w-[80%] text-left min-h-[20px] text-sm inline-block rounded-xl border-[2px] border-solid border-gray-300 `} style={{backgroundColor:message.sender === 'User' ? 'bg-blue-400' : ''}}>
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
className='w-full outline-none resize-none overflow-hidden min-h-10 rounded-full py-2 px-3 border-[2px] border-solid border-gray-300 transition-all duration-300 focus:border-blue-500'
/>



<FontAwesomeIcon className="arrow ml-[-32px] cursor-pointer font-normal text-blue-500 mt-2 text-2xl" icon={faCircleArrowRight} onClick={handleSubmit} />



</div>
</div>

       

     </div>
   </div>
</div>

<div
        className={`fixed bottom-5 w-[60px] h-[60px] mx-5 mt-10 right-0  z-[100] rounded-full cursor-pointer flex items-center bg-blue-500`}
        onClick={() => seticonstatus(!iconstatus)}
      >
        {iconstatus ? (
          <img src={chatlogo} alt="chatlogo" className={`checkmark mx-auto mt-[-8px] w-[70%] rounded-full font-[60px] transition-transform duration-500 ease-in-out transform ${iconstatus && 'icon-enter' }`} />
        ) : (
          <FontAwesomeIcon
  className={`m-auto w-[45%] h-[60%] text-white transform transition-transform duration-500 ease-in-out ${!iconstatus && 'icon-enter' }`}
  icon={faAngleDown}
/>
        )}
      </div>
  
    </>
    

    
  );
};

export default Chatbot;

