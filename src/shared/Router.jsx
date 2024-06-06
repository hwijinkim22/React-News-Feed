import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import CommitDetail from '../pages/CommitDetail';
import DetailPage from '../pages/DetailPage';
import Test from '../components/Test';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomeHeader from '../components/HomeHeader';
import styled from 'styled-components';

const EmptySpace = styled.div`
  height: 100px;
`;
import { useSelector } from 'react-redux';

const Router = ({ signOut, comments }) => {
  const signIn = useSelector((state) => state.newsFeed.signIn);

  return (
    <BrowserRouter>
      <HomeHeader signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={signIn ? <MyPage /> : <Navigate to="/login" />} />
        <Route path="/commitdetail" element={signIn ? <CommitDetail /> : <Navigate to="/login" />} />
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/test" element={<Test comments={comments} />} />
        <Route path="/login" element={<LoginPage signOut={signOut} />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <EmptySpace />
    </BrowserRouter>
  );
};

export default Router;
