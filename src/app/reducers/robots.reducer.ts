import { builtinModules } from "module";
import ActionTypes from "../../constants/ActionTypes";
import { RobotDefaultState, RobotData } from "../../types/robot.type";
import RobotsDataService from "../../services/robots.service";

const defaultState = {
    robotList: [],
    retrievedBatch: false,
    hasExtinguished: false,
    hasRecycled: false,
};

export function extinguish(list: Array<RobotData>, id: number) {
    const statuses = list[id].statuses.filter((status: string) => status !== "on fire");
    list[id] = {
        ...list[id],
        statuses: [...statuses]
    }

    return list
}

function robotReducer(state : RobotDefaultState = defaultState, action: any) {
    switch (action.type) {
        case ActionTypes.SET_ROBOTS_DATA:
            return {
                ...state,
                robotList: action.data,
                retrievedBatch: true,
            };
        case ActionTypes.DO_EXTINGUISH:
            return {
                ...state,
                robotList: [
                    ...extinguish([...state.robotList], action.id)
                ],
            };
        case ActionTypes.CHECK_EXTINGUISH:
            return {
                ...state,
                hasExtinguished: true,
            };
        case ActionTypes.DO_RECYCLE:
            return {
                ...state,
                robotList: action.data,
                hasRecycled: true,
            };
        default:
            return state;
    }
}

export default robotReducer;
