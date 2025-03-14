import React from 'react';
import { Button, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
    const { login } = useAuth();

    return (
        <VStack spacing={4} align="center" justify="center" height="100vh">
            <Text fontSize="2xl">Welcome!</Text>
            <Button
                colorScheme="blue"
                onClick={login}
                leftIcon={<GoogleIcon />}
            >
                Sign in with Google
            </Button>
        </VStack>
    );
};

const GoogleIcon = () => (
    <span>G</span>
);
