import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import CommitDetail from '../pages/CommitDetail';
import DetailPage from '../pages/DetailPage';
import Test from '../components/Test';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const Router = ({ posts, signIn, signOut }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mypage/:id" element={signIn ? <MyPage/> : <Navigate to="/login" />} />
        {/* <Route path="/commitdetail" element={signIn ? <CommitDetail/> : <Navigate to="/login" />} /> */}
        <Route path="/commitdetail" element={<CommitDetail/>} />
        <Route path="/detailpage" element={signIn ? <DetailPage/> : <Navigate to="/login" />} />
        <Route path="/test" element={<Test posts={posts} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      {signIn && <button onClick={signOut}>로그아웃</button>}
    </BrowserRouter>
  );
};

export default Router;
