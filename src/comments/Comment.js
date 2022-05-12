import CommentForm from "./CommentForm";

function Comment({comment, replies, currentUserId, deleteComment, activeComment, setActiveComment, parentId, addComment, updateComment}) {
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const canDelete = currentUserId === comment.userId;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.id;
  const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="container flex mb-4">
        <div>
            <img src={comment.userImg} alt="User avatar" className="rounded-full w-10 mr-2" />
        </div>
        <div className="w-full">
          <div className="flex items-baseline mb-2">
            <div className="mr-2">{comment.username}</div>
            <div className="text-xs text-gray-500">{createdAt}</div>
          </div>
          {!isEditing && <div className="border-2 rounded border-gray-300 h-fit w-96">{comment.body}</div>}
          {isEditing && (
            <CommentForm submitLabel='Update' hasCancelButton initialText={comment.body} handleSubmit={(text) => updateComment(text, comment.id)} handleCancel={() => setActiveComment(comment.body)} />
          )}
          <div className="flex mt-1">
            {canReply && <div className="mr-1 cursor-pointer text-sm mb-2" onClick={() => setActiveComment({id:comment.id, type: 'replying'})}>Reply</div>}
            {canEdit && <div className="mr-1 cursor-pointer text-sm mb-2" onClick={() => setActiveComment({id:comment.id, type: 'editing'})}>Edit</div>}
            {canDelete && <div className="mr-1 cursor-pointer text-sm mb-2" onClick={() => deleteComment(comment.id)}>Delete</div>}
          </div>
          {isReplying && (
              <CommentForm submitLabel='Reply' handleSubmit={(text) => addComment(text, replyId)} handleCancel={() => setActiveComment(null)} />
          )}
          {replies.length > 0 && (
            <div className="flex flex-col w-full">
              {replies.map(reply => (
                <Comment 
                  comment={reply} 
                  key={reply.id} 
                  replies={[]} 
                  currentUserId={currentUserId} 
                  deleteComment={deleteComment} 
                  parentId={comment.id} 
                  addComment={addComment} 
                  activeComment={activeComment} 
                  setActiveComment={setActiveComment} 
                  updateComment={updateComment}
                  />
              ))}
            
            </div>
          )}
        </div>
    </div>
  )
}

export default Comment;