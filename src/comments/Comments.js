import {useEffect, useState} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import {createComment, deleteComment as deleteCommentApi, updateComment as updateCommentApi} from '../api';
import Comment from './Comment';
import CommentForm from './CommentForm';

function Comments({currentUserId}) {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
    const isAuth = localStorage.getItem('isAuth');

    const getReplies = commentId => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const addComment = (text, parentId) => {
        createComment(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        })
    }


    const deleteComment = (commentId) => {
        if (window.confirm('Are you sure you want to delete comment?')) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentId);
                setBackendComments(updatedBackendComments);
            })
        }
    }

    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackendComments = backendComments.map(backendComment => {
                if (backendComment.id === commentId) {
                    return {...backendComment, body: text};
                }
                return backendComment;
            })
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        })
    }

    let commentsCollectionRef;
    useEffect(() => {
        const commentsCollectionRef = collection(db, "comments");
        const getComments = async () => {
            
            const data = await getDocs(commentsCollectionRef);
            setBackendComments(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getComments();
    }, [commentsCollectionRef]);

  return (
    <div className='comments'>
        <h3 className='comments-title'>Comments</h3>
        {isAuth && <>
            <div className='comment-form-title'>Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment} />
        </>
        }
        <div className='comments-container'>
            {rootComments.map((rootComment) => (
                <Comment 
                    key={rootComment.id} 
                    comment={rootComment} 
                    replies={getReplies(rootComment.id)} 
                    currentUserId={currentUserId} 
                    deleteComment={deleteComment} 
                    activeComment={activeComment} 
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    updateComment={updateComment}
                />
            ))}
        </div>
    </div>
  )
}

export default Comments