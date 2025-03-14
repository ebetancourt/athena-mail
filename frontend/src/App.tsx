import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { AuthProvider } from './contexts/AuthContext';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { rootRoute, routeTree } from './routes';
import { CustomProvider } from './components/ui/provider';
import { ApiError, OpenAPI } from "./client";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    console.log('App');
    OpenAPI.BASE = "http://localhost:8000";
    OpenAPI.TOKEN = async () => {
        return localStorage.getItem("access_token") || "";
    };

    const handleApiError = (error: Error) => {
        if (error instanceof ApiError && [401, 403].includes(error.status)) {
            localStorage.removeItem("access_token");
            window.location.href = "/login";
        }
    };
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: handleApiError,
        }),
        mutationCache: new MutationCache({
            onError: handleApiError,
        }),
    });

    return (
        <StrictMode>
            <AuthProvider>
                <CustomProvider>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </CustomProvider>
            </AuthProvider>
        </StrictMode>
    );
}

export default App;
