import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const useLoginSuccess = ()=>{
    const toast = useToast();
    const navigate = useNavigate();

    const showToastAndNavigate = ()=>{
        toast({
            description: 'Google Login successful',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true,
        });
        navigate('/');
    }
    return showToastAndNavigate;
}