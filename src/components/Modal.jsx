import React, { useState, useEffect, useRef, useReducer } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';
import useOutsideClick from './useOutsideClick';

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.13);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 550px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Contents = styled.div`
  margin: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  background-color: #d9d9d9;
  border-radius: 10px;
  color: black;
  margin: 5px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #bbbbbb;
  }
`;

const Input = styled.input`
  padding: 10px 20px;

  border-radius: 10px;

  margin: 5px;
  font-weight: 600;
`;

const Modal = ({ close, user, setUser }) => {
  const [name, setName] = useState('');
  const modalRef = useRef(null);

  const handleClose = () => {
    close?.();
  };

  useOutsideClick(modalRef, handleClose);

  useEffect(() => {
    if (user.user_metadata.nickname) {
      setName(user.user_metadata.nickname);
    }
  }, [user]);

  const nameEdit = async (e) => {
    e.preventDefault();
    if (user) {
      const { error } = await supabase.auth.updateUser({
        data: { nickname: name }
      });
      if (error) {
        console.error('Error updating user', error);
      } else {
        console.log('Updated user');
        setUser((prev) => ({
          ...prev,
          user_metadata: {
            ...prev.user_metadata,
            nickname: name
          }
        }));
        close();
      }
    }
  };

  const nameChange = (e) => {
    const nameValue = e.target.value;
    nameValue.length > 8 ? alert('8자까지 입력 가능합니다') : setName(nameValue);
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <Contents>
          <h3>닉네임 수정</h3>
        </Contents>
        <Contents>
          <form onSubmit={nameEdit}>
            <Input type="text" value={name} onChange={nameChange} autoFocus />
            <Button type="submit">수정</Button>
            <Button onClick={close}>닫기</Button>
          </form>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
};

export default Modal;