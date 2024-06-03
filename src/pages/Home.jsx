import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate('/login')
  }
  return (
    <>
    <h1>Feed</h1>
    <h1>MyPage</h1>
    <button onClick={handleLoginPage}>로그인 버튼</button>
    </>

    
  )
}

export default Home