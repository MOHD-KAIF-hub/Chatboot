import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import './TextField.css';

const TextField = ({ value, onChange, onKeyPress, onClick }) => {
  return (
    <div className="text_field">
      <input
        type="text"
        placeholder="Type your Message here"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <FontAwesomeIcon className="arrow" icon={faPaperPlane} onClick={onClick} />
    </div>
  );
};

export default TextField;
