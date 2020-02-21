import firebase from 'react-native-firebase';

const createUserSuccess = (resp) => {
    return {
        type: 'CREATE_USER_SUCCESS',
        userData: resp,
    }
}
const createUserFail = (error) => {
    return {
        type: 'CREATE_USER_FAIL',
        error
    }
}

const loginUserSuccess = (resp) => {
    return {
        type: 'LOGIN_USER_SUCCESS',
        userData: resp,
    }
}
const loginUserFail = (error) => {
    return {
        type: 'LOGIN_USER_FAIL',
        error
    }
}

const userLogout = () => {
    return {
        type: 'USER_LOGOUT',
        userData: {},
    }
}

export function createUser(userName, email, pass) {
    return async function (dispatch, getState) {
        try {
            let userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, pass)
            if (userCredentials.user) {
                userCredentials.user.updateProfile({
                    displayName: userName
                });
            }
            dispatch(createUserSuccess({ userName, email, userID: userCredentials.user.uid }));
        } catch (error) {
            dispatch(createUserFail(error))
        }
    }
}

export function loginUser( email, pass) {
    return async function (dispatch, getState) {
        try {
            let userCredentials = await firebase.auth().signInWithEmailAndPassword(email, pass);
            dispatch(loginUserSuccess({ userName:userCredentials.user.displayName, email, userID: userCredentials.user.uid }));
        } catch (error) {
            dispatch(loginUserFail(error))
        }
    }
}

export function logout() {
    return async function (dispatch, getState) {
        firebase.auth().signOut();
        dispatch(userLogout());
    }
}