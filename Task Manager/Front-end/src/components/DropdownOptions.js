import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from "react";

function DropdownOptions({ title, options, handleEvent }) {
  return (
    <DropdownButton id="dropdown-basic-button" title={`${title}`} onSelect={handleEvent} >
      {options.map((option) => (
          <Dropdown.Item eventKey={option.value}>{option.label}</Dropdown.Item>
      ))
      } 
    </DropdownButton>
  );
}

export default DropdownOptions;