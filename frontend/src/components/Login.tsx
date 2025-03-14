import { Button, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
    const auth = useAuth();

    if (!auth) {
        return null; // or loading state
    }

    const { login } = auth;

    const handleLogin = () => {
        console.log('Login button clicked');
        login();
    };

    return (
        <VStack gap={4} w={{ base: "100%", md: "sm" }}>
            <Text fontSize="2xl">Welcome!</Text>
            <Button
                colorScheme="blue"
                onClick={handleLogin}
            >
                Sign in with GoogleAPI
            </Button>
        </VStack>
    );
};
