import { AuthState } from './auth-provider';

type ACTIONTYPE =
    | { type: '[AUTH] - Login'; payload: any }
    | { type: '[AUTH] - Logout' }
    | { type: '[AUTH] - Add Board'; payload: any }
    | { type: '[AUTH] - Remove Board'; payload: any };

export const authReducer = (state: AuthState, action: ACTIONTYPE) => {
    switch (action.type) {
        case '[AUTH] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };

        case '[AUTH] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            };

        default:
            return state;
    }
};
