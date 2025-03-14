import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <ChakraProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        {/* Add other routes here */}
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
