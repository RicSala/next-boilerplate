'use client';
// REVIEW: We are NOT using this context!

import { createContext, useRef } from 'react';
import { useEffect, useReducer } from 'react';

import { useSession } from 'next-auth/react';
import { authReducer } from './auth-reducer';
import axios from 'axios';
import { AuthContextProps, ChildrenProps } from '@/types/types';

export type AuthState = typeof AUTH_INITIAL_STATE;

const AUTH_INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined, // When we load the app, we don't know the user
};
export const AuthContext = createContext<AuthContextProps>(AUTH_INITIAL_STATE);

export const AuthProvider = ({ children }: ChildrenProps) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const { data, status } = useSession();
    // use a ref to keep track of how many times the component has been rendered
    const renders = useRef(0);
    // We return the state and the methods so we can use them in the components
    return (
        <AuthContext.Provider
            value={{
                ...state,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
