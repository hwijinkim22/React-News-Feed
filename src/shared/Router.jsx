import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import CommitDetail from '../pages/CommitDetail';
import DetailPage from '../pages/DetailPage';
import Test from '../components/Test';
import HomeHeader from '../components/HomeHeader';

const Router = ({ posts }) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/mypage/" element={<MyPage />} />
          <Route path="/commitdetail" element={<CommitDetail />} />
          <Route path="/detailpage" element={<DetailPage />} />
          <Route path="/test" element={<Test posts={posts} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
