
import React, { useState, useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { LuRefreshCcw } from "react-icons/lu";
import { RiArrowDownSLine } from 'react-icons/ri';
import { DeepChat } from 'deep-chat-react';
import "./Chatbot.css"


const Chatbot = () => {

  const chatElementRef = useRef(null);
  const [initialMessages, setinitialMessages] = useState([]);
  const [initialMessagesArray, setinitialMessagesArray] = useState();
  const [suggestedMessagesarray, setsuggestedMessagesarray] = useState();

  const [iconstatus, seticonstatus] = useState(true);
  const [theme, settheme] = useState('')
  const [name, setname] = useState("");
  const [placeholder, setplaceholder] = useState('');
  const [userMessageColor, setuserMessageColor] = useState('#3F6212');
  const [position, setposition] = useState('');
  const [chatbotIcon, setchatbotIcon] = useState();
  const [chatbotProfilePic, setchatbotProfilePic] = useState();
  const [chatBubbleButtonColor, setchatBubbleButtonColor] = useState();


  const [chatbotId, setchatbotId] = useState("");
  const [conversationId, setconversationId] = useState('');


  //To get Information about chatbot when page will load

  useEffect(() => {

    const bodyData = {
      "customerId": "123456789",
      "chatbotId": ""
    };

    const parentWindow = window.parent;
    const iframe = parentWindow.document.getElementById('chatcells.ai');

    if (window.embeddedChatbotConfig) {
      bodyData.chatbotId = window.embeddedChatbotConfig.chatbotId;
      setchatbotId(bodyData.chatbotId.split('_'));
    }
    else if(iframe)
    {
      const iframeChatbotId = iframe.getAttribute('chatbotId');
  if (iframeChatbotId) {
    bodyData.chatbotId = iframeChatbotId;
    setchatbotId(iframeChatbotId.split('_'));
  }
    }
    
    const getData = async () => {
      try {
        let response = await fetch(`https://freight-service.azurewebsites.net/api/getChatbotUIDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
        });
        if (response.ok) {
          const res = await response.json();

          const initialMessage = res.initialMessage.split('\n');
          let temp = [];
          for (let x in initialMessage) {
            if (initialMessage[x]) {
              temp.push({
                text: initialMessage[x],
                role: 'user'
              });
            }
          }
          setinitialMessagesArray(temp);

          const suggestedMessages = res.suggestedMessages.split('\n');
          const temp1 = [];
          for (let x in suggestedMessages) {
            if (suggestedMessages[x]) {
              temp1.push(suggestedMessages[x]);
            }
          }
          setsuggestedMessagesarray(temp1);
          setinitialMessages([
            ...temp.filter(message => message.text.trim() !== '').map((message) => (message.text.trim() !== '' && {
              text: message.text,
              role: 'ai'
            })),
            temp1
              .filter(message => message.trim() !== '') // Filter out empty strings
              .length > 0 ? {
              html: `
          <div class="deep-chat-temporary-message">
            ${temp1.map((message) => (message &&
                `<button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px">${message}</button>`
              ))
                }
          </div>`,
              role: 'ai',
            } : null
          ].filter(message => message !== null));
          setplaceholder(res.messagePlaceholder);
          settheme(res.theme);
          setname(res.chatbotDisplayName);
          setposition(res.chatBubbleButtonAlignment);
          setchatbotIcon(res.chatbotIcon);
          setchatbotProfilePic(res.chatbotProfilePic);
          setchatBubbleButtonColor(res.chatBubbleButtonColor);
          setuserMessageColor(res.userMessageColor);
        } else {
          console.log("Error in response");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }

    }

    getData();

  }, [])

  //Handling query-chatbot

  useEffect(() => {
    if (chatElementRef.current) {
      chatElementRef.current.request = {
        handler: async (body, signals) => {
          const userQuery = body.messages[0].text;
          let data;
          const requestBody = {
            chatbotId,
            userQuery,
            source: 'Widget or Iframe',
          }
          if (conversationId !== '') {
            requestBody.conversationId = conversationId;
          }


          try {
            const response = await fetch('http://34.224.93.99:5000/query-chatbot/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody),
            });
            data = await response.json();
            setconversationId(data.conversationId);

            // Process response data
            signals.onResponse({ text: data.response });
          } catch (error) {
            // Use error.message for better logging
            signals.onResponse({ error: error.message });
          } finally {
            // Update initialMessages in the finally block
            if (data && data.response) {
              setinitialMessages(prevMessages => [
                ...prevMessages,
                { text: userQuery, role: 'user' },
                { text: data.response, role: 'ai' }
              ]);
            }
            else {
              setinitialMessages(prevMessages => [
                ...prevMessages,
                { text: userQuery, role: 'user' },
                { text: "Failed to fetch", role: 'ai' }
              ]);
            }
          }
        },
      };
    }
  }, [chatElementRef, initialMessages, conversationId, chatbotId]);

  const handleClick = () => {
    seticonstatus(!iconstatus);
  };
  //refreshing here
  const reload = () => {
    if (initialMessagesArray && suggestedMessagesarray) {
      setinitialMessages([
        ...initialMessagesArray.filter(message => message.text.trim() !== '').map((message) => (message.text.trim() !== '' && {
          text: message.text,
          role: 'ai'
        })),
        suggestedMessagesarray
          .filter(message => message.trim() !== '') // Filter out empty strings
          .length > 0 ? {
          html: `
          <div class="deep-chat-temporary-message">
            ${suggestedMessagesarray.map((message) => (message &&
            `<button class="deep-chat-button deep-chat-suggestion-button" style="margin-top: 5px">${message}</button>`
          ))
            }
          </div>`,
          role: 'ai',
        } : null
      ].filter(message => message !== null));
    }
    else {
      setinitialMessages([
        initialMessagesArray.filter(message => message.text.trim() !== '').map((message) => (message.text.trim() !== '' && {
          text: message.text,
          role: 'user'
        }))
      ].filter(message => message !== null));
    }
  };





  return (
    <>

      <div className={`fixed ${iconstatus ? 'invisible' : ''}   z-[100]  right-0 top-4  flex flex-col w-[420px]  gap-3 ml-auto rounded-xl mr-7 `}>

        <div className={`flex flex-col relative ${theme === ('dark' || 'Dark') ? 'bg-black' : 'bg-white'} gap-4 rounded-xl ${!iconstatus ? 'transition-all transform translate-y-0 duration-500 ease-in-out opacity-1' : 'opacity-0 transform translate-y-full transition-all duration-500 ease-in-out'}`}>

          <div className=" rounded-[0.8rem] border border-solid border-lime-500/25  h-[530px] flex flex-col shadow-lg ">
            {/* Refresh Part */}
            <div className="refresh w-[98%] mx-auto mt-2 h-[8%] border-b border-solid border-lime-500/25 flex ">
              <div className='profile flex gap-[10px] items-center p-1'>
                {chatbotProfilePic !== 'None' && chatbotProfilePic && <div className='p-[2px] border border-solid border-lime-500/25  rounded-[50px] bg-purple-200  mb-[5px]'>
                  <img src={chatbotProfilePic} alt='profile' className='w-[30px] h-[30px] bg-white rounded-full ' />
                </div>
                }
                {name && name.trim() !== '' && name !== 'None' && <span className={`font-bold text-[16px] ${theme === ('dark' || 'Dark') ? 'text-gray-400' : ''}`}>{name}
                </span>
                }
              </div>
              <div className='icon_div flex mt-auto mr-[10px] ml-auto mb-auto gap-[15px]'>
                <LuRefreshCcw className={`icon cursor-pointer text-lg ${theme === ('dark' || 'Dark') ? 'text-white' : ''}`} onClick={reload} />
                <RxCross2 className={`icon cursor-pointer text-lg ${theme === ('dark' || 'Dark') ? 'text-white' : ''}`} onClick={handleClick} />

              </div>

            </div>
            {/* Message Body Part */}
            <div className="Body flex flex-col justify-center items-center h-full m-[8px] overflow-auto " >


              <DeepChat

                style={{ width: '100%', height: '460px', border: 'none' }}
                textInput={{
                  styles: {
                    text: { color: 'black' },
                    container: { minWidth: '96%', minHeight: '35px', backgroundColor: '#f5f9ff', borderRadius: '20px', paddingTop: '8px', marginBottom: '2px' },
                    focus: { border: '1px solid #3f6212' }
                  },
                  placeholder: { text: placeholder !== '' ? placeholder : ' ', style: { color: '#4459a4' } },
                }}
                submitButtonStyles={{
                  submit: {
                    container: {
                      default: {
                        marginTop: "8px",
                        marginRight: "8px",
                      }
                    },
                    svg: {
                      styles: {
                        default: {
                          width: "25px",
                          height: "25px",
                          color: '#3f6212',
                          transform: "rotate(45deg)"
                        }
                      }
                    }
                  }
                }}
                messageStyles={{
                  html: { shared: { bubble: { backgroundColor: '#3F6212', paddingLeft: '4px', paddingBottom: '4px', paddingTop: '0px', width: '100%' } } },
                  loading: {
                    bubble: {
                      backgroundColor: '#3F6212',
                      color: 'white',
                      fontSize: '16px'
                    },
                    error: {
                      bubble: { backgroundColor: "#f98e00", color: "white", fontSize: "15px" }
                    }
                  },
                  default: {
                    ai: {
                      bubble: {
                        maxWidth: "350px" // Set max-width for AI messages
                      }
                    },
                    user: {
                      bubble: {
                        backgroundColor: userMessageColor ? userMessageColor : "lightblue",
                        maxWidth: "350px" // Set max-width for user messages
                      }
                    }
                  }
                }}

                initialMessages={initialMessages}

                ref={chatElementRef}
              />


            </div>




          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-5 w-[55px] h-[55px] mr-5 mt-0 ${position === ('Right' || 'right' || '') ? 'right-0' : 'right-[370px]'} z-[100] rounded-full cursor-pointer flex items-center `}
        onClick={handleClick}
        style={{ backgroundColor: chatBubbleButtonColor ? chatBubbleButtonColor : '#3f6212' }}>
        {iconstatus ? (chatbotIcon &&
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

