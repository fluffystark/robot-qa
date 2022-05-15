import ActionTypes from "../../constants/ActionTypes";

const defaultState = {
    robots: [],
    hasExtinguished: false,
    hasRecycled: false,
};

function uiReducer(state = defaultState, action: any) {
    switch (action.type) {
        case ActionTypes.SET_ROBOTS_DATA:
            return {
                ...state,
                robots: action.data,
            };
        case ActionTypes.DO_EXTINGUISH:
            return {
                ...state,
                robots: [
                    ...state.robots,
                    // remove the on fire on the robot with the id passed 'action.id'
                ],
            };
        default:
            return state;
    }
}

export default uiReducer;
