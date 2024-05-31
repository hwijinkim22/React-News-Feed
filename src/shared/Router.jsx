import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MyPage from '../pages/MyPage'
import CommitDetail from '../pages/CommitDetail'
import DetailPage from '../pages/DetailPage'

const Router = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/mypage/:id" element={<MyPage/>} />
        <Route path="/commitdetail" element={<CommitDetail/>} />
        <Route path="/detailpage" element={<DetailPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router