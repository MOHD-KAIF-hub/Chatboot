import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate,faXmark } from "@fortawesome/free-solid-svg-icons";
import './RefreshButton.css';
import pic from './kaif.jpg'

const RefreshButton = ({ refresh ,close}) => {
  return (
    <div className="refresh">
        <div className='profile'>
          <img src={pic} alt='profile'/>
          <span>Mohd Kaif</span>
        </div>
        <div className='icon_div'>
            <FontAwesomeIcon  className='icon' icon={faXmark} onClick={close} />
            <FontAwesomeIcon  className='icon' icon={faArrowsRotate} onClick={refresh} />
         </div>       
    
    </div>
  );
};

export default RefreshButton;
