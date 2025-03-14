import { RootRoute, Route, createRootRoute } from '@tanstack/react-router';
import { Login } from './components/Login';
import { AuthCallback } from './components/AuthCallback';

// Create a root component that preserves the auth context
const RootComponent = ({ children }: { children: React.ReactNode; }) => {
    return <>{children}</>;
};

export const rootRoute = createRootRoute({
    component: RootComponent
});

const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
});

const authCallbackRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/auth/callback',
    component: AuthCallback,
});

export const routeTree = rootRoute.addChildren([
    loginRoute,
    authCallbackRoute,
]);
