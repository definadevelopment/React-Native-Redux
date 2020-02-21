const initialState = {};

export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case 'CREATE_USER_FAIL': {
            return {
                ...state,
                signupError: action.error,
            };
        }
        case 'CREATE_USER_SUCCESS': {
            return {
                ...state,
                userData: action.userData,
                signupError: false
            };
        }
        case 'LOGIN_USER_FAIL': {
            return {
                ...state,
                loginError: action.error,
            };
        }
        case 'LOGIN_USER_SUCCESS': {
            return {
                ...state,
                userData: action.userData,
                loginError: false
            };
        }
        case 'USER_LOGOUT': {
            return {
                ...state,
                userData: {},
            };
        }
        default:
            return state;
    }
}
