import { SET_USERNAME, SAVE_GOOGLE_DATA, SAVE_USER_DATA, SAVE_ACTIVE_LOCATION } from './actions';

const DEFAULT_STATE = {
    userName: '',
    googleData: {},
    userData: {},
    activeLocation: ''
};

const setUsername = (state, action) => Object.assign({}, state, { userName: action.payload });
const saveGoogleData = (state, action) => Object.assign({}, state, { googleData: action.payload });
const saveUserData = (state, action) => Object.assign({}, state, { userData: action.payload });
const saveActiveLocation = (state, action) => Object.assign({}, state, { activeLocation: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return setUsername(state, action);
        case SAVE_GOOGLE_DATA:
            return saveGoogleData(state, action);
        case SAVE_USER_DATA:
            return saveUserData(state, action);
        case SAVE_ACTIVE_LOCATION:
            return saveActiveLocation(state, action);
        default:
            return state;
    }
};

export default rootReducer;
