import React from 'react';
import './MessageBody.css';

const MessageBody = ({ messages }) => {
  return (
    <div className="Body">
      {messages.map((message) => (
        <div className={message.sender === 'User' ? 'incoming-message' : 'message1'} key={message.id}>
          <div className="message">
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBody;
