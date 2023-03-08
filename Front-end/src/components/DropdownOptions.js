import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from "react";

function DropdownOptions({ placeHolder, options }) {
  return (
    <DropdownButton id="dropdown-basic-button" title={`${placeHolder}`}>
      {options.map((option) => (
          <Dropdown.Item key={option.value}>{option.label}</Dropdown.Item>
      ))
        
      }
      
      
    </DropdownButton>
  );
}

export default DropdownOptions;