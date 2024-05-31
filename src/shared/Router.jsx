import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import CommitDetail from '../pages/CommitDetail';
import DetailPage from '../pages/DetailPage';
import Test from '../components/Test';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const Router = ({ posts }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mypage/:id" element={<MyPage/>} />
        <Route path="/commitdetail" element={<CommitDetail/>} />
        <Route path="/detailpage" element={<DetailPage/>} />
        <Route path="/test" element={<Test posts={posts} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
