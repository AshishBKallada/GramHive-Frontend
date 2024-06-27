import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../../redux/userAuthSlice';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import OTP from '../OTP/OTP';
import { Button, Dialog, Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox } from "@material-tailwind/react";

function Signup() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailError, setEmailError] = useState('');
    const [NameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [userData, setUserData] = useState({
        next: false,
        name: '',
        username: '',
        email: '',
        password: '',
        image: '',
    });

    const [showOTP,setshowOTP] = useState(false);

    console.log('userData', userData);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    }

     const sendMail = async () => {
        console.log('SEND MAIL');
        if(userData.email)
        {
            const email = userData.email;
            try {
                const response = await fetch(`https://gramhive6.vercel.app/sendmail/${email}`)
                if(response.ok)
                {
                    console.log('SEND MAIL success');
                }else{
                }
            } catch (error) {
                
            }
        }
     }
    const handleSignup = async (e) => {
        e.preventDefault();
        sendMail().then(()=>setshowOTP(prev=>!prev))

        

        // let hasError = false;

        // if (!email) {
        //     setEmailError('Email is required');
        //     hasError = true;
        // } else {
        //     setEmailError('');
        // }
        // if (!name) {
        //     setNameError('Full name is required');
        //     hasError = true;
        // } else {
        //     setNameError('');
        // }
        // if (!username) {
        //     setUsernameError('Username is required');
        //     hasError = true;
        // } else {
        //     setUsernameError('');
        // }
        // if (!password) {
        //     setPasswordError('Password is required');
        //     hasError = true;
        // } else {
        //     setPasswordError('');
        // }
        // const signupData = { email, name, username, password }

        // if (!hasError) {
        //     dispatch(userSignup(signupData)).then(() => toast.success('User successfully signed up'));
        // }
    }

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
            dispatch(userSignup({ name, email, password, username, image }))
            console.log('hey vro');
            toast.success('Successfully Signed in!')
               
        } catch (error) {

        }
    }
if(showOTP){
    return(
        <>
        <OTP />
        </>
    )
}
    if (userData.next) {
        return (
            <>
                <ToastContainer position="top-center" autoClose={1500} onClose={handleNavigate} />
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


    return (
        <div>
            <main>
                <div className="page">
                    <div className="header">
                        <h1 className="text-4xl font-bold text-dark-500">GramHive</h1>
                        <p>Sign up to see photos and videos from your friends.</p>
                        <GoogleAuth type="signup" setUserData={setUserData} />
                        <div>
                            <hr />
                            <p>OR</p>
                            <hr />
                        </div>
                    </div>
                    <div className="container">
                        <form action="/submit-form">
                            <input type="text" placeholder="Mobile Number or Email" onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
                            {emailError && <p className="error">{emailError}</p>}

                            <input type="text" placeholder="Full Name" onChange={(e) => { setName(e.target.value); setNameError(''); }} />
                            {NameError && <p className="error">{NameError}</p>}

                            <input type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value); setUsernameError(''); }} />
                            {usernameError && <p className="error">{usernameError}</p>}

                            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); setPasswordError('') }} />
                            {passwordError && <p className="error">{passwordError}</p>}

                            <button type="submit" onClick={sendMail}>Sign up</button>
                        </form>

                        <ul>
                            <li>By signing up, you agree to our </li>
                            <li><a href="">Terms, </a></li>
                            <li><a href="">Data Policy</a></li>
                            &nbsp;<li>and</li>&nbsp;
                            <li><a href="">Cookies Policy</a>.</li>
                        </ul>
                    </div>
                </div>
                <div className="option">
                    <p>Have an account? <a onClick={() => navigate('/')}>Log in</a></p>
                </div>

                <div className="footer">
                    <ul>
                        <li><a href="">ABOUT</a></li>
                        <li><a href="">HELP</a></li>
                        <li><a href="">PRESS</a></li>
                        <li><a href="">API</a></li>
                        <li><a href="">JOBS</a></li>
                        <li><a href="">PRIVACY</a></li>
                        <li><a href="">TERMS</a></li>
                        <li><a href="">LOCATIONS</a></li>
                        <li><a href="">TOP ACCOUNTS</a></li>
                        <li><a href="">HASHTAGS</a></li>
                        <li><a href="">LANGUAGE</a></li>
                    </ul>
                    <p>© 2020 PICTUREGRAM</p>
                </div>
            </main>




        </div>
    );
}

export default Signup;
