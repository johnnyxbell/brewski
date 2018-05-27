import { SET_USERNAME, SAVE_GOOGLE_DATA, SAVE_BEER_LIST } from './actions';

export function setUsername(userName) {
    return { type: SET_USERNAME, payload: userName };
}

export function saveGoogleData(data) {
    return { type: SAVE_GOOGLE_DATA, payload: data };
}

export function saveBeerList(beerList) {
    return { type: SAVE_BEER_LIST, payload: beerList };
}
