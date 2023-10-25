import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import './RefreshButton.css';

const RefreshButton = ({ onClick }) => {
  return (
    <div className="refresh">
      <FontAwesomeIcon className="refresh1" icon={faArrowsRotate} onClick={onClick} />
    </div>
  );
};

export default RefreshButton;
