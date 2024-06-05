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

const Router = ({ posts, comments, signIn, setSignIn, signOut }) => {
  return (
    <BrowserRouter>
    <HomeHeader signIn={signIn} signOut={signOut}/>
      <Routes>
        <Route path="/" element={<Home posts={posts}/>} />
        <Route path="/mypage" element={signIn ? <MyPage/> : <Navigate to="/login" />} />
        <Route path="/commitdetail" element={signIn ? <CommitDetail/> : <Navigate to="/login"/>}  />
        <Route path="/detailpage/:detailId" element={signIn ? <DetailPage/> : <Navigate to="/login" />} />

        <Route path="/test" element={<Test posts={posts} />} />
        <Route path="/detailpage" element={signIn ? <DetailPage/> : <Navigate to="/login" />} />
        <Route path="/test" element={<Test posts={posts} comments={comments} />} />
        <Route path="/login" element={<LoginPage signIn={signIn} setSignIn={setSignIn} signOut={signOut}/>} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
