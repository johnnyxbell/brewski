import { SET_USERNAME, SAVE_GOOGLE_DATA } from './actions';

const DEFAULT_STATE = {
    userName: '',
    googleData: {}
};

const setUsername = (state, action) => Object.assign({}, state, { userName: action.payload });
const saveGoogleData = (state, action) => Object.assign({}, state, { googleData: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return setUsername(state, action);
        case SAVE_GOOGLE_DATA:
            return saveGoogleData(state, action);
        default:
            return state;
    }
};

export default rootReducer;
