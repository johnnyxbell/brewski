import { SET_USERNAME, SAVE_GOOGLE_DATA, SAVE_USER_DATA, SAVE_ACTIVE_LOCATION } from './actions';

export function setUsername(userName) {
    return { type: SET_USERNAME, payload: userName };
}

export function saveGoogleData(data) {
    return { type: SAVE_GOOGLE_DATA, payload: data };
}

export function saveUserData(userData) {
    return { type: SAVE_USER_DATA, payload: userData };
}

export function saveActiveLocation(activeLocation) {
    return { type: SAVE_ACTIVE_LOCATION, payload: activeLocation };
}
