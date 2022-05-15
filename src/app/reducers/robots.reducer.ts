import ActionTypes from "../../constants/ActionTypes";
import { RobotDefaultState } from "../../types/robot.type";

const defaultState = {
    robotList: [],
    retrievedBatch: false,
    hasExtinguished: false,
    hasRecycled: false,
};

function uiReducer(state : RobotDefaultState = defaultState, action: any) {
    switch (action.type) {
        case ActionTypes.SET_ROBOTS_DATA:
            return {
                ...state,
                robotList: action.data,
                retrievedBatch: true,
            };
        case ActionTypes.DO_EXTINGUISH:
            const list = [...state.robotList];
            list[action.data].statuses = list[action.data].statuses.filter((status: string) => status !== "on fire");
            console.log(list);
            return {
                ...state,
                robotList: [
                    ...list
                    // remove the on fire on the robot with the id passed 'action.id'
                ],
            };
        default:
            return state;
    }
}

export default uiReducer;
