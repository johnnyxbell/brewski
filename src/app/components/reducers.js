import { SET_USERNAME, SAVE_GOOGLE_DATA, SAVE_BEERS } from './actions';

const DEFAULT_STATE = {
    userName: '',
    googleData: {},
    beerList: []
};

const setUsername = (state, action) => Object.assign({}, state, { userName: action.payload });
const saveGoogleData = (state, action) => Object.assign({}, state, { googleData: action.payload });
const saveBeers = (state, action) => Object.assign({}, state, { beerList: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return setUsername(state, action);
        case SAVE_GOOGLE_DATA:
            return saveGoogleData(state, action);
        case SAVE_BEERS:
            return saveBeers(state, action);
        default:
            return state;
    }
};

export default rootReducer;
