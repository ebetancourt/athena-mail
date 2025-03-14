import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/auth/google/callback${window.location.search}`);
                    const { access_token } = response.data;
                    localStorage.setItem('token', access_token);
                    navigate('/'); // Redirect to home page
                } catch (error) {
                    console.error('Authentication error:', error);
                    navigate('/login');
                }
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Authenticating...</div>;
};
