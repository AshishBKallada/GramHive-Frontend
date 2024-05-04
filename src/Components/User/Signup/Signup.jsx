import React, { useState } from 'react';
import OTP from '../OTP/OTP';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox } from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import { userSignup } from '../../../redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        next: false,
        name: '',
        username: '',
        email: '',
        password: '',
        image: '',
    });

    const [showOTP, setShowOTP] = useState(false);

    const signupData = { email, name, username, password }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                setEmailError('');
                break;
            case 'name':
                setName(value);
                setNameError('');
                break;
            case 'username':
                setUsername(value);
                setUsernameError('');
                break;
            case 'password':
                setPassword(value);
                setPasswordError('');
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasError = false;

        if (!email) {
            setEmailError('Email is required');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!name) {
            setNameError('Name is required');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!username) {
            setUsernameError('Username is required');
            hasError = true;
        } else {
            setUsernameError('');
        }

        if (!password) {
            setPasswordError('Password is required');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!hasError) {
            try {
                console.log('1', signupData);
                const response = await fetch('http://localhost:3000/sendmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupData),
                });

                if (response.status === 200) {

                    console.log('Email sent successfully');
                    toast.success('Email sent successfully');
                    setShowOTP(true);

                } else if (response.status === 400) {
                    console.log('User already exists');
                } else if (response.status === 500) {
                    console.log('Failed to send email');
                } else {
                    console.log('Unhandled status code:', response.status);
                }
            } catch (error) {
                console.error('Error sending email:', error);
            }

        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })

    }

    const handleGoogleSignup = (e) => {
        if (!userData.name) {

        }
        if (!userData.username) {

        }
        try {
            const { name, email, password, username, image } = userData
            console.log('....................',userData)
            dispatch(userSignup({ name, email, password, username, image }))
            console.log('hey vro');
            toast.success('Successfully Signed in!')
               
        } catch (error) {

        }
    }

    if (userData.next) {
        return (
            <>
                <ToastContainer position="top-center" autoClose={1500}  />
                <Card className="mx-auto mt-[80px] shadow-md bg-blend-overlay w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            <center><img src="https://fontmeme.com/permalink/240410/fd6559317aad827d444e4eb8ec6b6469.png" alt="" /></center>
                            <center><b className='text-2xl'>Sign In</b></center>
                        </Typography>
                        <div className='w-full h-auto'>
                            <center><img src={userData.image.toString()} className='w-28 h-28 rounded-full border-2  p-1 shadow-lg shadow-[#23395d]' alt="" /></center>
                        </div>
                        <center>
                            <p className='text-[#451093] font-medium'>Welcome <span className='underline' >{userData.email}</span></p>
                        </center>
                        <Typography className="-mb-2" variant="h6">
                            Your Account Name
                        </Typography>
                        {/* <Input size="lg" /> */}
                        <div class="relative z-0">
                            <input type="text" name='name' onChange={handleChange} value={userData.name} id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Account Name</label>
                        </div>
                        <Typography className="-mb-2" variant="h6">
                            Your Username.
                        </Typography>
                        <div class="relative z-0">
                            <input type="text" name='username' onChange={handleChange} id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label for="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
                        </div>
                        <div className="-ml-2.5">
                            <input type="checkbox" className='ml-2 w-[16px] h-[16px] bg=[#23395d] focus:border-2 focus:border-[#23395d]' />
                            <label htmlFor="checkbox" className='ml-2'>Remember Me</label>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        {/* <Button variant="filled" color='green' fullWidth>
                            Sign In
                        </Button> */}
                        <button onClick={handleGoogleSignup} className='bg-[#23395d] rounded-sm text-white font-medium w-full p-2 px-3' >Sign In</button>
                        <Typography variant="small" className="mt-4 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="red"
                                className="ml-1 font-bold"
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </>
        )
    }

    if (showOTP) {
        return (
            <>
                <ToastContainer position="top-center" autoClose={1500} />
                <OTP />
            </>
        )
    }
    return (
        <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
                
            <GoogleAuth type="signup" setUserData={setUserData} />

                <form className="mt-8 w-64 flex flex-col" onSubmit={handleSubmit}>
                    <div className="logo w-full">
                        <img className='ml-12' src="https://fontmeme.com/permalink/240410/921064cd21a38f61c2f581450ded4de3.png" alt="" />
                    </div>
                    <input
                        autoFocus
                        className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                        id="email"
                        name="email"
                        placeholder="Phone number, username, or email"
                        type="text"
                        value={email}
                        onChange={handleInputChange}
                    />
                    {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                    <input
                        className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                        id="name"
                        name="name"
                        placeholder="Full Name"
                        type="text"
                        value={name}
                        onChange={handleInputChange}
                    />
                    {nameError && <p className="text-xs text-red-500">{nameError}</p>}
                    <input
                        className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                        id="username"
                        name="username"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={handleInputChange}
                    />
                    {usernameError && <p className="text-xs text-red-500">{usernameError}</p>}
                    <input
                        className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                    <button
                        type="submit"
                        className="text-xs text-center bg-blue-800 text-white py-1 rounded font-medium"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="bg-white border border-gray-300 text-center w-80 py-4">
                <span className="text-sm">Don't have an account?</span>
                <a  href="#" className="text-blue-500 text-sm font-semibold">
                    <button onClick={()=>navigate('/')}>Log In</button>
                </a>
            </div>
        </div>
    );
}

export default Signup;
