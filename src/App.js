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
    <div className='container ml-2 mt-2'>
      <p className='mb-2'>Sign in with Google to add a comment</p>
      <div className='flex flex-col w-1/6'>
        <button className="login-with-google-btn" onClick={ signInWithGoogle }>Sign in with Google</button>
        {isAuth && <button className='bg-red-400 text-white mt-2 rounded w-1/3 mx-auto' onClick={signUserOut}>Sign Out</button>}
      </div>
      <Comments currentUserId={auth.currentUser.uid} />
    </div>
    
  );
}

export default App;
