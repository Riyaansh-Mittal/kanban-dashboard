import React, { useState } from 'react';
import { CgBoard } from "react-icons/cg";
import { FaListUl } from 'react-icons/fa';
import styled from 'styled-components';

const SwitchLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? '10px 0px 0px 10px' : isLast ? '0px 10px 10px 0px' : 'none'};
   width: 100%;
   padding: 4px;
   padding-left: 10px;
   padding-right: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: space-between;
  box-shadow: inset 0 -2px 0px rgba(178, 183, 188, 0.2);
  background-color: ${({ selected }) => (selected ? '#dbe9f7' : '#fff')};
  color: ${({ selected }) => (selected ? 'black' : '#6c757d')};
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#dbe9f7' : '#fff')};
  }
`;

const Icon = styled.span`
  margin-right: 8px;
  color: ${({ selected }) => (selected ? '#096fdc' : '#6c757d')};
`;

const Line = styled.div`
  position: absolute;
  width: 20%;
  height: 2px;
  background-color: #096fdc;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;

const Switch = () => {
  const [selectedButton, setSelectedButton] = useState('board');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <SwitchLabel>
      <Button
        isFirst
        selected={selectedButton === 'board'}
        onClick={() => handleButtonClick('board')}
      >
        <Icon selected={selectedButton === 'board'}>
          <CgBoard />
        </Icon>
        Board
        {selectedButton === 'board' && <Line />}
      </Button>
      <Button
        isLast
        selected={selectedButton === 'list'}
        onClick={() => handleButtonClick('list')}
      >
        <Icon selected={selectedButton === 'list'}>
          <FaListUl />
        </Icon>
        <span>List</span>
        {selectedButton === 'list' && <Line />}
      </Button>
    </SwitchLabel>
  );
};

export default Switch;
