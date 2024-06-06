import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
`

const Router = ({ posts, setPosts, users, setUsers, comments, signIn, setSignIn, signOut }) => {
  return (
    <BrowserRouter>
      <HomeHeader signIn={signIn} signOut={signOut} />
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} users={users} />} />
        <Route path="/mypage" element={signIn ? <MyPage /> : <Navigate to="/login" />} />
        <Route path="/commitdetail" element={signIn ? <CommitDetail users={users} setUsers={setUsers}/> : <Navigate to="/login" />} />
        <Route path="/detailpage" element={<DetailPage />} />
        <Route path="/test" element={<Test posts={posts} comments={comments} />} />
        <Route path="/login" element={<LoginPage signIn={signIn} setSignIn={setSignIn} signOut={signOut} />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <EmptySpace/>
    </BrowserRouter>
  );
};

export default Router;
