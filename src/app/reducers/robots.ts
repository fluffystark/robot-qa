import ActionTypes from "../../constants/ActionTypes";

const defaultState = {
    robots: [],
};

function uiReducer(state = defaultState, action: any) {
    switch (action.type) {
        case ActionTypes.SET_ROBOTS_DATA:
            return {
                ...state,
                robots: action.data,
            };
        default:
            return state;
    }
}

export default uiReducer;
