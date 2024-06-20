import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useSignupSuccess = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const showToastAndNavigate = () => {
        toast({
            description: 'Signup successful',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true,
        });

        navigate('/');
    };

    return showToastAndNavigate;
};
