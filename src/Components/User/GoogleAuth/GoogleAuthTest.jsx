import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../../redux/userAuthSlice';
import { useToast } from '@chakra-ui/react';
import { AuthContext } from '../../../Context/AuthContext';

const GoogleAuthTest = ({ onLoginSuccess, isSignup }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const { setToken } = useContext(AuthContext);


    const handleLoginSuccess = (credentialResponse) => {
        const { credential } = credentialResponse;
        
        dispatch(userSignup({ token: credential, isSignup }))
            .then((response) => {
                if (userSignup.fulfilled.match(response)) {
                    setToken(response.payload.tokens.accessToken);
                    onLoginSuccess();
                } else if (userSignup.rejected.match(response)) {
                    throw new Error(response.payload?.message || 'An error occurred');
                }
            })
            .catch((error) => {
                toast({
                    description: error.message || 'An error occurred',
                    status: 'warning',
                    position: 'top',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    const handleLoginError = (error) => {
        console.error('Login Failed:', error);
        toast({
            description: 'Login failed. Please try again.',
            status: 'error',
            position: 'top',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    );
};

export default GoogleAuthTest;
