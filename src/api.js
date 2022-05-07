import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase-config';



export const createComment = async (text, parentId = null) => {
  
  const commentsCollectionRef = collection(db, "comments");

  try {
    await addDoc(commentsCollectionRef, {
      id: Math.random().toString(36).substring(2,9),
      body: text,
      parentId,
      userId: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      userImg: auth.currentUser.photoURL,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
  }
};
  
  export const updateComment = async (text, id) => {
    const commentRef = doc(db, "comments", id);
    await updateDoc(commentRef, {
      body: text
    })
  };
  
  export const deleteComment = async (id) => {
    const commentDoc = doc(db, "comments", id);
    await deleteDoc(commentDoc);
  };