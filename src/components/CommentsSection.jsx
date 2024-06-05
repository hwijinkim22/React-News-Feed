import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import supabase from '../supabaseClient';

const CommentsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;

  .comments__list {
    list-style: none;
    padding: 0;
    margin: 0;

    .comment__item {
      margin-top : 20px;
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid black;
      border-radius: 20px;

      .comment__author {
        font-weight: bold;
      }

      .comment__date {
        font-size: 12px;
        color: #888;
      }

      .comment__text {
        margin-top: 5px;
      }
    }
  }

  .comment__form {
    display: flex;
    flex-direction: column;

    textarea {
      padding: 10px;
      border: 1px solid black;
      border-radius: 20px;
      margin-bottom: 10px;
      font-size: 14px;
    }

    button {
      align-self: flex-end;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const CommentsSection = ({ postId, users }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from('comments')
                    .select('*')
                    .eq('post_id', postId);

                if (error) {
                    throw error;
                }

                console.log('Fetched comments:', data);
                setComments(data || []); // null일 경우 빈 배열로 설정
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        fetchComments();
    }, [postId]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();

                if (error) {
                    throw error;
                }

                console.log('Fetched user:', user);
                setCurrentUser(user);
            } catch (error) {
                console.error('Error fetching user:', error.message);
            }
        };

        getUser();
    }, []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert('로그인이 필요합니다.');
            return;
        }

        // users 배열이 정의되었는지 확인
        const nickname = users ? (users.find(u => u.id === currentUser.id)?.nickname || '') : '';

        try {
            const { error } = await supabase
                .from('comments')
                .insert([
                    {
                        comment: newComment,
                        user_id: currentUser.id,
                        post_id: postId,
                        nickname: nickname // 닉네임 추가
                    }
                ]);

            if (error) {
                throw error;
            }

            console.log('이 댓글이 등록되었습니다.');
            setNewComment('');

            // 새 댓글 등록 후 댓글 목록을 다시 가져옴
            const { data, error: fetchError } = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', postId);

            if (fetchError) {
                throw fetchError;
            }

            setComments(data || []);
        } catch (error) {
            console.error('댓글 등록 에러났어요:', error.message);
        }
    };

    return (
        <CommentsWrapper>
            <h1>댓글</h1>
            <ul className="comments__list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment__item">
                        <p className="comment__author">{comment.nickname || comment.user_id}</p>
                        <p className="comment__date">{new Date(comment.created_at).toLocaleString()}</p>
                        <p className="comment__text">{comment.comment}</p>
                    </li>
                ))}
            </ul>


            <form className="comment__form" onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                    placeholder="그런 말이 있지요, 가는 말이 고와야 오는 말이 곱다는 말..."
                />
                <button type="submit" style={{ backgroundColor: "#343434" }}>댓글 작성</button>
            </form>
        </CommentsWrapper>
    );
};

export default CommentsSection;
