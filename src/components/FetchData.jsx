import { useEffect } from 'react';
import supabase from '../supabaseClient';

const FetchData = ({ onPostsFetch, onCommentsFetch }) => {
  useEffect(() => {
    const fetchData = async () => {
      const { data: postsData, error: postsError } = await supabase.from('posts').select('*');
      if (postsError) {
        console.log('게시글 데이터를 불러오지 못했습니다: ', postsError);
      } else {
        console.log('게시글 데이터를 불러왔습니다: ', postsData);
        onPostsFetch(postsData);
      }

      const { data: commentsData, error: commentsError } = await supabase.from('comments').select('*');
      if (commentsError) {
        console.log('댓글 데이터를 불러오지 못했습니다: ', commentsError);
      } else {
        console.log('댓글 데이터를 불러왔습니다: ', commentsData);
        onCommentsFetch(commentsData);
      }
    };

    fetchData();
  }, []); // 마운트 시

  return null;
};

export default FetchData;
