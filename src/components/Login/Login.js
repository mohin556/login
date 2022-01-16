import React, { useState } from 'react';
import './login.css'
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.config';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const Login = () => {



const [logIn,setLogIn] = useState({})
  const [user, setUser] = useState({
    name: '',
    email: '',
    password : '',
    error : '',
    success : false
  });



  const googleSignIn = ()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
      
        const user = result.user;
        console.log(user)
        setLogIn(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });



  }
 

  const handleChange = (e) =>{
   let isValid = true;
     if (e.target.name === 'email'){
      isValid  = /\S+@\S+\.\S+/.test(e.target.value);
      
     }
     if(e.target.name === 'password'){
          const passwordTrue = e.target.value.length > 6;
         isValid = passwordTrue;
       

     }
     if (isValid){
       const newUser = {...user};
      //  const newUser = {...user};
       newUser[e.target.name]= e.target.value;
       setUser(newUser);
     }
    



  }

  const handleSubmit =(e)=>{
    if (user.email && user.password){
     
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email,user.password)
      .then( res =>{
        const newInfu ={...user};
        newInfu.error = '';
        newInfu.success = true;
        setUser(newInfu);
        console.log(res)
      })
        
        // .then((userCredential) => {
         
        //   const user = userCredential.user;
         
       
        // })
        .catch((error) => {
          const newInfu = {...user};
          newInfu.error = error.message;
          newInfu.success = false;
          setUser(newInfu);
         
          const errorMessage = error.message;
          console.log(errorMessage)
         
          // ..
        });
      
    }
       e.preventDefault();
  }


    return (
      
        <div className='login-container'>
           <form action="" onSubmit={handleSubmit} >
           <h3 style={{color: 'white'}}  > name :{logIn.displayName}</h3>
           <div className='login-form'>
          
               
              {/* <input onBlur={handleChange} name="name" className='input' type="text" placeholder='Your name'  /> */}
                 <input onBlur={handleChange} name="email" className='input' type="text" placeholder='Email ID' required />
                 <input onBlur={handleChange} id="input2" className='input' name="password" type="password" placeholder='Password' required />
               <div className='button' >
                   {/* <button className='btn' >Login</button> */}
                   <input className='btn' type="submit" value="Login" />
                   <button onClick={googleSignIn} className='google'> Google </button>
               </div>
        
             <div className='lastPortion'  >
             <div className='lastdiv' >
                 <input  type="checkbox" /> <label>Remember me</label>
         
            </div>
              
              <div className='forget'>
              <a  className='forgot' href=""> forgot password?  </a>  

           
              </div>
             </div>

           </div>




           </form>
          
          <p style={{color: 'red'}} > {user.error}  </p>
        {
          user.success &&  <p style={{color: 'red'}} > created successfully  </p>
        }
          
        </div>
    );
};

export default Login;