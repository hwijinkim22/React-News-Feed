import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import CommitDetail from '../pages/CommitDetail';
import DetailPage from '../pages/DetailPage';
import Test from '../components/Test';

const Router = ({ posts }) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage/:mypageId" element={<MyPage posts={posts} />} />
          <Route path="/commitdetail" element={<CommitDetail />} />
          <Route path="/detailpage" element={<DetailPage />} />
          <Route path="/test" element={<Test posts={posts} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
