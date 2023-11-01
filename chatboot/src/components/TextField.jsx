import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import './TextField.css';

const TextField = ({ value, onChange, onKeyPress, onClick }) => {

 
  return (
    <div className="text_field">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
  
<FontAwesomeIcon className="arrow" icon={faCircleArrowRight} onClick={onClick} />

 
   
    </div>
  );
};

export default TextField;


