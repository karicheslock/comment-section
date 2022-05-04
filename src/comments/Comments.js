import {useEffect, useState} from 'react';
import {getComments} from '../api';
import Comment from './Comment';

function Comments({currentUserId}) {
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);

    useEffect(() => {
        getComments().then(data => {
            setBackendComments(data);
        })
    }, [])
  return (
    <div className='comments'>
        <h3 className='comments-title'>Comments</h3>
        <div className='comments-container'>
            {rootComments.map((rootComment) => (
                <Comment key={rootComment.id} comment={rootComment} />
            ))}
        </div>
    </div>
  )
}

export default Comments