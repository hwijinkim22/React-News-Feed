import { useEffect, useState } from 'react';
import GlobalStyles from './Globalstyles';
import FetchData from './components/FetchData';
import Router from './shared/Router';
import supabase from './supabaseClient';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [signIn, setSignIn] = useState(false);

  const handlePostsFetch = (data) => {
    setPosts(data);
  };

  const handleCommentsFetch = (data) => {
    setComments(data);
  };

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setSignIn(false);
    } catch (error) {
      console.error('로그아웃 오류 발생', error.message);
    }
  };

  async function checkSignIn() {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    setSignIn(!!session);
  }

  useEffect(() => {
    checkSignIn();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkSignIn();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <FetchData onPostsFetch={handlePostsFetch} onCommentsFetch={handleCommentsFetch} />
      <Router posts={posts} comments={comments} signIn={signIn} setSignIn={setSignIn} signOut={signOut} />
    </>
  );
};

export default App;
