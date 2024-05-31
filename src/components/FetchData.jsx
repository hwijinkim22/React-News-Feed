import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const FetchData = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log("데이터 못 불러옴 => ", error);
      } else {
        console.log("데이터 잘 불러옴 => ", data);
        setPosts(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>더미텍스트</h3>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            style={{
              border: "1px solid black",
            }}
          >
            <h5>글 제목 : {post.title}</h5>
            <h5>닉네임 : {post.nickname}</h5>
            <h5>글 내용 : {post.content}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default FetchData;
