import { useState } from 'react';
import Comments from './comments/Comments';
import {auth, provider} from './firebase-config';
import {signInWithPopup, signOut} from 'firebase/auth';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
    });
};
  
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

console.log(auth.currentUser);
  return (
    <div>
      <h1>Sign in with Google to add a comment</h1>
      <button className="login-with-google-btn" onClick={ signInWithGoogle }>Sign in with Google</button>
      <button onClick={signUserOut}>Log Out</button> 
      <Comments currentUserId={auth.currentUser.uid} />
    </div>
    
  );
}

export default App;
