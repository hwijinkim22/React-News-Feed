import { useEffect, useState } from 'react';
import GlobalStyles from './Globalstyles';
import { FetchData, FetchUsers } from './components/FetchData';
import Router from './shared/Router';
import supabase from './supabaseClient';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [signIn, setSignIn] = useState(false);
  const [users, setUsers] = useState([]);

  const handleDataFetch = (data) => {
    setPosts(data);
  };

  const handleUsersFetch = (data) => {
    setUsers(data)
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
    const fetchData = async () => {
      const { data } = await supabase.from('posts').select();
      setPosts(data);
    };
    const fetchUsers = async () => {
      const { data } = await supabase.from('users').select();
      setUsers(data);
    }

    fetchData();
    fetchUsers();
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
      <FetchData onDataFetch={handleDataFetch}/>
      <FetchUsers handleUsersFetch={handleUsersFetch}/>
      <Router posts={posts} setPosts={setPosts} users={users} signIn={signIn} setSignIn={setSignIn} signOut={signOut}/>
    </>
  );
};

export default App;