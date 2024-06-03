import React, { useState } from 'react';
import styled from 'styled-components';
import inputimage from '../image/inputimage.png';

const SearchInput = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 3px solid #343434;
  border-radius: 5px;
  width: 300px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const InputImage = styled.img`
  padding-top: 60px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const HomeInput = () => {
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <InputImage src={inputimage} onClick={toggleInput} />
      <SearchInput show={showInput} placeholder="검색어를 입력하세요!" />
    </>
  );
};

export default HomeInput;
