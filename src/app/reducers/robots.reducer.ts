import ActionTypes from "../../constants/ActionTypes";
import { RobotDefaultState } from "../../types/robot.type";

const defaultState = {
    robotList: [],
    retrievedBatch: false,
    hasExtinguished: false,
    hasRecycled: false,
};

function robotReducer(state : RobotDefaultState = defaultState, action: any) {
    switch (action.type) {
        case ActionTypes.SET_ROBOTS_DATA:
            return {
                ...state,
                robotList: action.data,
                retrievedBatch: true,
            };
        case ActionTypes.DO_EXTINGUISH:
            const list = [...state.robotList];
            const statuses = list[action.id].statuses.filter((status: string) => status !== "on fire");
            list[action.id] = {
                ...list[action.id],
                statuses: [...statuses]
            }
            return {
                ...state,
                robotList: [
                    ...list
                    // remove the on fire on the robot with the id passed 'action.id'
                ],
            };
        case ActionTypes.CHECK_EXTINGUISH:
            return {
                ...state,
                hasExtinguished: true,
            };
        default:
            return state;
    }
}

export default robotReducer;
