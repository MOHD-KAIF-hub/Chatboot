import React from 'react';

const ChatbotResponse = ({ text }) => {

  const renderContent = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split the text by URLs
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      // Check if the part is a URL
      if (index % 2 === 1) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className='text-blue-700 underline'>
            {part}
          </a>
        );
      }
      
      // Return normal text
      return <span key={index} >{part}</span>;
      })
  };

  return (
    <div className="mb-0">
      {renderContent()}
    </div>
  );
};

export default ChatbotResponse;