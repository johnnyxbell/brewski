import { SET_USERNAME, SAVE_GOOGLE_DATA } from './actions';

export function setUsername(userName) {
    return { type: SET_USERNAME, payload: userName };
}

export function saveGoogleData(data) {
    return { type: SAVE_GOOGLE_DATA, payload: data };
}