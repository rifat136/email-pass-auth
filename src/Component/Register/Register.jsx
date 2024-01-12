import React, { useState } from 'react';
import{createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth =getAuth(app);

const Register = () => {
    
    const[error, setError]= useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit=(event)=>{

        //prevent reload field
        event.preventDefault();

        //collecting data from field
        const email= event.target.email.value;
        const password=event.target.password.value;
        const name =event.target.name.value;
        console.log(name,email,password);

        //validate ID and Pass
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least one upperCase');
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('At least one special case letter');
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const loggedUser =result.user; 
            console.log(loggedUser);
            setError(''); 
            setSuccess('User created successfully');
            event.target.reset();
            verifyEmail(result.user);
            updateUserData(result.user,name);
        })
        .catch(error=>{
            console.error(error.message);
            setError(error.message);
            setSuccess('');
        })
    }

    const verifyEmail=(user)=>{
        sendEmailVerification(user)
        .then(result=>{
            console.log(result);
            alert('Email Sent! Please verify');
        })
    }

    const updateUserData=(user,name)=>{
        updateProfile(user,{

            displayName:name
        })
        .then(()=>{
            console.log('Updated');
        })
        .catch(error=>{
            setError(error.message);
        })
    }

    return (
        <div className='bg-green-500 my-20 p-7 place-items-center'>
            <h1>Register</h1>

            <form onSubmit={handleSubmit} className='mt-5'>
                <input type="email" name="email" id="email" placeholder='Enter your email' className='mb-4 p-2' required /> 
                <input type="text" name="name" id="name" placeholder='Enter your Name' className='mb-4 p-2' required /> 
                <br />
                <input type="password" name="password" id="password" placeholder='Your password' className='mb-4 p-2' required  />
                <br />
                <input type="submit" value="Register" className='bg-gray-400 rounded-md p-2 hover:bg-yellow-500' />
            </form>
            <p className='text-red-700'>{error}</p>
            <p className='text-white'>{success}</p>

            <p className='text-white'><small>Already user? Please  <Link to='/login'>Login</Link></small></p>


        </div>
    );
};

export default Register;