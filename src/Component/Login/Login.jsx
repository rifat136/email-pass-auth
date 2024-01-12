import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import app from '../Firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth=getAuth(app);


const Login = () => {
  const[error,setError]=useState('');
  const[success, setSuccess]=useState('');
  const emailRef= useRef();

  const handleLogin= event=>{
//get Data from Input 
    event.preventDefault();
    const form=event.target;
    const email= form.email.value;
    const password= form.password.value;
    console.log(email,password);
    setError('');
    setSuccess('');

//validity
    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('Please add at least two UpperCase');
      return;
    }
    else if(!/(?=.*[!@#$&*])/.test(password)){
      setError('Please add special Character');
      return;
    }
// signIn
    signInWithEmailAndPassword(auth, email, password)
    .then(result=>{
      const loggedUser=result.user;
      console.log(loggedUser);
      setSuccess('User login Successfully!');
      // setSuccess('');
      setError('');
    })
    .catch(error=>{
      setError(error.message);
    })

  }

  const resetPass= event =>{
    // console.log(emailRef.current.value);
    const email=emailRef.current.value;
    if(!email){
      alert('Please provide a valid email');
      return;
    }

    sendPasswordResetEmail(auth,email)
    .then(()=>{
      alert('Please check your email')
    })
    .catch(error=>{
      setError(error.message);
    })
  }
    
    return (
        <div>
            <h2 className='mt-5 pb-3 font'>Please Login</h2>

            <div className="min-h-6 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-6 mt-1">Login</h2>

        <form onSubmit={handleLogin} >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              ref={emailRef}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name='password'
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          <p><small>Forget Password?<button onClick={resetPass} className='bg-slate-200 p-0'>Reset</button></small></p>
          <p className='text-red-600'>{error}</p>
          <p className='text-green-600'>{success}</p>

          <p><small>New user? Please Register <Link to='/regi'>register</Link></small></p>
          
        </form>
      
      </div>
    </div>
        </div>
    );
};

export default Login;